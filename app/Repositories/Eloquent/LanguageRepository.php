<?php

namespace App\Repositories\Eloquent;

use App\Models\Language;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

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
        //Get All Lang Directories
        $directories = Storage::disk("root")->directories("lang");

        if(!$directories.includes($data['code'])) {
            Storage::disk("root")->copy("/lang/en", "lang/{$data['code']}");
        }

        return $this->model->create($data);
    }
}
