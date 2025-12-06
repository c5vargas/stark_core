<?php

namespace App\Listeners;

use App\Events\WantResetPassword;
use App\Jobs\SendResetPasswordMailJob;

class SendResetPasswordMail
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
    public function handle(WantResetPassword $event): void
    {
        dispatch(new SendResetPasswordMailJob($event->user, $event->token));
    }
}

