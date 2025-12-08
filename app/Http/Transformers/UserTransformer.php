<?php

namespace App\Http\Transformers;

use App\Models\User;
use League\Fractal\TransformerAbstract;

class UserTransformer extends TransformerAbstract
{

    protected array $availableIncludes = [
        'roles',
        'customFields',
    ];

    public function transform(User $user)
    {
        $customFields = [];
        if ($user->relationLoaded('customFieldValues')) {
            foreach ($user->customFieldValues as $value) {
                $customFields[] = [
                    'id' => $value->id,
                    'custom_field_id' => $value->custom_field_id,
                    'value' => $value->value,
                    'custom_field' => $value->customField ? [
                        'id' => $value->customField->id,
                        'name' => $value->customField->name,
                        'type' => $value->customField->type,
                        'label' => $value->customField->label,
                    ] : null,
                ];
            }
        }

        return [
            'id'            => $user->id,
            'name'          => $user->name,
            'username'      => $user->username,
            'email'         => $user->email,
            'avatar'        => $user->avatar,
            'status'        => $user->status instanceof \BackedEnum ? $user->status->value : $user->status,
            'locale'        => $user->locale,
            'metadata'      => $user->metadata ?? [],
            'permissions'   => $user->getAllPermissions()->pluck('name')->toArray(),
            'roles'         => $user->roles->pluck('name')->toArray(),
            'custom_fields' => $customFields,

            'last_login_at' => $user->last_login_at,
            'created_at'    => $user->created_at,
            'updated_at'    => $user->updated_at,
        ];
    }

    public function includeRoles(User $user)
    {
        return $this->collection($user->roles, new RoleTransformer());
    }

    public function includeCustomFields(User $user)
    {
        if ($user->customFields->isEmpty()) {
            return null;
        }
        return $this->collection($user->customFields, new CustomFieldTransformer());
    }
}
