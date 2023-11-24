<?php

namespace App\Services;

use App\Models\Setting;
use GuzzleHttp\Client;
use GuzzleHttp\Psr7\Response;
use GuzzleHttp\Psr7\Stream;
use Illuminate\Http\Client\Response as ClientResponse;
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
}
