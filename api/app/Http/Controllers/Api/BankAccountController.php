<?php

namespace App\Http\Controllers\Api;

use App\Models\BankAccount;
use App\Http\Controllers\Controller;
use App\Http\HTTPResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;

class BankAccountController extends Controller
{
    public function store()
    {
        $validator = Validator::make(Request::all(), [
            'name' => 'required',
            'bank_name' => 'required',
            'account_name' => 'required',
            'bank_account_number' => 'required',
            'branch' => 'required',
            'bank_code' => 'required',
        ]);

        if ($validator->fails()) {
            return Response::json(['error' => $validator->errors()->all()], HTTPResponse::$HTTP_BAD_REQUEST);
        }

        try {
            $bankAccount = BankAccount::create([
                'user_id' => Auth::id(),
                'name' => Request::get('name'),
                'bank_name' => Request::get('bank_name'),
                'account_name' => Request::get('account_name'),
                'bank_account_number' => Request::get('bank_account_number'),
                'branch' => Request::get('branch'),
                'bank_code' => Request::get('bank_code'),
            ]);

            return Response::json([ 'bankAccount' => $bankAccount->load('user') ], HTTPResponse::$HTTP_OK);
        } catch (\Exception $e) {
            return Response::json(['error' => $e->getMessage()], HTTPResponse::$HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
