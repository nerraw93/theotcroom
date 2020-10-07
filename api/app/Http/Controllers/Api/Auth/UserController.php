<?php

namespace App\Http\Controllers\Api\Auth;

use Mail;
use Storage;
use App\Models\User;
use App\Http\HTTPResponse;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use App\Mail\Auth\UserEmailVerification;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\Auth\RegisterUserRequest;

class UserController extends Controller
{

    /**
     * Registration operation
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(RegisterUserRequest $request)
    {
        try {
            $verification_code = str_random(100);

            $user = User::create([
                'first_name' => $request->get('first_name'),
                'last_name' => $request->get('last_name'),
                'uuid' => str_random('20') . \Carbon\Carbon::now()->timestamp,
                'email' => $request->get('email'),
                'password' => bcrypt($request->get('password')),
                'verification_code' => $verification_code,
            ]);

            // Send Email
            Mail::to($user)->send(new UserEmailVerification($user));

            return Response::json([
                'user' => 'Email has been sent to you, please verify your account.'
            ], HTTPResponse::$HTTP_OK);
        } catch (\Exception $e) {
            return Response::json(['error' => $e->getMessage()], HTTPResponse::$HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Verify User by `verification_code`
     *
     * @author goper
     * @return view
     */
    public function verify($code)
    {
        if (strlen($code) == 100) {
            $user = User::where('verification_code', $code)->firstOrFail();

            if ($user) {
                if ($user->is_email_verified != 1) {
                    // Verify this user
                    $user->is_email_verified = 1;
                    $user->save();

                    // Show success message.
                    return view('auth.verification_complete');
                } else {
                    // User is already verified
                    return view('auth.verification_complete');
                }
            }
        }
    }

    /**
     * Login operation
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $email = $request->get('email');
        $password = $request->get('password');

        if (!Auth::attempt(['email' => $email, 'password' => $password])) {
            return Response::json(['error' => 'E-mail or password do not match.'], HTTPResponse::$HTTP_UNAUTHORIZED);
        }

        // Check if user email is not yet verified
        if (!auth()->user()->is_email_verified) {
            Auth::logout();
            return Response::json(['error' => 'Verify your account first, please see your email.'], HTTPResponse::$HTTP_UNAUTHORIZED);
        }

        if (auth()->user()->is_banned) {
            Auth::logout();
            return Response::json(['error' => 'This account has been disabled. Please contact admins.'], HTTPResponse::$HTTP_UNAUTHORIZED);
        }

        $user = $request->user();
        $token = Auth::user()->createToken('TheOTCRoom')->accessToken;

        User::where('id', '=', $user->id)->update(['last_seen' => date('Y-m-d H:i:s')]);
        return response()->json(['token' => $token]);
    }

    /**
     * Updates a password
     * @return \Illuminate\Http\JsonResponse
     */
    public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'current_password' => 'required|min:6',
            'new_password' => 'required|min:6|different:current_password',
            'confirm_password' => 'required|same:new_password'
        ]);

        if ($validator->fails()) {
            return Response::json(['error' => $validator->errors()->all()], HTTPResponse::$HTTP_BAD_REQUEST);
        }

        if (!Hash::check($request->get('current_password'), Auth::user()->password)) {
            return Response::json(['error' => 'The password entered is not correct.'], HTTPResponse::$HTTP_FORBIDDEN);
        }

        try {
            $user = User::find(Auth::id())->update([
                'password' => bcrypt($request->get('new_password'))
            ]);

            return Response::json(['user' => $user], HTTPResponse::$HTTP_OK);
        } catch (\Exception $e) {
            return Response::json(['error' => $e->getMessage()], HTTPResponse::$HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
