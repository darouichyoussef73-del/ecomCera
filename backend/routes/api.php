<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\ProductController;


use Illuminate\Http\Request;
use App\Http\Controllers\Admin\OrdersController;
use App\Http\Controllers\Admin\ClientsController;
use App\Http\Controllers\Admin\StatsController;
use App\Http\Controllers\Admin\ProductsController;
use App\Http\Controllers\Admin\PaymentsController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| Here is where you register API routes for your application.
| These routes are loaded by the RouteServiceProvider within a group
| which is assigned the "api" middleware group.
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/bookings', [BookingController::class, 'store']);
Route::get('/bookings', [BookingController::class, 'index']);
Route::get('/bookings/{id}', [BookingController::class, 'show']);
Route::put('/bookings/{id}', [BookingController::class, 'update']);
Route::delete('/bookings/{id}', [BookingController::class, 'destroy']);

// Public product endpoints (App clients will use these)
// Route::apiResource('/products', ProductsController::class);

// Admin API routes (unauthenticated for now — add middleware as needed)
Route::prefix('admin')->group(function () {
    Route::get('/stats/overview', [StatsController::class, 'overview']);
    Route::apiResource('/orders', OrdersController::class);
    Route::apiResource('/clients', ClientsController::class);
    Route::apiResource('/products', ProductsController::class);
    Route::apiResource('/payments', PaymentsController::class);
});
