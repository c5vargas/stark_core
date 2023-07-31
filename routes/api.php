<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix('auth')->middleware(['apply_locale'])->group(function () {

    Route::middleware(['auth:sanctum'])->group( function() {
        Route::get('', [AuthController::class, 'get'])->name('auth.get');
        Route::post('logout', [AuthController::class, 'logout'])->name('auth.logout');
        Route::post('update', [AuthController::class, 'updateUserProfile']);
    });

    Route::post('register', [AuthController::class, 'register'])->name('auth.register');
    Route::post('login', [AuthController::class, 'login'])->name('auth.login');
    Route::post('password/forget', [AuthController::class, 'forgetPassword'])->name('auth.forget-password');
    Route::post('password/reset', [AuthController::class, 'resetPassword'])->name('auth.reset-password');
});


