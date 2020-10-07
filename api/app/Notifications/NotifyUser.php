<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Messages\BroadcastMessage;

class NotifyUser extends Notification
{
    use Queueable;

    public $data;

    public $userId;
    public $category;

    /**
     * Create a new notification instance.
     * @param [type] $userId   user_id to be notified
     * @param [type] $data     $extra_data
     * @param [type] $category category `message`, 'reservation', `reply`
     */
    public function __construct($userId, $data, $category)
    {
        $this->userId = $userId;
        $this->data = $data;
        $this->category = $category;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['database', 'broadcast'];
    }

    public function broadcastOn()
    {
        return ['user.notify.' . $this->userId];
    }

    public function broadcastAs()
    {
        return 'user.notify.' . $this->userId;
    }

    public function toBroadcast($notifiable)
    {
        return new BroadcastMessage([
            'userId' => $this->userId,
            'data' => $this->data,
        ]);
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toDatabase($notifiable)
    {
        return [
            'user_id' => $this->userId,
            'reservation_id' => $this->data['reservation_id'],
            'ico_id' => $this->data['ico_id'],
            'category' => $this->category,
            'message' => $this->data['message'],
            'speaker_id' => $this->data['speaker_id']
        ];
    }
}
