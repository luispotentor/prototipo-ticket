<?php

use App\Http\Controllers\Api\UserTokenController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\TicketAdminController;
use App\Http\Controllers\Api\V1\TicketCustomerController;
use App\Http\Controllers\Api\V1\TicketTypeController;
use App\Http\Middleware\IsAdminUser;
use App\Http\Middleware\IsCustomerUser;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::prefix('v1/adminTickets')->middleware(['auth:sanctum',IsAdminUser::class])->group(function (){

    Route::get('/', [TicketAdminController::class, 'index']);
    Route::get('/{id}', [TicketAdminController::class, 'show']);
    Route::post('/', [TicketAdminController::class, 'store']);
    Route::put('/updatestatus/{id}', [TicketAdminController::class, 'updateStatus']);
    Route::put('/{id}', [TicketAdminController::class, 'update']);
    Route::delete('/{id}', [TicketAdminController::class, 'destroy']);
});

Route::prefix('v1/customerTickets')->middleware(['auth:sanctum',IsCustomerUser::class])->group(function (){
    Route::get('/', [TicketCustomerController::class, 'index']);
    Route::get('/{id}', [TicketCustomerController::class, 'show']);
    Route::post('/', [TicketCustomerController::class, 'store']);
    Route::put('/{id}', [TicketCustomerController::class, 'update']);
    Route::delete('/{id}', [TicketCustomerController::class, 'destroy']);
});

Route::prefix('v1/ticketTypes')->middleware(['auth:sanctum'])->group(function (){
    Route::get('/', [TicketTypeController::class, 'index']);
});


Route::post('login',[UserTokenController::class,'login']);
Route::post('logout',[UserTokenController::class,'logout'])->middleware('auth:sanctum');

