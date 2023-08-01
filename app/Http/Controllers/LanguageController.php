<?php

namespace App\Http\Controllers;

use App\Http\Requests\Api\Language\CreateRequest;
use App\Http\Transformers\LanguageTransformer;
use App\Repositories\Eloquent\LanguageRepository;
use Exception;
use Illuminate\Http\Request;

class LanguageController extends Controller
{
    /**
     * @property LanguageRepositoryInterface
     */
    private $repository;

    public function __construct(
        LanguageTransformer $transformer,
        LanguageRepository $repository,
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
        return $this->respondWithItem($item, 201, __('controller.created'));
    }

    public function delete($id)
    {
        $deleted = $this->repository->delete($id);

        if(!$deleted)
            throw new Exception(__('controller.common.error_500'), 500);

        return $this->respondWithMessage(__('controller.user.deleted'));
    }
}
