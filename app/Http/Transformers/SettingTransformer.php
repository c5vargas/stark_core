<?php

namespace App\Http\Transformers;

use App\Models\Setting;
use League\Fractal\TransformerAbstract;

class SettingTransformer extends TransformerAbstract
{

    public function transform(Setting $item)
    {
        return [
            'id' => $item->id,
            'key' => $item->key,
            'value' => $item->value,
        ];
    }
}
