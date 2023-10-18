<?php

namespace App\Http\Transformers;

use League\Fractal\TransformerAbstract;
use Spatie\Permission\Models\Role;

class RoleTransformer extends TransformerAbstract
{

    protected array $defaultIncludes = [
        'permissions',
    ];

    public function transform(Role $item)
    {
        return [
            'id' => $item->id,
            'name' => $item->name,
            'created_at' => $item->created_at,
        ];
    }

    public function includePermissions(Role $item)
    {
        return $this->collection($item->permissions, new PermissionTransformer());
    }
}
