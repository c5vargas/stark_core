<?php

namespace App\Repositories\Eloquent;

use App\Models\User;
use App\Models\UserSession;
use App\Repositories\AuthRepositoryInterface;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class AuthRepository extends BaseRepository
{
    protected $model;

    /**
     * UserRepository constructor.
     *
     * @param User $user
     */
    public function __construct(User $user)
    {
        $this->model = $user;
    }

    public function getAuth(Request $request)
    {
        $user = $request->user();

        if(!$user) {
            return false;
        }

        // Update last activity - the middleware ValidateUserSession already verified
        // that the session exists in user_sessions table
        $sessionId = $request->session()->getId();
        $userSession = UserSession::where('user_id', $user->id)
            ->where('laravel_session_id', $sessionId)
            ->first();

        if ($userSession) {
            $userSession->update([
                'last_activity' => Carbon::now(),
            ]);
        }

        $user->update([
            'last_login_at' => Carbon::now(),
        ]);

        $user->getAllPermissions();

        return $user;
    }

    public function login(String $email, String $password)
    {
        $user = $this->model->where('email', $email)->first();

        if (!$user || !Auth::attempt(['email' => $email, 'password' => $password])) {
            return false;
        }

        if (in_array($user->status->value ?? $user->status, ['inactive', 'blocked'])) {
            return false;
        }

        // Check if user has any active sessions that should be revoked
        // This prevents login if there are revoked sessions still in the database
        $activeSessions = $user->sessions()->whereNotNull('personal_access_token_id')->get();
        foreach ($activeSessions as $session) {
            if ($session->personal_access_token_id) {
                $token = \Laravel\Sanctum\PersonalAccessToken::find($session->personal_access_token_id);
                if (!$token) {
                    // Token was revoked, delete the session record
                    $session->delete();
                }
            }
        }

        // Login user - this creates the session cookie automatically
        Auth::login($user);

        $user->getAllPermissions();

        $user->update([
            'last_login_at' => Carbon::now(),
        ]);

        // Save user session for tracking purposes
        // Use Laravel session ID as token since we're using cookie-based auth
        $sessionLifetime = (int) config('session.lifetime', 120);
        $sessionId = session()->getId();

        UserSession::create([
            'user_id' => $user->id,
            'personal_access_token_id' => null, // No token needed for cookie-based auth
            'token' => hash('sha256', $sessionId), // Hash session ID to match token format
            'laravel_session_id' => $sessionId, // Store real session ID to invalidate later
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
            'last_activity' => Carbon::now(),
            'expires_at' => Carbon::now()->addMinutes($sessionLifetime),
        ]);

        // Return only user data, no token (cookie is set automatically)
        return ['user' => $user];
    }

    public function updateUserProfile(Array $data): Bool
    {
        $updated = $this->model->findOrFail($data['user_id'])->update($data);
        return $updated;
    }

    public function resetPassword(Request $request): Bool
    {
        $isValid = DB::table('password_reset_tokens')
            ->where(['email' => $request->email, 'token' => $request->token])
            ->where('created_at', '>=', Carbon::now()->subMinutes(60))
            ->first();

        $user = $this->model->where('email', $request->email)->first();

        if(!$isValid || !$user)
            return false;

        $user->password = $request->password;
        $saved = $user->save();

        if($saved)
            DB::table('password_reset_tokens')->where(['email'=> $request->email])->delete();

        return $saved;
    }

    public function forgetPassword(Array $data): ?Array
    {
        $token = Str::random(64);

        // Delete existing token if exists (since email is primary key)
        DB::table('password_reset_tokens')->where('email', $data['email'])->delete();

        DB::table('password_reset_tokens')->insert([
            'email' => $data['email'],
            'token' => $token,
            'created_at' => Carbon::now()
        ]);

        $user = $this->model->where('email', $data['email'])->firstOrFail();

        return ['user' => $user, 'token' => $token];
    }

}
