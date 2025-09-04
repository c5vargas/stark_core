export {};

declare global {
  interface Window {
    AppConfig: {
      app_name: string;
      app_logo: string;
      csrf: string;
      app_locale: string;
      app_timezone: string;
      app_translations: string;
      onesignal_app_id: string;
      onesignal_safari_web_id: string;
      locales: Record<string, Record<string, string>>;
    };
  }
}