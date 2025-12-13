<?php

namespace App\Console\Commands;

use App\Repositories\Eloquent\UserSessionRepository;
use Illuminate\Console\Command;

class CleanExpiredSessions extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sessions:clean-expired';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Clean expired user sessions from the database';

    /**
     * Execute the console command.
     */
    public function handle(UserSessionRepository $repository)
    {
        $deleted = $repository->cleanExpiredSessions();
        $this->info("Cleaned {$deleted} expired sessions.");
        return Command::SUCCESS;
    }
}
