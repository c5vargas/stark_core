<?php

namespace App\Http\Transformers;

use App\Models\UserSession;
use League\Fractal\TransformerAbstract;

class UserSessionTransformer extends TransformerAbstract
{
    public function transform(UserSession $session)
    {
        return [
            'id' => $session->id,
            'user_id' => $session->user_id,
            'token' => substr($session->token, 0, 20) . '...', // Only show partial token
            'ip_address' => $session->ip_address,
            'user_agent' => $session->user_agent,
            'last_activity' => $session->last_activity?->toISOString(),
            'expires_at' => $session->expires_at?->toISOString(),
            'is_expired' => $session->isExpired(),
            'created_at' => $session->created_at?->toISOString(),
            'updated_at' => $session->updated_at?->toISOString(),
        ];
    }
}

