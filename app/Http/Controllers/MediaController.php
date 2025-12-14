<?php

namespace App\Http\Controllers;

use App\Http\Requests\Api\Media\StoreRequest;
use App\Http\Requests\Api\Media\DeleteRequest;
use App\Http\Transformers\MediaTransformer;
use App\Repositories\Eloquent\MediaRepository;
use Exception;
use Illuminate\Http\Request;

class MediaController extends Controller
{
    /**
     * @property MediaRepository $repository
     */
    private $repository;

    public function __construct(
        MediaTransformer $transformer,
        MediaRepository $repository,
        Request $request
    ){
        parent::__construct($transformer, $request);
        $this->repository = $repository;
    }

    public function index()
    {
        if (!auth()->user()->can('view.media')) {
            abort(403, 'Unauthorized');
        }

        $items = $this->repository->all();
        return $this->respondWithCollection($items);
    }

    public function store(StoreRequest $request)
    {
        $file = $request->file('file');
        $media = $this->repository->upload($file);
        return $this->respondWithItem($media);
    }

    public function delete(DeleteRequest $request, $id)
    {
        $deleted = $this->repository->delete($id);

        if (!$deleted) {
            throw new Exception(__('messages.controller.common.error_500'), 500);
        }

        return $this->respondWithMessage(__('messages.controller.media.deleted'));
    }
}
