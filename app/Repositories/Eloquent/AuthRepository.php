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

        // Verify the current token is still valid
        $currentToken = $user->currentAccessToken();
        if (!$currentToken) {
            return false;
        }

        // Check if token exists in database (not revoked)
        $tokenExists = \Laravel\Sanctum\PersonalAccessToken::find($currentToken->id);
        if (!$tokenExists) {
            return false;
        }

        $user->update([
            'last_login_at' => Carbon::now(),
        ]);

        // Update last_activity in user_sessions if session exists
        $session = \App\Models\UserSession::where('personal_access_token_id', $currentToken->id)->first();
        if ($session) {
            $session->update(['last_activity' => Carbon::now()]);
        }

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

        Auth::login($user);

        // Create token and get the access token model
        $tokenResult = $user->createToken($user->email);
        $token = $tokenResult->plainTextToken;
        $accessToken = $tokenResult->accessToken;

        $user->getAllPermissions();

        $user->update([
            'last_login_at' => Carbon::now(),
        ]);

        // Save user session with personal access token ID
        $expiresAt = $accessToken->expires_at ?? Carbon::now()->addMinutes(config('sanctum.expiration', 60 * 24 * 7));
        UserSession::create([
            'user_id' => $user->id,
            'personal_access_token_id' => $accessToken->id,
            'token' => hash('sha256', $token),
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
            'last_activity' => Carbon::now(),
            'expires_at' => $expiresAt,
        ]);

        return ['user' => $user, 'token' => $token];
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
