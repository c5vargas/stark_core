<?php

namespace App\Http\Controllers;

use App\Http\Transformers\RoleTransformer;
use App\Models\Setting;
use App\Repositories\Eloquent\RoleRepository;
use Illuminate\Http\Request;
use Berkayk\OneSignal\OneSignalFacade;

class OneSignalController extends Controller
{
    private $appId;
    private $apiKey;
    private $repository;

    public function __construct(
        RoleTransformer $transformer,
        RoleRepository $repository,
        Request $request
    ){
        parent::__construct($transformer, $request);
        $this->repository = $repository;
        $this->appId = Setting::OneSignalAppId();
        $this->apiKey = Setting::OneSignalApiKey();
    }

    public function index()
    {
        $notifications = OneSignalFacade::getNotifications($this->appId);

        return $this->respondWithArray($notifications);
    }

    public function show(int $id)
    {
        $notification = OneSignal::getNotifications($id, $this->appId);
        return $this->respondWithItem($notification);
    }
}
