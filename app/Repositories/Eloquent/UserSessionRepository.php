<?php

namespace App\Repositories\Eloquent;

use App\Models\UserSession;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redis;
use Laravel\Sanctum\PersonalAccessToken;

class UserSessionRepository extends BaseRepository
{
    protected $model;

    /**
     * UserSessionRepository constructor.
     *
     * @param UserSession $userSession
     */
    public function __construct(UserSession $userSession)
    {
        $this->model = $userSession;
    }

    /**
     * Invalidate a Laravel session by its ID.
     */
    protected function invalidateLaravelSession(?string $sessionId): void
    {
        if (!$sessionId) {
            return;
        }

        $driver = config('session.driver');

        try {
            switch ($driver) {
                case 'database':
                    // Delete from sessions table
                    DB::table(config('session.table', 'sessions'))
                        ->where('id', $sessionId)
                        ->delete();
                    break;

                case 'file':
                    // Delete session file - Laravel uses 'sess_' prefix
                    $sessionPath = config('session.files', storage_path('framework/sessions'));
                    $sessionFile = $sessionPath . '/sess_' . $sessionId;
                    if (File::exists($sessionFile)) {
                        File::delete($sessionFile);
                    }
                    break;

                case 'redis':
                    // Use Redis connection directly
                    $connection = config('session.connection') ?: 'default';
                    $redis = Redis::connection($connection);
                    $prefix = config('database.redis.options.prefix', '');
                    $key = $prefix . config('session.cookie', 'laravel_session') . ':' . $sessionId;
                    $redis->del($key);
                    break;

                case 'memcached':
                    // Use cache store for memcached
                    $store = config('session.store') ?: config('cache.default');
                    Cache::store($store)->forget(
                        config('session.cookie', 'laravel_session') . ':' . $sessionId
                    );
                    break;
            }
        } catch (\Exception $e) {
            // Log error but don't fail the revocation
            Log::warning('Failed to invalidate Laravel session: ' . $e->getMessage(), [
                'session_id' => $sessionId,
                'driver' => $driver
            ]);
        }
    }

    /**
     * Revoke a specific session.
     */
    public function revokeSession(int $sessionId): bool
    {
        $session = $this->find($sessionId);

        if (!$session) {
            return false;
        }

        // Invalidate Laravel session if session ID is stored
        if ($session->laravel_session_id) {
            $this->invalidateLaravelSession($session->laravel_session_id);
        }

        // Revoke the Sanctum token if it exists
        if ($session->personal_access_token_id) {
            $token = PersonalAccessToken::find($session->personal_access_token_id);
            if ($token) {
                $token->delete();
            }
        }

        return $session->delete();
    }

    /**
     * Revoke all sessions for a user.
     */
    public function revokeAllSessions(int $userId): int
    {
        // Get all sessions with token IDs
        $sessions = $this->model->where('user_id', $userId)->get();

        // Invalidate all Laravel sessions
        foreach ($sessions as $session) {
            if ($session->laravel_session_id) {
                $this->invalidateLaravelSession($session->laravel_session_id);
            }
        }

        // Revoke all Sanctum tokens
        $tokenIds = $sessions->pluck('personal_access_token_id')->filter();
        if ($tokenIds->isNotEmpty()) {
            PersonalAccessToken::whereIn('id', $tokenIds)->delete();
        }

        // Delete all sessions
        return $this->model->where('user_id', $userId)->delete();
    }

    /**
     * Get active sessions for a user.
     */
    public function getActiveSessions(int $userId): Collection
    {
        return $this->model->where('user_id', $userId)
            ->active()
            ->orderBy('last_activity', 'desc')
            ->get();
    }

    /**
     * Clean expired sessions.
     */
    public function cleanExpiredSessions(): int
    {
        return $this->model->expired()->delete();
    }
}

