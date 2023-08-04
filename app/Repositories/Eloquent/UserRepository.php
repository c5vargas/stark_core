<?php
namespace App\Repositories\Eloquent;

use App\Models\User;

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
