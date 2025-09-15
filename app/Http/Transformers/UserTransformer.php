<?php

namespace App\Http\Transformers;

use App\Models\User;
use League\Fractal\TransformerAbstract;

class UserTransformer extends TransformerAbstract
{

    public function transform(User $user)
    {
        return [
            'id'            => $user->id,
            'name'          => $user->name,
            'username'      => $user->username,
            'email'         => $user->email,
            'avatar'        => $user->avatar,
            'status'        => $user->status instanceof \BackedEnum ? $user->status->value : $user->status,
            'locale'        => $user->locale,
            'metadata'      => $user->metadata ?? [],

            'last_login_at' => $user->last_login_at,
            'created_at'    => $user->created_at,
            'updated_at'    => $user->updated_at,
        ];
    }
}
