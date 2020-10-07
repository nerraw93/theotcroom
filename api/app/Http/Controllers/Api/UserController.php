<?php

namespace App\Http\Controllers\Api;

use Intervention\Image\ImageManagerStatic as Image;
use Illuminate\Support\Facades\Validator;
use App\Mail\Auth\UserEmailVerification;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Request;
use Illuminate\Http\Request as Photo;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use App\Http\HTTPResponse;
use App\Models\Reservation;
use App\Models\User;
use App\Models\Ico;
use Mail;
use Storage;

class UserController extends Controller
{

    /**
     * Details of the logged in user
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function details()
    {
        $user = User::with('reservations')->where('id', '=', Auth::id())->first();

        if (!$user) {
            return Response::json(['error' => 'Access denied.'], HTTPResponse::$HTTP_UNAUTHORIZED);
        }

        return Response::json(['user' => $user], HTTPResponse::$HTTP_OK);
    }

    /**
     * Get another user's profile information
     *
     * @param $username string the unique username of the user
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUsername($username)
    {
        $user = User::with(['feedback.fromUser', 'trusts', 'blocks'])
            ->where('username', '=', $username)
            ->first();

        if (!$user) {
            return Response::json(['error' => 'User not found.'], HTTPResponse::$HTTP_NOT_FOUND);
        }

        return Response::json(['user' => $user], HTTPResponse::$HTTP_OK);
    }

    /**
     * Updates an user's information
     * @return \Illuminate\Http\JsonResponse
     */
    public function update()
    {
        $validator = Validator::make(Request::all(), [
            'first_name' => 'required|string|min:2|max:32',
            'last_name' => 'required|string|min:2|max:32',
            'email' => 'required|email|unique:users,email,' . Auth::id(),
            'youtube_video' => 'nullable|string|url',
            'facebook_profile' => 'nullable|string|url',
            'linkedin_profile' => 'nullable|string|url',
            'twitter_profile' => 'nullable|string|url',
        ]);

        if ($validator->fails()) {
            return Response::json(['error' => $validator->errors()->all()], HTTPResponse::$HTTP_BAD_REQUEST);
        }

        try {
            $user = User::find(Auth::id())
                ->update([
                    'first_name' => Request::get('first_name'),
                    'last_name' => Request::get('last_name'),
                    'email' => Request::get('email'),
                    'bio' => Request::get('bio'),
                    'website' => Request::get('website'),
                    'youtube_video' => Request::get('youtube_video'),
                    'facebook_profile' => Request::get('facebook_profile'),
                    'linkedin_profile' => Request::get('linkedin_profile'),
                    'twitter_profile' => Request::get('twitter_profile')
                ]);

            return Response::json(['user' => $user], HTTPResponse::$HTTP_OK);
        } catch (\Exception $e) {
            return Response::json(['error' => $e->getMessage()], HTTPResponse::$HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Uploads a picture
     *
     * @param Photo $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function uploadPhoto(Photo $request)
    {
        if ($request->hasFile('photo')) {
            $photo = $request->file('photo');
            $ext = $photo->getClientOriginalExtension();
            $userId = Auth::id();
            $fileName = $userId . '/' . time() . '.' . $ext;
            Storage::makeDirectory('public/profile_pictures/' . $userId);

            $image = Image::make($photo->getRealPath())->resize(400, 400)->save(public_path('storage/profile_pictures/' . $fileName));
            $fileUrl = asset('storage/profile_pictures/' . $fileName);

            User::find(Auth::id())->update(['profile_picture' => $fileUrl]);
            return Response::json(['photo' => $fileUrl], HTTPResponse::$HTTP_OK);
        }
    }

    /**
     * Updates a password
     * @return \Illuminate\Http\JsonResponse
     */
    public function resetPassword()
    {
        $validator = Validator::make(Request::all(), [
            'current_password' => 'required|min:8',
            'new_password' => 'required|min:8|different:current_password',
            'confirm_password' => 'required|same:new_password'
        ]);

        if ($validator->fails()) {
            return Response::json(['error' => $validator->errors()->all()], HTTPResponse::$HTTP_BAD_REQUEST);
        }

        if (!Hash::check(Request::get('current_password'), Auth::user()->password)) {
            return Response::json(['error' => 'The password entered is not correct.'], HTTPResponse::$HTTP_FORBIDDEN);
        }

        try {
            $user = User::find(Auth::id())->update([
                'password' => bcrypt(Request::get('new_password'))
            ]);

            return Response::json(['user' => $user], HTTPResponse::$HTTP_OK);
        } catch (\Exception $e) {
            return Response::json(['error' => $e->getMessage()], HTTPResponse::$HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Fetch the users who reserved orders
     *
     * @return bool|\Illuminate\Http\JsonResponse
     */
    public function recentUsers()
    {
        $icos = Ico::where('user_id', '=', Auth::id())->get();

        if (sizeof($icos) == 0) {
            return Response::json(['recent_users' => []], HTTPResponse::$HTTP_OK);
        }

        $recent_users = Reservation::with('users')->limit(12);

        foreach ($icos as $ico) {
            $recent_users = $recent_users->where('ico_id', '=', $ico->id);
        }

        $recent_users = $recent_users->orderBy('created_at', 'DESC')->get();
        return Response::json(['recent_users' => $recent_users], HTTPResponse::$HTTP_OK);
    }

    /**
     * Fetch the users who reserved orders
     *
     * @return bool|\Illuminate\Http\JsonResponse
     */
    public function allUsers()
    {
        $icos = Ico::where('user_id', '=', Auth::id())->get();

        if (sizeof($icos) == 0) {
            return Response::json(['all_users' => []], HTTPResponse::$HTTP_OK);
        }

        $all_users = Reservation::with('users');

        foreach ($icos as $ico) {
            $all_users = $all_users->where('ico_id', '=', $ico->id)->get();
        }

        return Response::json(['all_users' => $all_users], HTTPResponse::$HTTP_OK);
    }

    /**
     * Search among the recent users
     *
     * @return bool|\Illuminate\Http\JsonResponse
     */
    public function searchUsers()
    {
        $icos = Ico::where('user_id', '=', Auth::id())->get();
        $name = Request::route('name');

        if (sizeof($icos) == 0) {
            return false;
        }

        $recent_users = [];

        foreach ($icos as $ico) {
            $recent_users = Reservation::with('users')
                ->where('ico_id', '=', $ico->id)
                ->whereHas('users', function($q) use ($name) {
                    $q->where('first_name', 'like', '%'.$name.'%')
                        ->orWhere('last_name', 'like', '%'.$name.'%');
                })
                ->orderBy('created_at', 'DESC')
                ->get();
        }

        return Response::json(['recent_users' => $recent_users], HTTPResponse::$HTTP_OK);
    }
}
