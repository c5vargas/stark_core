<?php

namespace App\Http\Controllers;

use App\Http\Transformers\ActivityLogTransformer;
use App\Repositories\Eloquent\ActivityLogRepository;
use Illuminate\Http\Request;

class ActivityLogController extends Controller
{
    /**
     * @property ActivityLogRepository
     */
    private $repository;

    public function __construct(
        ActivityLogTransformer $transformer,
        ActivityLogRepository $repository,
        Request $request
    ) {
        parent::__construct($transformer, $request);
        $this->repository = $repository;
    }

    /**
     * Get paginated activity logs.
     */
    public function index()
    {
        $logs = $this->repository->paginate($this->request->all());
        return $this->respondWithCollection($logs);
    }

    /**
     * Get a single activity log.
     */
    public function show(int $id)
    {
        $log = $this->repository->find($id);
        return $this->respondWithItem($log);
    }
}

