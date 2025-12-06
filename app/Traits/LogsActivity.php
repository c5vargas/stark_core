<?php

namespace App\Traits;

use App\Models\ActivityLog;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;

trait LogsActivity
{
    /**
     * Boot the trait.
     */
    protected static function bootLogsActivity()
    {
        static::created(function (Model $model) {
            static::logActivity($model, 'created');
        });

        static::updated(function (Model $model) {
            static::logActivity($model, 'updated');
        });

        static::deleted(function (Model $model) {
            static::logActivity($model, 'deleted');
        });
    }

    /**
     * Log an activity.
     */
    protected static function logActivity(Model $model, string $action)
    {
        $description = static::getActivityDescription($model, $action);
        $properties = static::getActivityProperties($model, $action);

        ActivityLog::create([
            'user_id' => Auth::id(),
            'action' => $action,
            'model_type' => get_class($model),
            'model_id' => $model->id,
            'description' => $description,
            'properties' => $properties,
            'ip_address' => Request::ip(),
            'user_agent' => Request::userAgent(),
        ]);

        
    }

    /**
     * Get the activity description.
     */
    protected static function getActivityDescription(Model $model, string $action): string
    {
        $modelName = class_basename($model);
        
        return match($action) {
            'created' => "Created {$modelName} #{$model->id}",
            'updated' => "Updated {$modelName} #{$model->id}",
            'deleted' => "Deleted {$modelName} #{$model->id}",
            default => "{$action} {$modelName} #{$model->id}",
        };
    }

    /**
     * Get the activity properties (changes made).
     */
    protected static function getActivityProperties(Model $model, string $action): ?array
    {
        if ($action === 'updated' && $model->wasChanged()) {
            $changes = [];
            foreach ($model->getChanges() as $key => $value) {
                // Skip sensitive fields
                if (in_array($key, ['password', 'remember_token'])) {
                    continue;
                }
                
                $changes[$key] = [
                    'old' => $model->getOriginal($key),
                    'new' => $value,
                ];
            }
            return $changes;
        }

        if ($action === 'created') {
            $attributes = $model->getAttributes();
            // Remove sensitive fields
            unset($attributes['password'], $attributes['remember_token']);
            return $attributes;
        }

        return null;
    }
}

