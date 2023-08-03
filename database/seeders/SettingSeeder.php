<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('settings')->insert(['key' => 'app_logo', 'value' => '/assets/img/logo.png']);
        DB::table('settings')->insert(['key' => 'app_url', 'value' => config('app.url')]);
        DB::table('settings')->insert(['key' => 'app_favicon', 'value' => '/assets/img/favicon.png']);
        DB::table('settings')->insert(['key' => 'app_name', 'value' => 'Default Laravel SPA']);
        DB::table('settings')->insert(['key' => 'app_locale', 'value' => config('app.locale')]);
        DB::table('settings')->insert(['key' => 'app_email', 'value' => 'hello@laravel.com']);
        DB::table('settings')->insert(['key' => 'app_timezone', 'value' => config('app.timezone')]);
        DB::table('settings')->insert(['key' => 'app_translations', 'value' => 1]);

        // Google Analytics
        DB::table('settings')->insert(['key' => 'analytics_property_id', 'value' => '']);
        DB::table('settings')->insert(['key' => 'manager_measurement_id', 'value' => '']);
        DB::table('settings')->insert(['key' => 'maps_api_key', 'value' => '']);
    }
}
