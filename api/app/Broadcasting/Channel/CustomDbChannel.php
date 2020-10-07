<?php

namespace App\Broadcasting\Channel;

use App\Models\User;
use Illuminate\Notifications\Notification;

class CustomDbChannel
{
    /**
     * Create a new channel instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Customize saving on DB channel
     * @param  [type]       $notifiable   [description]
     * @param  Notification $notification [description]
     * @return [type]                     [description]
     */
    public function send($notifiable, Notification $notification)
    {
        $data = $notification->toDatabase($notifiable);
        return $notifiable->routeNotificationFor('database')->create([
            'id' => $notification->id,
            'reservation_id' => array_key_exists('reservation_id', $data) ? $data['reservation_id'] : null,
            'ico_id' => array_key_exists('ico_id', $data) ? $data['ico_id'] : null,
            'notifiable_id'=> $data['user_id'],
            'type' => get_class($notification),
            'category' => $data['category'],
            'data' => $data,
            'read_at' => null,
        ]);
    }
}
