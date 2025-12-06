<?php

namespace App\Mail;

use App\Models\Setting;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ResetPasswordMail extends Mailable
{
    use Queueable, SerializesModels;

    public $toUser;
    public $appName;
    public $appLogo;
    public $appUrl;
    public $actualDate;
    public $token;
    public $appColor;

    /**
     * Create a new message instance.
     */
    public function __construct($user, string $token)
    {
        $this->appName = Setting::name();
        $this->appLogo = Setting::logo();
        $this->appUrl = config('app.url');
        $this->toUser = $user;
        $this->actualDate = Carbon::now()->toFormattedDateString();
        $this->token = $token;
        $this->appColor = Setting::color();
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: __('messages.mail.reset_password.subject', ['app' => config('app.name')]),
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.resetPasswordMail',
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

