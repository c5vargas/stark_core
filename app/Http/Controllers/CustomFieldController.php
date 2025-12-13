<?php

namespace App\Http\Controllers;

use App\Http\Requests\Api\CustomField\CreateRequest;
use App\Http\Requests\Api\CustomField\UpdateRequest;
use App\Http\Transformers\CustomFieldTransformer;
use App\Repositories\Eloquent\CustomFieldRepository;
use Exception;
use Illuminate\Http\Request;

class CustomFieldController extends Controller
{
    /**
     * @property CustomFieldRepository $repository
     */
    private $repository;

    public function __construct(
        CustomFieldTransformer $transformer,
        CustomFieldRepository $repository,
        Request $request
    ) {
        parent::__construct($transformer, $request);
        $this->repository = $repository;
    }

    /**
     * Get all custom fields.
     */
    public function index()
    {
        $fields = $this->repository->all();
        return $this->respondWithCollection($fields);
    }

    /**
     * Create a new custom field.
     */
    public function store(CreateRequest $request)
    {
        $field = $this->repository->create($request->validated());
        return $this->respondWithItem($field, 201, __('messages.controller.custom_field.created'));
    }

    /**
     * Update a custom field.
     */
    public function update(UpdateRequest $request, int $id)
    {
        $updated = $this->repository->update($request->validated(), $id);

        if (!$updated) {
            throw new Exception(__('messages.controller.common.error_500'), 500);
        }

        return $this->respondWithMessage(__('messages.controller.updated'));
    }

    /**
     * Delete a custom field.
     */
    public function delete(int $id)
    {
        $deleted = $this->repository->delete($id);

        if (!$deleted) {
            throw new Exception(__('messages.controller.common.error_500'), 500);
        }

        return $this->respondWithMessage(__('messages.controller.custom_field.deleted'));
    }
}
