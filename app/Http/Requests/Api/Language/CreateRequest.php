<?php

namespace App\Http\Requests\Api\Language;

use App\Http\Requests\Api\FormRequest;

class CreateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return (auth()->check() && $this->code);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'name'  => 'string|min:4|max:100',
            'code'  => 'string|unique:languages,code,' . $this->code,
        ];
    }
}
