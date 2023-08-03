<?php

namespace App\Mail;

use App\Models\Setting;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class WelcomeMail extends Mailable
{
    use Queueable, SerializesModels;

    public $toUser;
    public $appName;
    public $appLogo;
    public $appUrl;
    public $actualDate;

    public $password;
    public $fromUser;

    /**
     * Create a new message instance.
     */
    public function __construct($user)
    {
        $this->appName =  Setting::name();
        $this->appLogo = Setting::logo();
        $this->appUrl = config('app.url');
        $this->toUser = $user;
        $this->actualDate = Carbon::now()->toFormattedDateString();
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Welcome to ' . config('app.name'),
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.welcomeMail',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
