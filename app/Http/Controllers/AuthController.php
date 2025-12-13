<?php

namespace App\Http\Controllers;

use App\Events\WantResetPassword;
use App\Http\Requests\Api\Authentication\ForgetPasswordRequest;
use App\Http\Requests\Api\Authentication\LoginRequest;
use App\Http\Requests\Api\Authentication\RegisterRequest;
use App\Http\Requests\Api\Authentication\ResetPasswordRequest;
use App\Http\Requests\Api\Authentication\UpdateUserRequest;
use App\Http\Transformers\UserTransformer;
use App\Models\ActivityLog;
use App\Repositories\Eloquent\AuthRepository;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
Use Illuminate\Support\Str;

class AuthController extends Controller
{
    /**
     * @property AuthRepository $repository
     */
    private $repository;

    public function __construct(
        UserTransformer $transformer,
        AuthRepository $repository,
        Request $request
    ){
        parent::__construct($transformer, $request);
        $this->repository = $repository;
    }

    public function register(RegisterRequest $request)
    {
        $user = $this->repository->create($request->validated());

        if(!$user)
            throw new Exception(__('messages.controller.common.error_500'), 500);

        return $this->respondWithItem($user, 201);
    }


    public function get(Request $request)
    {
        $user = $this->repository->getAuth($request);


        if(!$user)
            return $this->respondWithMessage(__('messages.controller.auth.no_token'), 401);

        return $this->respondWithItem($user, 201);
    }

    public function login(LoginRequest $request)
    {
        $this->checkTooManyFailedAttempts();

        $result = $this->repository->login($request->input('email'), $request->input('password'));

        if(!$result) {
            RateLimiter::hit($this->throttleKey(), $seconds = 3600);
            throw new Exception(__('messages.controller.auth.invalid_password'), 401);
        }

        RateLimiter::clear($this->throttleKey());

        // Log login activity
        if ($result['user']) {
            ActivityLog::create([
                'user_id' => $result['user']->id,
                'action' => 'login',
                'model_type' => get_class($result['user']),
                'model_id' => $result['user']->id,
                'description' => "User logged in",
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
            ]);
        }

        return $this->respondWithArray($result);
    }

    public function logout(Request $request)
    {
        $user = $request->user();
        if($user) {
            // Log logout activity before logging out
            ActivityLog::create([
                'user_id' => $user->id,
                'action' => 'logout',
                'model_type' => get_class($user),
                'model_id' => $user->id,
                'description' => "User logged out",
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
            ]);

            // Logout user - this invalidates the session cookie
            Auth::logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();
        }

        return $this->respondWithMessage( __('messages.controller.auth.logout'));
    }

    public function updateUserProfile(UpdateUserRequest $request)
    {
        $updated = $this->repository->updateUserProfile($request->validated());

        if(!$updated)
            throw new Exception(__('messages.controller.auth.profile_failed'), 500);

        return $this->respondWithMessage( __('messages.controller.auth.profile_success'));
    }

    public function resetPassword(ResetPasswordRequest $request)
    {
        $status = $this->repository->resetPassword($request);

        if(!$status)
            throw new Exception(__('messages.controller.auth.email_or_token_invalid'), 401);

        return $this->respondWithMessage(__('messages.controller.auth.password_reset'));
    }

    /**
     * This function handles the forget password request and dispatches an event to reset the password.
     *
     * @param ForgetPasswordRequest $request
     * @return Response
     */
    public function forgetPassword(ForgetPasswordRequest $request)
    {
        $result = $this->repository->forgetPassword($request->validated());

        if(!$result['user']) {
            throw new Exception(__('messages.controller.auth.email_failed'), 401);
        }

        WantResetPassword::dispatch($result['user'], $result['token']);

        return $this->respondWithMessage( __('messages.controller.auth.forget_password'));
    }

    /**
     * Get the rate limiting throttle key for the request.
     *
     * @return string
     */
    public function throttleKey(): string
    {
        return Str::lower(request('email')) . '|' . request()->ip();
    }

    /**
     * Ensure the login request is not rate limited.
     *
     * @return void
     */
    public function checkTooManyFailedAttempts()
    {
        if (! RateLimiter::tooManyAttempts($this->throttleKey(), 10)) {
            return;
        }

        throw new Exception(__('messages.controller.auth.login_attempts'), 401);
    }
}
