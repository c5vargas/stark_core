<?php

namespace App\Http\Controllers;

use App\Models\Language;
use Illuminate\Http\Request;
use App\Models\Setting;

class IndexController extends Controller
{

    public function __construct(Request $request){
        parent::__construct(null, $request);
    }

    public function show() {
        $data = Setting::all();
        $languages = Language::all();
        $settings = new \stdClass();

        foreach ($data as $key => $item) {
            $propiety = $item->key;
            $settings->$propiety = $item->value;
        }

        return view('index', compact('settings', 'languages'));
    }

    public function generateManifest() {
        $data = Setting::all();
        $settings = new \stdClass();

        foreach ($data as $item) {
            $propiety = $item->key;
            $settings->$propiety = $item->value;
        }

        $data = [
            "name" => $settings->app_name,
            "short_name" => $settings->app_name,
            "icons" => [
                "src" => $settings->app_favicon,
                "sizes" => "192x192",
                "type" => "image/png"
            ],
            "start_url" => "/",
            "scope" => ".",
            "display" => "standalone",
            "background_color" => "#fff",
            "theme_color" => '#ddd',
            "description" => $settings->app_descr,
        ];

        return response()->json($data);
    }
}
