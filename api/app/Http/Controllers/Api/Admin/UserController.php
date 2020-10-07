<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    /**
     * Disable user
     * @param  [type] $id
     * @return response
     */
    public function disable($id)
    {
        $user = User::uuid($id)->firstOrFail();
        $user->is_banned = true;
        $user->save();

        return response()->json([
            'message' => 'User has been disabled.'
        ]);
    }

    /**
     * Enable user
     * @param  [type] $id
     * @return response
     */
    public function enable($id)
    {
        $user = User::uuid($id)->firstOrFail();
        $user->is_banned = false;
        $user->save();

        return response()->json([
            'message' => 'User has been enabled.'
        ]);
    }

    /**
     * Get user details 
     * @param  [type] $id [description]
     * @return [type]     [description]
     */
    public function details($id)
    {
        $user = User::findOrFail($id);
        return response()->json([
            'user' => $user
        ]);
    }
}
