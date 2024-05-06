<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use App\Http\Requests\V1\LoginRequest;

class UserTokenController extends Controller
{
    public function login(LoginRequest $request)
    {

        if ( !Auth::attempt($request->only('email','password')) )
        {
            throw ValidationException::withMessages([
                'message' => 'Correo ó contraseña invalida'
            ]);
        }

        return response()->json([
            'token'     => $request->user()->createToken($request->device_name)->plainTextToken,
            'id'        => $request->user()->id,
            'name'      => $request->user()->name,
            'last_name' => $request->user()->last_name,
            'role'       => $request->user()->role->name,
            'message'   => 'Success'
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }
}
