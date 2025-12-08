<?php

namespace App\Http\Requests\Api\CustomField;

use App\Http\Requests\Api\FormRequest;

class UpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return (auth()->check() && auth()->user()->can('edit.settings'));
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $id = $this->route('id');
        
        return [
            'name' => 'sometimes|string|unique:custom_fields,name,' . $id,
            'type' => 'sometimes|string|in:text,textarea,select,date,number,email',
            'label' => 'sometimes|string|max:255',
            'required' => 'sometimes|boolean',
            'options' => 'nullable|array',
            'order' => 'sometimes|integer|min:0',
        ];
    }
}
