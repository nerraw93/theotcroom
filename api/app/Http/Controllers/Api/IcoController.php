<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\HTTPResponse;
use App\Models\Ico;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use App\Http\Requests\Ico\StoreRequest;

class IcoController extends Controller
{
    /**
     * Create a new ICO deal
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store()
    {
        $validator = Validator::make(Request::all(), [
            'name' => 'required|string',
            'symbol' => 'required|string|min:2|max:4',
            'type' => ['required', Rule::in(['buy', 'sell'])],
            'currency' => 'required|size:3',
            'ico_price_token' => 'required',
            'selling_price_token' => 'required',
            'fee' => 'required|integer|min:1',
            'supply' => 'required|string|min:1',
            'token_release_date' => 'required|date|after_today',
            'vesting_schedule' => 'required',
        ]);

        if ($validator->fails()) {
            return Response::json(['error' => $validator->errors()->all()], HTTPResponse::$HTTP_BAD_REQUEST);
        }

        try {
            $ad = Ico::create([
                'user_id' => Auth::id(),
                'name' => Request::get('name'),
                'symbol' => Request::get('symbol'),
                'type' => Request::get('type'),
                'currency' => Request::get('currency'),
                'ico_price_token' => Request::get('ico_price_token'),
                'selling_price_token' => Request::get('selling_price_token'),
                'fee' => Request::get('fee'),
                'supply' => Request::get('supply'),
                'total' => ((int) Request::get('selling_price_token') + (int) Request::get('fee')),
                'token_release_date' => Request::get('token_release_date'),
                'vesting_schedule' => Request::get('vesting_schedule'),
                'notes' => Request::get('notes')
            ]);

            return Response::json(['ad' => $ad->load(['user'])], HTTPResponse::$HTTP_CREATED);
        } catch (\Exception $e) {
            return Response::json(['error' => $e->getMessage()], HTTPResponse::$HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get all ICO deals
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function all()
    {
        $icos = Ico::with('user')->orderBy('created_at', 'DESC');
        $name = Request::route('name');

        if ($name) {
            $icos = $icos->where('name', 'like', '%'. $name .'%');
        }

        $icos = $icos->get();

        return Response::json(['icos' => $icos], HTTPResponse::$HTTP_OK);
    }

    /**
     * Count the number of orders by the user
     * @return mixed
     */
    public function myOrders()
    {
        $orders = Ico::where('user_id', '=', Auth::id())->get();
        return Response::json(['my_orders' => $orders], HTTPResponse::$HTTP_OK);
    }

    /**
     * Toggle ico to be show or hide
     *
     * @author goper
     * @param  Request $request
     * @return response
     */
    public function toggleShowHidden($id)
    {
        $order = Ico::findOrFail($id);

        if ($order->is_visible == 0) {
            $order->is_visible = 1;
        } else {
            $order->is_visible = 0;
        }
        $order->save();

        $orders = Ico::where('user_id', '=', Auth::id())->get();
        return Response::json(['my_orders' => $orders], HTTPResponse::$HTTP_OK);
    }

    public function addNote(StoreRequest $request)
    {
        $order = Ico::findOrFail($request->id);
        $order->notes = $request->note;
        $order->save();

        $orders = Ico::where('user_id', '=', Auth::id())->get();
        return Response::json(['my_orders' => $orders]);
    }
}
