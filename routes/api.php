<?php

use App\Http\Controllers\ActivityLogController;
use App\Http\Controllers\AnalyticsController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BackupController;
use App\Http\Controllers\HealthController;
use App\Http\Controllers\LanguageController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\OneSignalController;
use App\Http\Controllers\PublicController;
use App\Http\Controllers\RoleController;
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
// Public routes (no authentication required)
Route::middleware(['apply_locale'])->group(function () {
    Route::get('public/settings', [PublicController::class, 'getPublicSettings'])->name('public.settings');
    Route::get('health', [HealthController::class, 'index'])->name('health');
});

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
        Route::post('/{id}', [UserController::class, 'update']);
        Route::delete('/{id}', [UserController::class, 'delete']);
    });

    Route::prefix('settings')->group(function () {
        Route::get('', [SettingController::class, 'index']);
        Route::post('', [SettingController::class, 'update']);
        Route::post('mail', [SettingController::class, 'sendTest']);
    });

    Route::prefix('media')->group(function () {
        Route::get('', [MediaController::class, 'index']);
        Route::post('', [MediaController::class, 'store']);
    });

    Route::prefix('languages')->group(function () {
        Route::get('', [LanguageController::class, 'index']);
        Route::post('', [LanguageController::class, 'create']);
        Route::post('/{code}', [LanguageController::class, 'update']);
    });

    Route::prefix('roles')->group(function () {
        Route::get('', [RoleController::class, 'index']);
        Route::post('', [RoleController::class, 'create']);
        Route::post('/update', [RoleController::class, 'update']);
    });

    Route::prefix('notifications')->group(function () {
        Route::get('', [OneSignalController::class, 'index']);
        Route::post('', [OneSignalController::class, 'create']);
        Route::get('/{id}', [OneSignalController::class, 'show']);
        Route::delete('/{id}', [OneSignalController::class, 'delete']);
    });

    Route::prefix('analytics')->group(function () {
        Route::get('/overview', [AnalyticsController::class, 'overview']);
        Route::get('/traffic', [AnalyticsController::class, 'traffic']);
        Route::get('/top-pages', [AnalyticsController::class, 'topPages']);
    });

    Route::get('health', [HealthController::class, 'index'])->name('health.authenticated');

    Route::prefix('activity-logs')->group(function () {
        Route::get('', [ActivityLogController::class, 'index']);
        Route::get('/{id}', [ActivityLogController::class, 'show']);
    });

    Route::prefix('in-app-notifications')->group(function () {
        Route::get('', [NotificationController::class, 'index']);
        Route::get('/unread-count', [NotificationController::class, 'unreadCount']);
        Route::post('/{id}/read', [NotificationController::class, 'markAsRead']);
        Route::post('/read-all', [NotificationController::class, 'markAllAsRead']);
        Route::delete('/{id}', [NotificationController::class, 'delete']);
        Route::delete('', [NotificationController::class, 'deleteAll']);
    });

    Route::prefix('backups')->group(function () {
        Route::get('', [BackupController::class, 'index']);
        Route::post('', [BackupController::class, 'create']);
        Route::get('/{type}/{filename}', [BackupController::class, 'download'])->where(['type' => 'database|files', 'filename' => '.*']);
        Route::delete('/{type}/{filename}', [BackupController::class, 'delete'])->where(['type' => 'database|files', 'filename' => '.*']);
    });
});


