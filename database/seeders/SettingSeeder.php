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
        // App settings
        DB::table('settings')->insert(['key' => 'app_logo', 'value' => '/assets/img/logo.png']);
        DB::table('settings')->insert(['key' => 'app_favicon', 'value' => '/assets/img/favicon.png']);
        DB::table('settings')->insert(['key' => 'app_name', 'value' => config('app.name')]);
        DB::table('settings')->insert(['key' => 'app_descr', 'value' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus rutrum ligula a arcu consequat, in aliquam tellus auctor.']);
        DB::table('settings')->insert(['key' => 'app_locale', 'value' => config('app.locale')]);
        DB::table('settings')->insert(['key' => 'app_color', 'value' => "#4c59ff"]);
        DB::table('settings')->insert(['key' => 'app_timezone', 'value' => config('app.timezone')]);
        DB::table('settings')->insert(['key' => 'app_translations', 'value' => 1]);

        // Google Analytics
        DB::table('settings')->insert(['key' => 'analytics_property_id', 'value' => '']);
        DB::table('settings')->insert(['key' => 'manager_measurement_id', 'value' => '']);
        DB::table('settings')->insert(['key' => 'maps_api_key', 'value' => '']);

        // OneSignal Push Notifications
        DB::table('settings')->insert(['key' => 'onesignal_app_id', 'value' => 'df004855-d21d-4b90-88e3-7c6bb78ddc70']);
        DB::table('settings')->insert(['key' => 'onesignal_safari_web_id', 'value' => 'web.onesignal.auto.6514249a-4cb8-451b-a889-88f5913c9a7f']);
        DB::table('settings')->insert(['key' => 'onesignal_api_key', 'value' => 'OGNiMjlkYTMtOTM5MC00YzEwLWE5OWMtMmU5ZDQwOTliM2Rm']);

        //Mail
        DB::table('settings')->insert(['key' => 'mail_from_address', 'value' => 'example@mail.com']);
        DB::table('settings')->insert(['key' => 'mail_contact_address', 'value' => 'example@mail.com']);
        DB::table('settings')->insert(['key' => 'mail_from_name', 'value' => config('app.name')]);
        DB::table('settings')->insert(['key' => 'mail_driver', 'value' => 'smtp']);
        DB::table('settings')->insert(['key' => 'mail_host', 'value' => env('MAIL_HOST', 'smtp.mailgun.org')]);
        DB::table('settings')->insert(['key' => 'mail_port', 'value' => env('MAIL_PORT', 587)]);
        DB::table('settings')->insert(['key' => 'mail_encryption', 'value' => env('MAIL_ENCRYPTION', 'tls')]);
        DB::table('settings')->insert(['key' => 'mail_username', 'value' => env('MAIL_USERNAME')]);
        DB::table('settings')->insert(['key' => 'mail_password', 'value' => env('MAIL_PASSWORD')]);
        
        //GDPR
        DB::table('settings')->insert(['key' => 'gdpr_show_cookie_banner', 'value' => 1]);
        DB::table('settings')->insert(['key' => 'gdpr_privacy_page', 'value' => '{"time":1722354636830,"blocks":[{"id":"N_imFtQAvl","type":"header","data":{"text":"Privacy policy","level":3}},{"id":"B9XEMQcT-B","type":"paragraph","data":{"text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia leo sit amet neque laoreet faucibus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin in purus id orci condimentum gravida. Nam malesuada ultricies lacus id congue. Ut eu nisi id enim pellentesque cursus ut sit amet augue. Maecenas a ipsum vitae eros bibendum egestas id in ipsum. Nullam ut mauris blandit, interdum leo nec, molestie sem. Etiam fermentum venenatis erat vitae euismod. Vestibulum feugiat purus mattis eros fringilla, vel commodo urna maximus. In hac habitasse platea dictumst."}},{"id":"yS3Wz9Xv_c","type":"paragraph","data":{"text":"Integer ut laoreet purus, id scelerisque odio. Maecenas ipsum lacus, posuere in erat ac, congue dictum eros. Curabitur quis fermentum urna, sit amet mollis ligula. In hac habitasse platea dictumst. Quisque a accumsan tortor. Aliquam consectetur mauris id tortor commodo, vel viverra justo tincidunt. Vivamus quam est, molestie a neque non, ornare dignissim tellus. Fusce congue arcu tortor, quis congue est tristique id. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Mauris vitae pellentesque ex, ac maximus libero. Curabitur et tortor suscipit, sagittis nibh vel, ullamcorper massa."}}],"version":"2.30.2"}']);
        DB::table('settings')->insert(['key' => 'gdpr_cookies_page', 'value' => '{"time":1722354636830,"blocks":[{"id":"N_imFtQAvl","type":"header","data":{"text":"Cookies policy","level":3}},{"id":"B9XEMQcT-B","type":"paragraph","data":{"text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia leo sit amet neque laoreet faucibus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin in purus id orci condimentum gravida. Nam malesuada ultricies lacus id congue. Ut eu nisi id enim pellentesque cursus ut sit amet augue. Maecenas a ipsum vitae eros bibendum egestas id in ipsum. Nullam ut mauris blandit, interdum leo nec, molestie sem. Etiam fermentum venenatis erat vitae euismod. Vestibulum feugiat purus mattis eros fringilla, vel commodo urna maximus. In hac habitasse platea dictumst."}},{"id":"yS3Wz9Xv_c","type":"paragraph","data":{"text":"Integer ut laoreet purus, id scelerisque odio. Maecenas ipsum lacus, posuere in erat ac, congue dictum eros. Curabitur quis fermentum urna, sit amet mollis ligula. In hac habitasse platea dictumst. Quisque a accumsan tortor. Aliquam consectetur mauris id tortor commodo, vel viverra justo tincidunt. Vivamus quam est, molestie a neque non, ornare dignissim tellus. Fusce congue arcu tortor, quis congue est tristique id. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Mauris vitae pellentesque ex, ac maximus libero. Curabitur et tortor suscipit, sagittis nibh vel, ullamcorper massa."}}],"version":"2.30.2"}']);
    }
}
