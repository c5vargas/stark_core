<?php

namespace App\Repositories\Eloquent;

use App\Models\CustomField;
use Illuminate\Database\Eloquent\Collection;

class CustomFieldRepository extends BaseRepository
{
    protected $model;

    /**
     * CustomFieldRepository constructor.
     *
     * @param CustomField $customField
     */
    public function __construct(CustomField $customField)
    {
        $this->model = $customField;
    }

    /**
     * Get all fields ordered by order field.
     */
    public function all(): Collection
    {
        return $this->model->orderBy('order')->get();
    }

    /**
     * Get fields applicable for users.
     */
    public function getFieldsForUser(): Collection
    {
        return $this->model->orderBy('order')->get();
    }

    /**
     * Create a new custom field.
     */
    public function create(array $data): CustomField
    {
        // Set order if not provided
        if (!isset($data['order'])) {
            $maxOrder = $this->model->max('order') ?? 0;
            $data['order'] = $maxOrder + 1;
        }

        return $this->model->create($data);
    }

    /**
     * Update a custom field.
     */
    public function update(array $data, int $id): bool
    {
        $model = $this->find($id);
        return $model->update($data);
    }
}

