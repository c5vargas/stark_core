<?php

namespace App\Http\Controllers;

use App\Jobs\SendWelcomeMailJob;
use App\Models\Language;
use App\Models\Setting;
use Illuminate\Http\Request;

class DashboardController extends Controller
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

        return view('admin', compact('settings', 'languages'));
    }
}
