<?php

namespace App\Http\Requests\Api\Setting;

use App\Http\Requests\Api\FormRequest;

class EmailTestRequest extends FormRequest
{

    public function authorize(): bool
    {
        return (auth()->check() && auth()->user()->can('edit.settings'));
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'email'         => 'required|email',
        ];
    }
}
