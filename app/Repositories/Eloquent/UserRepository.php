<?php
namespace App\Repositories\Eloquent;

use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

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

    public function paginate(array $params): Collection
    {
        $query = $this->model->query();

        if (array_key_exists('query', $params)) {
            $query = $query->where('name', 'LIKE', '%' . $params['query'] . '%');
            $query = $query->orWhere('email', 'LIKE', '%' . $params['query'] . '%');
        }

        if (array_key_exists('page', $params)) {
            $query = $query->skip(($params['page'] - 1) * $params['perPage'])->take($params['perPage']);
        }

        return $query->get();
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
