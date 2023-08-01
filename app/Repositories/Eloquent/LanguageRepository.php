<?php

namespace App\Repositories\Eloquent;

use App\Models\Language;

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
}
