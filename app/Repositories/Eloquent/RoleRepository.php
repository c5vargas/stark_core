<?php

namespace App\Repositories\Eloquent;

use Illuminate\Database\Eloquent\Collection;
use Spatie\Permission\Models\Permission;
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

    /**
     * Retrieve all Models
     *
     * @return Collection
     */
    public function getRolesAndPermissions(): Array
    {
        return [
            'roles' => $this->model->where('name', '!=', 'root')->with('permissions')->get(),
            'permissions' => Permission::all(),
        ];
    }
}
