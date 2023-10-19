<?php

namespace App\Http\Requests\Api\Role;

use App\Http\Requests\Api\FormRequest;

class UpdateRequest extends FormRequest
{

    public function authorize(): bool
    {
        return (auth()->check() && $this->id);
    }

    public function rules(): array
    {
        return [
            'id'    => 'required|unique:roles,id,'.$this->id,
            'name'  => 'required|string|min:3',
            'perms' => 'required|array'
        ];
    }
}
