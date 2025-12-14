<?php

namespace App\Providers;

use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;
use stdClass;

class MailConfigServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register()
    {
        if (Schema::hasTable('settings')) {
            $app = $this->getSettingsPhp();

            if(!isset($app->mail_host) || !isset($app->mail_port) || !isset($app->mail_username) || !isset($app->mail_password))
                return;

            if(empty($app->mail_host) || empty($app->mail_port) || empty($app->mail_username) || empty($app->mail_password))
                return;

            $config = array(
                'driver'     => $app->mail_driver ?? 'smtp',
                'host'       => $app->mail_host,
                'port'       => $app->mail_port,
                'from'       => array(
                    'address' => $app->mail_from_address ?? config('mail.from.address'),
                    'name' => $app->mail_from_name ?? config('mail.from.name')
                ),
                'encryption' => $app->mail_encryption ?? null,
                'username'   => $app->mail_username,
                'password'   => $app->mail_password,
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

    private function getSettingsPhp(): stdClass {
        $data = DB::table('settings')->where('key', 'like', 'mail_%')->get();
        $settings = new stdClass();

        foreach ($data as $item) {
            $propiety = $item->key;
            $settings->$propiety = $item->value;
        }

        return $settings;
    }
}
