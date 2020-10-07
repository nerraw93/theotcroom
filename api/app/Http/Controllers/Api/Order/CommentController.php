<?php

namespace App\Http\Controllers\Api\Order;

use App\Models\Reservation;
use App\Models\User;
use App\Models\Notification;
use App\Models\Ico;
use App\Notifications\NotifyUser;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Order\Comment\StoreRequest;

class CommentController extends Controller
{
    /**
     * Get all comments on this ICO by the seller and buyer
     * @return json
     */
    public function index($id, $reservationId)
    {
        $ico = Ico::uuid($id)->firstOrFail();
        $reservation = Reservation::findOrFail($reservationId);

        if ($ico->user_id == auth()->user()->id || $reservation->user_id == auth()->user()->id) {
            $comments = Notification::comments($reservation->id)->get();
            return response()->json(['comments' => $comments]);
        }

        return response()->json(['error' => 'You have no data here.'], 401);
    }

    /**
     * Get all comments on a order, OWNER
     * @param  [type] $id [description]
     * @return [type]     [description]
     */
    public function allComments($id)
    {
        $ico = Ico::uuid($id)->firstOrFail();
        if ($ico->user_id == auth()->user()->id) {
            // Order - owner
            $comments = Notification::allComments($ico->id)->get();
            return response()->json(['comments' => $comments]);
        }

    }
    /**
     * Create notification
     * @return json
     */
    public function store(StoreRequest $request, $id, $reservationId)
    {
        $isNewMessage = true;
        $ico = Ico::uuid($id)->firstOrFail();

        if (Notification::comments($reservationId)->count() > 0) {
            $isNewMessage = false;
            $notifyUser = $ico->user;
        }

        // This is a reply
        // Check if this is the buyer or the owner
        $speakerUser = auth()->user();
        if ($speakerUser->id == $ico->user_id) {
            // This is the owner - notify buyer
            $reservation = Reservation::findOrFail($reservationId);
            $notifyUser = $reservation->users;
        } else {
            // This is the buyer - notify owner
            $notifyUser = $ico->user;
        }

        $payload = array_merge($request->all(), [
            'speaker_id' => auth()->user()->id,
            'reservation_id' => $reservationId,
            'ico_id' => $ico->id,
        ]);

        $notifyUser->notify(new NotifyUser($notifyUser->id, $payload, $isNewMessage ? Notification::CATEGORY_NEW_MESSAGE : Notification::CATEGORY_REPLY ));
        return response()->json(['message' => 'Message sent.']);
    }
}
