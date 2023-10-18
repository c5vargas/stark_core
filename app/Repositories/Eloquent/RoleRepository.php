<?php

namespace App\Repositories\Eloquent;

use Spatie\Permission\Models\Role;

class RoleRepository extends BaseRepository
{
    protected $model;

    /**
     * RoleRepository constructor.
     *
     * @param Role $item
     */
    public function __construct(Role $item)
    {
        $this->model = $item;
    }
}
