<?php

namespace App\Http\Controllers;

use App\Http\Requests\Api\Setting\UpdateRequest;
use App\Http\Transformers\SettingTransformer;
use App\Repositories\Eloquent\SettingRepository;
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

    public function update(UpdateRequest $request)
    {
        $updated = $this->repository->updateKey($request->validated());

        if(!$updated)
            throw new Exception(__('controller.common.error_500'), 500);

        return $this->respondWithMessage(__('controller.updated'));
    }
}
