<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\LanguageController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\UserController;
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

Route::middleware(['auth:sanctum', 'apply_locale'])->group( function() {
    Route::prefix('users')->group(function () {
        Route::get('', [UserController::class, 'index']);
        Route::get('/{id}', [UserController::class, 'show']);
        Route::post('', [UserController::class, 'create']);
        Route::post('/update', [UserController::class, 'update']);
        Route::delete('/{id}', [UserController::class, 'delete']);
    });

    Route::prefix('settings')->group(function () {
        Route::get('', [SettingController::class, 'index']);
        Route::post('update', [SettingController::class, 'update']);
        Route::post('mail', [SettingController::class, 'sendTest']);
    });

    Route::prefix('languages')->group(function () {
        Route::get('', [LanguageController::class, 'index']);
        Route::post('', [LanguageController::class, 'create']);
        Route::post('/update', [LanguageController::class, 'update']);
    });
});


