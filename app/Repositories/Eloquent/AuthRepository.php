<?php

namespace App\Repositories\Eloquent;

use App\Models\User;
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

        Auth::login($user);

        $token = $user->createToken($user->email)->plainTextToken;

        $user->getAllPermissions();

        $user->update([
            'last_login_at' => Carbon::now(),
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
