<?php

namespace App\Observers;

use App\Events\UserSignedUp;
use App\Models\User;

class UserObserver
{
    /**
     * Handle the User "created" event.
     *
     * @param  \App\Models\User  $user
     * @return void
     */
    public function created(User $user)
    {
        UserSignedUp::dispatch($user);
    }
}
