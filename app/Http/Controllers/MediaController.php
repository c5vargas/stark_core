<?php

namespace App\Http\Controllers;

use App\Http\Requests\Api\Media\StoreRequest;
use App\Http\Transformers\MediaTransformer;
use App\Repositories\Eloquent\MediaRepository;
use Illuminate\Http\Request;

class MediaController extends Controller
{
    /**
     * @property MediaRepository
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
        $items = $this->repository->all();
        return $this->respondWithCollection($items);
    }

    public function store(StoreRequest $request)
    {
        $file = $request->file('file');
        $media = $this->repository->upload($file);
        return $this->respondWithItem($media);
    }
}
