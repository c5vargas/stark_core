<?php

namespace App\Http\Controllers;

use App\Http\Requests\Api\Notification\CreateRequest;
use App\Http\Transformers\RoleTransformer;
use App\Services\OneSignalService;
use Exception;
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
        $response = $oneSignalService->create($request->validated());

        if(property_exists($response, 'errors'))
            throw new Exception(__($response->errors[0]), 500);

        return $this->respondWithMessage(__('messages.controller.onesignal.created'));
    }

    public function delete(OneSignalService $oneSignalService, string $id)
    {
        $response = $oneSignalService->cancel($id);

        if(property_exists($response, 'errors'))
            throw new Exception(__($response->errors[0]), 500);

        return $this->respondWithMessage(__('messages.controller.onesignal.deleted'));
    }

}
