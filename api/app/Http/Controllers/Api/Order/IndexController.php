<?php

namespace App\Http\Controllers\Api\Order;

use App\Models\Ico;
use App\Models\Reservation;
use App\Models\Notification;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Notifications\NotifyUser;

class IndexController extends Controller
{
    /**
     * Fetch the details of one ICO deal
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request, $id)
    {
        $ico = Ico::uuid($id)->with('user')->firstOrFail();
        return response()->json(['ico' => $ico]);
    }

    /**
     * Check if the logged in user is the owner
     * @param  [type] $id
     * @return json
     */
    public function checkIfOwner($id)
    {
        $isOwner = false;
        $ico = Ico::uuid($id)->withTrashed()->firstOrFail();
        if ($ico->user_id == auth()->user()->id) {
            $isOwner = true;

            // Get ICO details
            if ($ico->trashed())
                return response()->json(['isOwner' => $isOwner, 'ico' => $ico->load('user')]);
        }

        return response()->json(['isOwner' => $isOwner]);
    }

    /**
     * Get user reservation data
     * @return json
     */
    public function reservation(Request $request, $id)
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
     * @param  string $value [description]
     * @return [type]        [description]
     */
    public function storeReservation($id)
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
     * Archive order
     * @param  Request $request
     * @param  [type]  $id
     * @return response
     */
    public function archive(Request $request, $id)
    {
        $ico = Ico::uuid($id)->firstOrFail();
        if ($ico->user_id == auth()->user()->id) {
            $ico->delete();
            return response()->json(['message' => 'Order has been archived.']);
        }

        return response()->json(['error' => "You cannot disabled order that you don't owned."]);
    }

    /**
     * Restore order
     * @param  Request $request
     * @param  [type]  $id
     * @return json
     */
    public function restore(Request $request, $id)
    {
        $ico = Ico::uuid($id)->withTrashed()->firstOrFail();
        if ($ico->user_id == auth()->user()->id) {
            $ico->restore();
            return response()->json(['message' => 'Order has been restored.']);
        }

        return response()->json(['error' => "You cannot disabled order that you don't owned."]);
    }
}
