<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Setting;

class IndexController extends Controller
{

    public function __construct(Request $request){
        parent::__construct(null, $request);
    }

    public function show() {
        $data = Setting::all();
        $settings = new \stdClass();

        foreach ($data as $key => $item) {
            $propiety = $item->key;
            $settings->$propiety = $item->value;
        }

        return view('index', compact('settings'));
    }
}
