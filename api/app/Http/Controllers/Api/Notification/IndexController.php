<?php

namespace App\Http\Controllers\Api\Notification;

use App\Models\Ico;
use App\Models\User;
use App\Models\Notification;
use App\Notifications\NotifyUser;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Notification\StoreRequest;

class IndexController extends Controller
{
    /**
     * Get all notifications
     * @return json
     */
    public function index(Request $request)
    {
        $unreadNotifications = auth()->user()->unreadNotifications;
        $notifications = auth()->user()->notifications;

        return response()->json([
            'unreadNotifications' => $unreadNotifications,
            'notifications' => $notifications
        ]);
    }

    /**
     * Create notification
     * @return json
     */
    public function store(StoreRequest $request)
    {
        $owner = Ico::find($request->ico_id);
        $owner->user->notify(new NotifyUser($owner->user->id, $request->all()));

        return response()->json(['message' => 'Message sent.']);
    }
}
