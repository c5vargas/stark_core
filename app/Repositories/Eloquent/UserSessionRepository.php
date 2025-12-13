<?php

namespace App\Repositories\Eloquent;

use App\Models\UserSession;
use Illuminate\Database\Eloquent\Collection;
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
     * Revoke a specific session.
     */
    public function revokeSession(int $sessionId): bool
    {
        $session = $this->find($sessionId);
        
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

