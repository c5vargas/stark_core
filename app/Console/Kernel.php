<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        // Daily database backup at 2 AM
        $schedule->command('backup:database --compress')
            ->dailyAt('02:00')
            ->onFailure(function () {
                \Log::error('Database backup failed');
            });

        // Daily files backup at 3 AM
        $schedule->command('backup:files --path=storage')
            ->dailyAt('03:00')
            ->onFailure(function () {
                \Log::error('Files backup failed');
            });
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
