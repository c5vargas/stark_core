<?php

namespace App\Http\Requests\Api\Setting;

use App\Http\Requests\Api\FormRequest;

class UpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'app_name'      => 'string|min:4|max:100',
            'app_locale'    => 'string',
            'app_email'     => 'email',
            'app_timezone'  => 'string',
            'app_translations' => 'boolean'
        ];
    }
}
