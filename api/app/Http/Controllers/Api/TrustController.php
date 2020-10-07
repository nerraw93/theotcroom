<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\HTTPResponse;
use App\Models\Trust;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;

class TrustController extends Controller
{
    /**
     * Set an user as trusted
     *
     * @param $username string the username to be trusted
     * @return \Illuminate\Http\JsonResponse
     */
    public function trust($username)
    {
        if (!$user = User::where('username', '=', $username)->first()) {
            return Response::json(['error' => 'The username ' . $username . ' does not exist'], HTTPResponse::$HTTP_NOT_FOUND);
        }

        if (Auth::user()->username === $username) {
            return Response::json(['error' => 'It is you.'], HTTPResponse::$HTTP_BAD_REQUEST);
        }

        try {
            $trust = Trust::create([
                'trusted_by_user_id' => Auth::id(),
                'user_id' => $user->id
            ]);

            return Response::json(['trust' => $trust], HTTPResponse::$HTTP_OK);
        } catch (\Exception $e) {
            return Response::json(['error' => $e->getMessage()], HTTPResponse::$HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
