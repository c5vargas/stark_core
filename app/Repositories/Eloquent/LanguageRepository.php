<?php

namespace App\Repositories\Eloquent;

use App\Models\Language;
use Illuminate\Database\Eloquent\Model;

class LanguageRepository extends BaseRepository
{
    protected $model;

    /**
     * LanguageRepository constructor.
     *
     * @param Language $item
     */
    public function __construct(Language $item)
    {
        $this->model = $item;
    }

    public function create(array $data): Model
    {
        return $this->model->create($data);
    }
}
