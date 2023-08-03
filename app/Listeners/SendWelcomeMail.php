<?php

namespace App\Listeners;

use App\Events\UserSignedUp;
use App\Jobs\SendWelcomeMailJob;

class SendWelcomeMail
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(UserSignedUp $event): void
    {
        $user = $event->user;
        dispatch(new SendWelcomeMailJob($user));
    }
}
