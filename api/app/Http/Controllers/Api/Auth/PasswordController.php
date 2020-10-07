<?php

namespace App\Http\Controllers\Api\Auth;

use DB;
use Mail;
use Hash;
use App\Models\User;
use \Carbon\Carbon;
use App\Models\PasswordReset;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Request;
use App\Http\Requests\Auth\SendResetPasswordRequest;
use App\Http\Requests\Auth\ResetPasswordRequest;
use App\Mail\Auth\ResetUserPassword;

class PasswordController extends Controller
{
    /**
     * Send reset password link
     *
     * @param ResetPasswordRequest $response
     * @return response
     */
    public function sendResetPassword(SendResetPasswordRequest $request)
    {
        // Create token
        $token = str_random(150) . Carbon::now()->timestamp;
        $user = User::where('email', $request->email)->firstOrFail();

        DB::table('password_resets')->insert([
            'email' => $request->email,
            'token' => $token,
        ]);

        // Send email
        Mail::to($user)->send(new ResetUserPassword($user, $token));

        return response()->json(['message' => 'Password reset link has been sent to your email.']);
    }

    /**
     * Show reset password form
     *
     * @param sttring $token
     * @return view
     */
    public function resetPasswordForm($token)
    {
        $passwordReset = PasswordReset::where('token', $token)->firstOrFail();
        return redirect()->to(env('APP_URL_FRONTEND') . "/reset-password/$token");
    }

    /**
     * Reset password
     *
     * @return response
     */
    public function resetPassword(ResetPasswordRequest $request)
    {

        $passwordReset = PasswordReset::where('token', $request->token)->firstOrFail();

        $user = User::where('email', $passwordReset->email)->firstOrFail();
        $user->password = Hash::make($request->password);
        $user->save();

        // Delete password reset
        PasswordReset::where('token', $request->token)->delete();
        return response()->json(['message' => 'Your password has been reset.']);
    }
}
