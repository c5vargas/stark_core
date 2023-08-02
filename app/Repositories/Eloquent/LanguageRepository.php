<?php

namespace App\Repositories\Eloquent;

use App\Models\Language;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

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
        $directories = Storage::disk("lang")->directories("lang");
        $code = $data['code'];

        if(!in_array($code, $directories)) {
            File::copyDirectory(lang_path().'/en', lang_path()."/{$code}");
        }

        return $this->model->create($data);
    }

    public function updateTranslation(array $data)
    {
        $code = $data['code'];
        $arr = array();

        foreach ($data['strings'] as $value) {
            $arr[$value[0]] = $value[1];
        }

        return Storage::disk("lang")->put("{$code}/messages.php", "<?php return ".var_export($arr, true).";");
    }
}
