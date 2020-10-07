<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\HTTPResponse;
use App\Models\Reservation;
use Response;
use App\Models\User;
use App\Models\Ico;
use Request;

class MemberController extends Controller
{
    /**
     * Toggle member to banned or enabled
     *
     * @author goper
     * @param   $id
     * @return
     */
    public function toggleBanned($id)
    {
        $user = User::findOrFail($id);

        if ($user->is_banned == 0) {
            $user->is_banned = 1;
        } else {
            $user->is_banned = 0;
        }
        $user->save();

        $icos = Ico::where('user_id', '=', auth()->id())->get();
        $all_users = Reservation::with('users');

        foreach ($icos as $ico) {
            $all_users = $all_users->where('ico_id', '=', $ico->id)->get();
        }

        return Response::json(['all_users' => $all_users], HTTPResponse::$HTTP_OK);
    }
}
