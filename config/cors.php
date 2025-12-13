<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    /*
     * When supports_credentials is true, you cannot use '*' for allowed_origins.
     * You must specify the exact origins that are allowed.
     * These should match the SANCTUM_STATEFUL_DOMAINS in your .env file.
     * For development, common values are: localhost, localhost:3000, 127.0.0.1, etc.
     * Set CORS_ALLOWED_ORIGINS in your .env file for production.
     */
    'allowed_origins' => explode(',', env('CORS_ALLOWED_ORIGINS', 'localhost,localhost:3000,127.0.0.1,127.0.0.1:8000,::1')),

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,

];
