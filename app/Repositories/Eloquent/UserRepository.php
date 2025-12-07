<?php
namespace App\Repositories\Eloquent;

use App\Models\User;
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
        if (isset($params['status']) && !empty($params['status'])) {
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

}
