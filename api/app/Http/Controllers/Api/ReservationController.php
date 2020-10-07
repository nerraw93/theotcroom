<?php

namespace App\Http\Controllers\Api;

use App\Http\HTTPResponse;
use App\Models\Ico;
use App\Models\Reservation;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Response;

class ReservationController
{
    /**
     * Fetch the reservations and comments for the deal
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function reservations()
    {
        if (!$reservations = Reservation::where('ico_id', '=', Request::route('id'))->get()) {
            return Response::json('Deal does not have reservations', HTTPResponse::$HTTP_NOT_FOUND);
        }

        $reservations = $reservations->load(['users.comments' => function ($q) {
            $q->orderBy('created_at', 'DESC');
        }]);

        return Response::json(['reservations' => $reservations], HTTPResponse::$HTTP_OK);
    }

    /**
     * Submit a reservation for an ICO deal
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function reserve()
    {
        if (!$ico = Ico::find(Request::route('id'))) {
            return Response::json('Deal not found', HTTPResponse::$HTTP_NOT_FOUND);
        }

        try {
            $reservation = Reservation::create([
                'ico_id' => $ico->id,
                'user_id' => Auth::id(),
                'status' => 'ongoing'
            ]);

            return Response::json(['reservation' => $reservation], HTTPResponse::$HTTP_CREATED);
        } catch (\Exception $e) {
            return Response::json(['error' => $e->getMessage()], HTTPResponse::$HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Count the number of reservations
     * @return mixed
     */
    public function countReservations()
    {
        $reservations = DB::table('reservations')
            ->select('status', DB::raw('count(status) AS total'))
            ->groupBy('status')
            ->get();
        return Response::json(['no_of_reservations' => $reservations], HTTPResponse::$HTTP_OK);
    }

    /**
     * Count the number of reservations
     * @return mixed
     */
    public function countDeals()
    {
        $icos = Ico::where('user_id', '=', Auth::id())->get();

        if (sizeof($icos) == 0) {
            return Response::json(['no_of_deals' => 0], HTTPResponse::$HTTP_OK);
        }

        $reservations = DB::table('reservations')
            ->select('status', DB::raw('count(status) AS total'))
            ->groupBy('status');

        foreach ($icos as $ico) {
            $reservations = $reservations->where('ico_id', '=', $ico->id);
        }

        $reservations = $reservations->get();

        return Response::json(['no_of_deals' => $reservations], HTTPResponse::$HTTP_OK);
    }

    /**
     * Count the total number of users
     *
     * @return bool|\Illuminate\Http\JsonResponse
     */
    public function countUsers()
    {
        $icos = Ico::where('user_id', '=', Auth::id())->get();
        $total = [];

        if (sizeof($icos) == 0) {
            return Response::json(['total_no_of_users' => 0], HTTPResponse::$HTTP_OK);
        }

        $reservations = DB::table('reservations')->select(DB::raw('count(user_id) AS total'));

        foreach ($icos as $ico) {
            $total = $reservations->where('ico_id', '=', $ico->id)->count();
        }

        return Response::json(['total_no_of_users' => $total], HTTPResponse::$HTTP_OK);
    }

    /**
     * Fetch the number of weekly users
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function weeklyUsers()
    {
        $date00 = new \DateTime(date('Y-m-d 00:00:00'));
        $date23 = new \DateTime(date('Y-m-d 23:59:59'));
        $date00->modify('+1 days');
        $date23->modify('+1 days');
        $no_of_users = [];

        for ($i = 7; $i > 0; $i--) {
            $arr = [];
            $date00->modify('-1 days');
            $date23->modify('-1 days');

            $reservations = DB::table('reservations')
                ->select(['id', 'created_at'], DB::raw('count(id) AS total'))
                ->whereBetween('created_at', [ $date00, $date23 ])
                ->groupBy(['id', 'created_at'])
                ->count();

            $arr['day'] = $date00->format('d');
            $arr['total'] = $reservations;

            array_push($no_of_users, $arr);
        }
        return Response::json(['no_of_users' => $no_of_users], HTTPResponse::$HTTP_OK);
    }


    /**
     * Fetch the number of weekly users between custom dates
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function weeklyUsersByDate()
    {
        $from = Request::route('from');
        $to = Request::route('to');
        $from_00 = new \DateTime(date($from . ' 00:00:00'));
        $to_00 = new \DateTime(date($to . ' 00:00:00'));
        $to_23 = new \DateTime(date($to . ' 23:59:59'));

        if (($from_00 > $to_00) || ($from_00 == $to_00)) {
            return Response::json(['error' => 'The initial date must be earlier than final date'], HTTPResponse::$HTTP_INTERNAL_SERVER_ERROR);
        }

        $to_00->modify('+1 days');
        $to_23->modify('+1 days');
        $no_of_users = [];
        $count = $from_00->diff($to_00)->days;

        for ($i = $count; $i > 0; $i--) {
            $arr = [];
            $to_00->modify('-1 days');
            $to_23->modify('-1 days');

            $reservations = DB::table('reservations')
                ->select(['id', 'created_at'], DB::raw('count(id) AS total'))
                ->whereBetween('created_at', [ $to_00, $to_23 ])
                ->groupBy(['id', 'created_at'])
                ->count();

            $arr['day'] = $to_00->format('d');
            $arr['total'] = $reservations;

            array_push($no_of_users, $arr);
        }

        return Response::json(['no_of_users' => $no_of_users], HTTPResponse::$HTTP_OK);
    }
}
