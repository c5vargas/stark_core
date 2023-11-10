<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>

        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <meta name="author" content="CARVAR">
        <title>Panel Administrador - {{ $settings->app_name }}</title>
        <meta name="description" content="{{ $settings->app_descr }}">
        <link rel="shortcut icon" href="{{ $settings->app_favicon}}" />

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap" rel="stylesheet">

        @vite([
            'resources/css/app.css',
            'resources/css/custom.css',
            'resources/css/admin.min.css',
            'resources/css/core.admin.min.css',
            'resources/css/core.admin.min.js',
            'resources/css/template.js',
            'resources/js/main.js',
        ])

        <script>
            window.AppConfig = {
                app_name: '{{ $settings->app_name }}',
                app_logo: '{{ $settings->app_logo }}',
                csrf: '{{ csrf_token() }}',
                app_locale: '{{ $settings->app_locale }}',
                app_timezone: '{{ $settings->app_timezone }}',
                app_translations: '{{ $settings->app_translations }}',
                locales: {
                    @foreach ($languages as $lang)
                        {{$lang->code}}: {!! json_encode(\Illuminate\Support\Facades\Lang::get('messages', [], $lang->code)) !!},
                    @endforeach
                }
            }
        </script>
    </head>
    <body class="antialiased">
        <noscript>
            <strong>We're sorry but this application doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
        </noscript>

        <div id="app"></div>
    </body>
</html>
