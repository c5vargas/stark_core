<?php

namespace App\Http\Requests\Api\User;

use App\Enums\UserStatus;
use App\Http\Requests\Api\FormRequest;
use Illuminate\Validation\Rules\Enum;

class CreateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return (auth()->check() && auth()->user()->can('create.users'));
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'name'      => 'required|string|min:4|max:100',
            'username'  => 'nullable|string|min:3|max:50|unique:users,username',
            'email'     => 'required|email|unique:users,email',
            'password'  => 'required|string|min:6',
            'avatar'    => 'nullable|url|max:255',
            'status'    => ['sometimes', new Enum(UserStatus::class)],
            'locale'    => 'nullable|string|size:2',
            'metadata'  => 'nullable|array',
        ];
    }
}
