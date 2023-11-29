<?php

namespace App\Services;

use App\Models\Setting;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Http;

class OneSignalService {

    protected $url;
    protected $appId;
    protected $headers;
    protected $client;
    protected $apiKey;

    public function __construct(Client $client) {
        $this->client = $client;
        $this->url = "https://onesignal.com/api/v1";
        $this->appId = Setting::OneSignalAppId();
        $this->apiKey = Setting::OneSignalApiKey();
        $this->headers = [
            "Authorization" => "Basic {$this->apiKey}",
            "accept" => "application/json",
            "Content-Type" => "application/json",
        ];
    }

    /**
     * View the details of multiple notifications
     *
     * @return array
     */
    public function getNotifications(): array
    {
        $response = Http::withHeaders($this->headers)->get("{$this->url}/notifications?app_id={$this->appId}");
        return $response->json();
    }

    /**
     * View the details of a single message and Outcomes associated with it
     *
     * @return array
     */
    public function getNotification($id): array
    {
        $response = Http::withHeaders($this->headers)->get("{$this->url}/notifications/{$id}?app_id={$this->appId}");
        return $response->json();
    }


    /**
     * Create and schedule (optional) a new push notification
     *
     * @return array
     */
    public function create($payload): array
    {
        $response = Http::withHeaders($this->headers)->post("{$this->url}/notifications", [
            'included_segments'     => ['Active Subscriptions'],
            'target_channel'        => 'push',
            'name'                  => 'ADMIN_GLOBAL_NOTIFICATION',
            'app_id'                => $this->appId,
            'contents'              => $payload['contents'],
            'headings'              => $payload['headings'],
            'send_after'            => $payload['send_after'],
            'delayed_option'        => 'timezone',
            'delivery_time_of_day'  => $payload['delivery_time_of_day'],
        ]);

        return $response->json();
    }
}
