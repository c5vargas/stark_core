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
        $directories = Storage::disk("root")->directories("lang");
        $code = $data['code'];

        if(!$directories.includes($code)) {
            Storage::disk("root")->copy("/lang/en", "lang/{$code}");
        }

        return $this->model->create($data);
    }
}
