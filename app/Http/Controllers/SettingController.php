<?php

namespace App\Http\Controllers;

use App\Http\Requests\Api\Setting\EmailTestRequest;
use App\Http\Requests\Api\Setting\UpdateRequest;
use App\Http\Transformers\SettingTransformer;
use App\Jobs\SendTestMailJob;
use App\Repositories\Eloquent\SettingRepository;
use Exception;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    /**
     * @property SettingRepositoryInterface
     */
    private $repository;

    public function __construct(
        SettingTransformer $transformer,
        SettingRepository $repository,
        Request $request
    ){
        parent::__construct($transformer, $request);
        $this->repository = $repository;
    }

    public function index()
    {
        $items = $this->repository->all();
        return $this->respondWithCollection($items);
    }

    public function update(UpdateRequest $request)
    {
        $updated = $this->repository->updateKey($request->validated());

        if(!$updated)
            throw new Exception(__('messages.controller.common.error_500'), 500);

        return $this->respondWithMessage(__('messages.controller.updated'));
    }

    public function sendTest(EmailTestRequest $request)
    {
        try {
            SendTestMailJob::dispatchSync($request->input('email'));
            return $this->respondWithMessage(__('messages.controller.sent'));
        } catch (\Throwable $th) {
            throw new Exception(__('messages.controller.common.error_500'), 500);
        }
    }
}
