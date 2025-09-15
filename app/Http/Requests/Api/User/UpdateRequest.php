<?php

namespace App\Http\Requests\Api\User;

use App\Enums\UserStatus;
use App\Http\Requests\Api\FormRequest;
use Illuminate\Validation\Rules\Enum;

class UpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return (auth()->check() && auth()->user()->can('edit.users'));
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'id'        => 'required|exists:users,id',
            'name'      => 'sometimes|string|min:4|max:100',
            'username'  => 'sometimes|nullable|string|min:3|max:50|unique:users,username,' . $this->id,
            'email'     => 'sometimes|required|email|unique:users,email,' . $this->id,
            'password'  => 'sometimes|nullable|string|min:6',
            'avatar'    => 'sometimes|nullable|url|max:255',
            'status'    => ['sometimes', new Enum(UserStatus::class)],
            'locale'    => 'sometimes|nullable|string|size:2',
            'metadata'  => 'sometimes|nullable|array',
        ];
    }
}
