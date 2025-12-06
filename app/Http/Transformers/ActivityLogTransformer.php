<?php

namespace App\Http\Transformers;

use App\Models\ActivityLog;
use League\Fractal\TransformerAbstract;

class ActivityLogTransformer extends TransformerAbstract
{
    protected $availableIncludes = [
        'user',
    ];

    public function transform(ActivityLog $activityLog)
    {
        return [
            'id' => $activityLog->id,
            'action' => $activityLog->action,
            'model_type' => $activityLog->model_type,
            'model_id' => $activityLog->model_id,
            'description' => $activityLog->description,
            'properties' => $activityLog->properties,
            'ip_address' => $activityLog->ip_address,
            'user_agent' => $activityLog->user_agent,
            'created_at' => $activityLog->created_at?->toISOString(),
            'updated_at' => $activityLog->updated_at?->toISOString(),
        ];
    }

    public function includeUser(ActivityLog $activityLog)
    {
        if (!$activityLog->user) {
            return null;
        }

        return $this->item($activityLog->user, new UserTransformer());
    }
}

