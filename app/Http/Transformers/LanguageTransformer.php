<?php

namespace App\Http\Transformers;

use App\Models\Language;
use League\Fractal\TransformerAbstract;

class LanguageTransformer extends TransformerAbstract
{

    public function transform(Language $item)
    {
        return [
            'name' => $item->name,
            'code' => $item->code,
        ];
    }
}
