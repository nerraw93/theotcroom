<?php

namespace App\Http\Middleware;

use Closure;

class CheckUserIsAdmin
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
        if (!$request->user()->is_admin) {
            if ($request->expectsJson()) {
                $request->user()->token()->revoke();
            } else {
                auth()->logout();
                session()->flush();
            }

            return response()->json([
                'error' => 'Action not authorized.'
            ], 401);
        }

        return $next($request);
    }
}
