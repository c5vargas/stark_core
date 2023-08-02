<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>

        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <title>{{ $settings->app_name }}</title>

        @vite(['resources/scss/main.scss', 'resources/js/main.js'])

        <script>
            window.AppConfig = {
                app_name: '{{ $settings->app_name }}',
                app_logo: '{{ $settings->app_logo }}',
                app_url: '{{ $settings->app_url }}',
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
