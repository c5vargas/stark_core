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

            if(!$app->mail_host || !$app->mail_port || !$app->mail_username || !$app->mail_password)
                return;

            $config = array(
                'driver'     => $app->mail_driver,
                'host'       => $app->mail_host,
                'port'       => $app->mail_port,
                'from'       => array('address' => $app->mail_from_address, 'name' => $app->mail_from_name),
                'encryption' => $app->mail_encryption,
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
