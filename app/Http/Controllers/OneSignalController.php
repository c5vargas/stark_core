<?php

namespace App\Http\Controllers;

use App\Http\Transformers\RoleTransformer;
use App\Models\Setting;
use App\Repositories\Eloquent\RoleRepository;
use App\Services\OneSignalService;
use Illuminate\Http\Request;
use Berkayk\OneSignal\OneSignalFacade;

class OneSignalController extends Controller
{
    private $service;

    public function __construct(
        RoleTransformer $transformer,
        Request $request
    ){
        parent::__construct($transformer, $request);
    }

    public function index(OneSignalService $oneSignalService)
    {
        $notifications = $oneSignalService->getNotifications();
        return $this->respondWithArray($notifications);
    }

    public function show(OneSignalService $oneSignalService, int $id)
    {
        $notifications = $oneSignalService->getNotification($id);
        return $this->respondWithArray($notifications);
    }
}
