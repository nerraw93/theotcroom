<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\User;
use App\Models\Ico;
use App\Models\Reservation;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use App\Http\Controllers\Controller;

class DashboardController extends Controller
{
    /**
     * Count the total number of users
     *
     * @return bool|\Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $users_count = User::where('is_admin', 0)->count();
        $buy_orders = Ico::buy()->count();
        $sell_orders = Ico::sell()->count();
        $ongoing_orders = Reservation::ongoing()->count();
        $completed_orders = Reservation::completed()->count();
        return response()->json(compact(
            'users_count',
            'buy_orders',
            'sell_orders',
            'ongoing_orders',
            'completed_orders'
        ));
    }

    /**
     * Get users statistics
     * @return [type]
     */
    public function users(Request $request)
    {
        $dateFrom = Carbon::parse($request->from);
        $dateTo = Carbon::parse($request->to);
        $diff = $dateTo->diffInDays($dateFrom);
        $data = [];
        $date = $dateFrom->copy();

        $count = User::whereDate('created_at', $date)->count();
        array_push($data, [
            'count' => $count,
            'label' => $date->format('M d')
        ]);
        for ($i=0; $i < $diff; $i++) {
            $date = $date->addDays(1);
            $count = User::whereDate('created_at', $date)->count();
            array_push($data, [
                'count' => $count,
                'label' => $date->format('M d')
            ]);


        }
        return response()->json(compact(
            'data'
        ));
    }

    /**
     * Get recent members
     * @param  Request $request
     * @return json
     */
    public function members(Request $request)
    {
        $filter = $request->filter;
        $search = $request->search;

        $users = User::users();

        if ($search) {
            $users = User::findByName($search);
        }

        if ($filter == 'all')
            $users = $users->orderBy('created_at', 'DESC')->get();
        elseif ($filter == 'recent')
            $users = $users->orderBy('last_seen', 'DESC')->get();
        elseif ($filter == 'banned')
            $users = $users->banned()->get();

        return response()->json(compact('users'));
    }

    /**
     * Get members summary count
     * @return [type] [description]
     */
    public function membersSummary()
    {
        $all = User::users()->count();
        $recent = User::users()->orderBy('last_seen', 'DESC')->count();
        $banned = User::banned()->orderBy('created_at', 'DESC')->count();
        return response()->json(compact(
            'all',
            'recent',
            'banned'
        ));
    }

    /**
     * Get orders
     * @param  Request $request
     * @return json
     */
    public function orders(Request $request)
    {
        $type = $request->type;
        $search = $request->search;

        if ($search) {
            // has search
            $orders = Ico::search($search);
            if ($type == 'sell')
                $orders = $orders->sell()->get();
            elseif ($type == 'buy')
                $orders = $orders->buy()->get();
            else
                $orders = $orders->get();
        } else {
            if ($type == 'sell')
                $orders = Ico::sell()->get();
            elseif ($type == 'buy')
                $orders = Ico::buy()->get();
            else
                $orders = Ico::all();
        }

        return response()->json(compact('orders'));
    }
}
