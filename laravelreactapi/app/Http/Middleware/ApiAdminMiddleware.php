<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ApiAdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if(Auth::check())
        {
           if(auth()->user()->tokenCan('server:admin'))
           {
             return $next($request)
             ->header('Access-Control-Allow-Origin', 'http://localhost:8000/')
             ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
             ->header('Access-Control-Allow-Headers',' Origin, Content-Type, Accept, Authorization, X-Request-With')
             ->header('Access-Control-Allow-Credentials',' true');
           
           }
           else
           {
            return response()->json([
                'message'=>'Access Denied.! As you are not an Admin.', 
            ], 403);
           }
        }
        else
        {
          return response()->json([
              'status'=>401,
              'message'=>'Please Login First.',

          ]);
        }
    }
}
