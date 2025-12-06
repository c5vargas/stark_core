<?php

namespace App\Repositories\Eloquent;

use App\Models\ActivityLog;
use Illuminate\Database\Eloquent\Collection;

class ActivityLogRepository extends BaseRepository
{
    protected $model;

    /**
     * ActivityLogRepository constructor.
     *
     * @param ActivityLog $activityLog
     */
    public function __construct(ActivityLog $activityLog)
    {
        $this->model = $activityLog;
    }

    /**
     * Paginate activity logs with filters.
     */
    public function paginate(array $params): Collection
    {
        $query = $this->model->query()->with('user');

        // Filter by user
        if (isset($params['user_id']) && !empty($params['user_id'])) {
            $query->forUser($params['user_id']);
        }

        // Filter by action
        if (isset($params['action']) && !empty($params['action'])) {
            $query->action($params['action']);
        }

        // Filter by model type
        if (isset($params['model_type']) && !empty($params['model_type'])) {
            $query->modelType($params['model_type']);
        }

        // Filter by date range
        if (isset($params['start_date']) && isset($params['end_date'])) {
            $query->dateRange($params['start_date'], $params['end_date']);
        }

        // Search in description
        if (isset($params['query']) && !empty($params['query'])) {
            $query->where('description', 'LIKE', '%' . $params['query'] . '%');
        }

        // Sort
        $sortBy = $params['sortBy'] ?? 'created_at';
        $sortOrder = $params['sortOrder'] ?? 'desc';
        $query->orderBy($sortBy, $sortOrder);

        // Pagination
        if (isset($params['page']) && isset($params['perPage'])) {
            $perPage = $params['perPage'] ?? 15;
            $query->skip(($params['page'] - 1) * $perPage)->take($perPage);
        }

        return $query->get();
    }
}

