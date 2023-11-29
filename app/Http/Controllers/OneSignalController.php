<?php

namespace App\Http\Controllers;

use App\Http\Requests\Api\Notification\CreateRequest;
use App\Http\Transformers\RoleTransformer;
use App\Services\OneSignalService;
use Illuminate\Http\Request;

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

    public function show(OneSignalService $oneSignalService, string $id)
    {
        $notifications = $oneSignalService->getNotification($id);
        return $this->respondWithArray($notifications);
    }

    public function create(OneSignalService $oneSignalService, CreateRequest $request)
    {
        $notification = $oneSignalService->create($request->validated());

        if(!$notification['id'])
            throw new Exception(__('messages.controller.common.error_500'), 500);

        return $this->respondWithMessage(__('messages.controller.onesignal.created'));
    }

}
