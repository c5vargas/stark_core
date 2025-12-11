<?php
namespace App\Repositories\Eloquent;

use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;

class UserRepository extends BaseRepository
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

    /**
     * Paginate users with filters, search, and sorting.
     */
    public function paginate(array $params): LengthAwarePaginator
    {
        $query = $this->model->query();

        // Search in name and email
        if (isset($params['query']) && !empty($params['query'])) {
            $query->where(function ($q) use ($params) {
                $q->where('name', 'LIKE', '%' . $params['query'] . '%')
                  ->orWhere('email', 'LIKE', '%' . $params['query'] . '%');
            });
        }

        // Filter by status
        if (isset($params['filters']['status']) && !empty($params['filters']['status'])) {
            $query->where('status', $params['filters']['status']);
        } elseif (isset($params['status']) && !empty($params['status'])) {
            // Backward compatibility
            $query->where('status', $params['status']);
        }

        // Sort
        $sortBy = $params['sortBy'] ?? 'created_at';
        $sortOrder = $params['sortOrder'] ?? 'desc';
        $query->orderBy($sortBy, $sortOrder);

        // Pagination
        $perPage = $params['perPage'] ?? 15;
        $page = $params['page'] ?? 1;

        return $query->paginate($perPage, ['*'], 'page', $page);
    }

    /**
     * Delete a Model
     *
     * @param string $id
     *
     * @return boolean
     */
    public function delete(int $id): bool
    {
        $model = $this->find($id);

        if(!$model)
            return false;

        return $model->delete();
    }

    /**
     * Get user statistics.
     */
    public function getStatistics(): array
    {
        $total = $this->model->count();
        $active = $this->model->where('status', 'active')->count();
        $inactive = $this->model->where('status', 'inactive')->count();
        $pending = $this->model->where('status', 'pending')->count();
        $blocked = $this->model->where('status', 'blocked')->count();
        
        $newThisMonth = $this->model->whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->count();

        return [
            'total' => $total,
            'active' => $active,
            'inactive' => $inactive,
            'pending' => $pending,
            'blocked' => $blocked,
            'new_this_month' => $newThisMonth,
        ];
    }

    /**
     * Bulk update users.
     */
    public function bulkUpdate(array $userIds, array $data): int
    {
        return $this->model->whereIn('id', $userIds)->update($data);
    }

    /**
     * Bulk delete users.
     */
    public function bulkDelete(array $userIds): int
    {
        return $this->model->whereIn('id', $userIds)->delete();
    }

    /**
     * Get activity logs for a user.
     */
    public function getActivityLogs(int $userId, array $params = []): LengthAwarePaginator
    {
        $user = $this->find($userId);
        
        $query = $user->activityLogs();

        // Filter by action
        if (isset($params['action']) && !empty($params['action'])) {
            $query->where('action', $params['action']);
        }

        // Filter by date range
        if (isset($params['start_date'])) {
            $query->whereDate('created_at', '>=', $params['start_date']);
        }
        if (isset($params['end_date'])) {
            $query->whereDate('created_at', '<=', $params['end_date']);
        }

        // Sort
        $sortBy = $params['sortBy'] ?? 'created_at';
        $sortOrder = $params['sortOrder'] ?? 'desc';
        $query->orderBy($sortBy, $sortOrder);

        // Pagination
        $perPage = $params['perPage'] ?? 15;
        $page = $params['page'] ?? 1;

        return $query->paginate($perPage, ['*'], 'page', $page);
    }

    /**
     * Get sessions for a user.
     */
    public function getSessions(int $userId): Collection
    {
        $user = $this->find($userId);
        $sessions = $user->sessions()->orderBy('last_activity', 'desc')->get();
        
        // Clean up sessions where the Sanctum token no longer exists
        foreach ($sessions as $session) {
            if ($session->personal_access_token_id) {
                $token = \Laravel\Sanctum\PersonalAccessToken::find($session->personal_access_token_id);
                if (!$token) {
                    // Token was revoked, delete the session record
                    $session->delete();
                }
            }
        }
        
        // Return updated sessions
        return $user->sessions()->orderBy('last_activity', 'desc')->get();
    }

    /**
     * Sync roles for a user.
     */
    public function syncRoles(int $userId, array $roleIds): bool
    {
        $user = $this->find($userId);
        $user->syncRoles($roleIds);
        return true;
    }

    /**
     * Sync permissions for a user.
     */
    public function syncPermissions(int $userId, array $permissionIds): bool
    {
        $user = $this->find($userId);
        $user->syncPermissions($permissionIds);
        return true;
    }

    /**
     * Create a new user with custom fields support.
     */
    public function create(array $data): Model
    {
        $customFields = $data['custom_fields'] ?? null;
        unset($data['custom_fields']);

        /** @var User $user */
        $user = parent::create($data);

        if ($customFields && is_array($customFields)) {
            $this->saveCustomFields($user->id, $customFields);
        }

        return $user;
    }

    /**
     * Update a user with custom fields support.
     */
    public function update(array $data, int $id): bool
    {
        $customFields = $data['custom_fields'] ?? null;
        unset($data['custom_fields']);

        $updated = parent::update($data, $id);

        if ($customFields && is_array($customFields)) {
            $this->saveCustomFields($id, $customFields);
        }

        return $updated;
    }

    /**
     * Save custom fields for a user.
     */
    private function saveCustomFields(int $userId, array $customFields): void
    {
        $customFieldIds = \App\Models\CustomField::pluck('id', 'name')->toArray();

        foreach ($customFields as $fieldName => $value) {
            if (isset($customFieldIds[$fieldName])) {
                $fieldId = $customFieldIds[$fieldName];
                
                // Find or create the custom field value model
                $fieldValue = \App\Models\UserCustomFieldValue::firstOrNew([
                    'user_id' => $userId,
                    'custom_field_id' => $fieldId,
                ]);
                
                // Use the mutator to properly encode the value as JSON
                $fieldValue->value = $value;
                $fieldValue->save();
            }
        }
    }
}
