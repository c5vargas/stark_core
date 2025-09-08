<?php

namespace App\Jobs;

use App\Mail\TestEmail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Mail\Mailer;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SendTestMailJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $toEmail;

    /**
     * Create a new job instance.
     */
    public function __construct($email)
    {
        $this->toEmail = $email;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Mailer::to($this->toEmail)->send(new TestEmail());
    }
}
