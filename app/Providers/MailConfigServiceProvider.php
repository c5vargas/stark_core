<?php

namespace App\Providers;

use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;

class MailConfigServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register()
    {
        if (Schema::hasTable('settings')) {
            $fromAddress = DB::table('settings')->where('key', 'mail_from_address')->first();
            $fromName = DB::table('settings')->where('key', 'mail_from_name')->first();
            $driver = DB::table('settings')->where('key', 'mail_driver')->first();
            $host = DB::table('settings')->where('key', 'mail_host')->first();
            $port = DB::table('settings')->where('key', 'mail_port')->first();
            $encryption = DB::table('settings')->where('key', 'mail_encryption')->first();
            $username = DB::table('settings')->where('key', 'mail_username')->first();
            $password = DB::table('settings')->where('key', 'mail_password')->first();

            if(!$driver)
                return;

            $config = array(
                'driver'     => $driver,
                'host'       => $host,
                'port'       => $port,
                'from'       => array('address' => $fromAddress, 'name' => $fromName),
                'encryption' => $encryption,
                'username'   => $username,
                'password'   => $password,
                'sendmail'   => '/usr/sbin/sendmail -bs -i',
                'pretend'    => false,
            );

            Config::set('mail', $config);
        }
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
