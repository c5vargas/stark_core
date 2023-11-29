<?php

namespace App\Http\Requests\Api\Notification;

use App\Http\Requests\Api\FormRequest;

class CreateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return (auth()->check() && auth()->user()->can('create.notifications'));
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'headings'              => 'required|array',
            'contents'              => 'required|array',
            'headings.en'           => 'required|string|min:4|max:47',
            'contents.en'           => 'required|string|min:4|max:128',
            'send_after'            => 'required|string',
            'delivery_time_of_day'  => 'required|string',
        ];
    }
}
