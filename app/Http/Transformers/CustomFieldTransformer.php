<?php

namespace App\Http\Transformers;

use App\Models\CustomField;
use League\Fractal\TransformerAbstract;

class CustomFieldTransformer extends TransformerAbstract
{
    public function transform(CustomField $field)
    {
        return [
            'id' => $field->id,
            'name' => $field->name,
            'type' => $field->type,
            'label' => $field->label,
            'required' => $field->required,
            'options' => $field->options,
            'order' => $field->order,
            'created_at' => $field->created_at?->toISOString(),
            'updated_at' => $field->updated_at?->toISOString(),
        ];
    }
}

