<?php

namespace App\Http\Controllers\Api\Order;

use App\Models\Ico;
use App\Models\Reservation;
use App\Models\Notification;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Notifications\NotifyUser;
use App\Http\Requests\Order\AcceptOrDenyRequest;

class ReservationController extends Controller
{

    /**
     * Get user reservation data
     * @return json
     */
    public function index(Request $request, $id)
    {
        $isOwner = false;
        $reservations = [];
        $ico = Ico::uuid($id)->with('user', 'reservations')->firstOrFail();

        if ($ico->user_id == $userId = auth()->user()->id) {
            $isOwner = true;
            $reservations = $ico->reservations()->with('users')->get();
        } else {
            // This user is a buyer - get reservation data
            $reservations = Reservation::where([
                'ico_id' => $ico->id,
                'user_id' => $userId
            ])->get();
        }

        return response()->json(compact('isOwner', 'reservations'));
    }

    /**
     * Store reservations
     * @param  string $value
     * @return [type]
     */
    public function store($id)
    {
        $ico = Ico::uuid($id)->with('user')->firstOrFail();
        $user = auth()->user();
        $userId = $user->id;
        $reservation = Reservation::create([
            'ico_id' => $ico->id,
            'user_id' => $userId,
            'status' => 'ongoing'
        ]);
        // Notify ico owner about this reservation
        $owner = $ico->user;
        $owner->notify(new NotifyUser($owner->id, [
            'ico_id' => $ico->id,
            'speaker_id' => $user->id,
            'reservation_id' => $reservation->id,
            'message' => "You have new reservation.",
        ], Notification::CATEGORY_NEW_RESERVATION));

        return response()->json([
            'reservation' => $reservation,
            'message' => 'Reservation has been submitted successfully.'
        ]);
    }

    /**
     * Accept reservation
     * @param  Request $request
     * @param  [type]  $id
     * @return [type]
     */
    public function accept(AcceptOrDenyRequest $request, $id)
    {
        $reservation = Reservation::findOrFail($request->reservation_id);
        $reservation->status = Reservation::STATUS_ACCEPTED;
        $reservation->save();

        // @TODO - add notification of the buyer
        //
        return response()->json([
            'reservation' => $reservation,
            'message' => 'Reservation has been accepted.'
        ]);
    }

    /**
     * Deny Reservation
     * @param  AcceptOrDenyRequest $request
     * @param  [type]              $id
     * @return json
     */
    public function deny(AcceptOrDenyRequest $request, $id)
    {
        $reservation = Reservation::findOrFail($request->reservation_id);
        $reservation->status = Reservation::STATUS_DENIED;
        $reservation->save();

        // @TODO - add notification of the buyer
        //
        return response()->json([
            'reservation' => $reservation,
            'message' => 'Reservation has been denied.'
        ]);
    }

    /**
     * Completed reservation action
     * @param  AcceptOrDenyRequest $request
     * @param  [type]              $id
     * @return json
     */
    public function completed(AcceptOrDenyRequest $request, $id)
    {
        $reservation = Reservation::findOrFail($request->reservation_id);
        $reservation->status = Reservation::STATUS_COMPLETED;
        $reservation->save();

        // @TODO - add notification of the buyer
        //
        return response()->json([
            'reservation' => $reservation,
            'message' => 'Reservation has been completed.'
        ]);
    }
}
