<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;

class PublicController extends Controller
{
    public function __construct(Request $request)
    {
        parent::__construct(null, $request);
    }

    /**
     * Get public settings that don't require authentication
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getPublicSettings()
    {
        $publicKeys = [
            'app_name',
            'app_logo',
            'gdpr_privacy_page',
            'gdpr_cookies_page',
        ];

        $settings = Setting::whereIn('key', $publicKeys)->get();

        $result = [];
        foreach ($settings as $setting) {
            $result[$setting->key] = $setting->value;
        }

        // Fallback to config values if not in database
        if (!isset($result['app_name'])) {
            $result['app_name'] = config('app.name');
        }

        return response()->json([
            'status' => 200,
            'results' => $result,
        ]);
    }
}

