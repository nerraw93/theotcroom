<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\Ico;

class CheckIsOwnerMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if ($icoUuid = $request->route('id')) {
            $ico = Ico::uuid($icoUuid)->first();

            if ($ico) {
                if ($ico->user_id == auth()->user()->id)
                    return $next($request);
            }
        }

        return response()->json([
            'error' => 'Action not authorized.'
        ], 401);
    }
}
