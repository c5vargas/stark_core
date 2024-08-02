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
            'app_name'                  => 'string|min:4|max:100',
            'app_descr'                 => 'string|max:150',
            'app_color'                 => 'string|max:100',
            'app_locale'                => 'string',
            'app_timezone'              => 'string',
            'app_translations'          => 'boolean',
            'analytics_property_id'     => 'nullable|string',
            'manager_measurement_id'    => 'nullable|string',
            'maps_api_key'              => 'nullable|string',
            'mail_from_address'         => 'nullable|email',
            'mail_contact_address'      => 'nullable|email',
            'mail_from_name'            => 'nullable|string|min:4|max:100',
            'mail_driver'               => 'nullable|string',
            'mail_host'                 => 'nullable|string',
            'mail_port'                 => 'nullable|string',
            'mail_encryption'           => 'nullable|string',
            'mail_username'             => 'nullable|string',
            'mail_password'             => 'nullable|string',
            'onesignal_app_id'          => 'nullable|string',
            'onesignal_api_key'         => 'nullable|string',
            'onesignal_safari_web_id'   => 'nullable|string',
            'gdpr_privacy_page'         => 'nullable|string',
            'gdpr_show_cookie_banner'   => 'boolean',
            'gdpr_cookies_page'         => 'nullable|string',
        ];
    }
}
