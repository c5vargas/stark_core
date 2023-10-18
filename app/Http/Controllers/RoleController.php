<?php

namespace App\Http\Controllers;

use App\Http\Requests\Api\Role\CreateRequest;
use App\Http\Requests\Api\Role\UpdateRequest;
use App\Http\Transformers\RoleTransformer;
use App\Repositories\Eloquent\RoleRepository;
use Illuminate\Http\Request;
use Exception;

class RoleController extends Controller
{
    /**
     * @property LanguageRepositoryInterface
     */
    private $repository;

    public function __construct(
        RoleTransformer $transformer,
        RoleRepository $repository,
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

    public function create(CreateRequest $request)
    {
        $item = $this->repository->create($request->validated());
        return $this->respondWithItem($item, 201, __('messages.controller.created'));
    }

    public function update(UpdateRequest $request)
    {
        $updated = $this->repository->update($request->validated(), $request->input('id'));

        if(!$updated)
            throw new Exception(__('controller.common.error_500'), 500);

        return $this->respondWithMessage(__('controller.user.updated'));
    }

    public function delete($id)
    {
        $deleted = $this->repository->delete($id);

        if(!$deleted)
            throw new Exception(__('messages.controller.common.error_500'), 500);

        return $this->respondWithMessage(__('messages.controller.user.deleted'));
    }
}
