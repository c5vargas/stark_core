<?php

namespace App\Http\Transformers;

use League\Fractal\TransformerAbstract;
use Spatie\Permission\Models\Permission;

class PermissionTransformer extends TransformerAbstract
{

    public function transform(Permission $item)
    {
        return [
            'id' => $item->id,
            'name' => $item->name,
            'created_at' => $item->created_at,
        ];
    }
}
