/**
 * OneSignal setup and events
 */
window.OneSignal = window.OneSignal || [];
const appId = window.AppConfig.onesignal_app_id;
const safariWebId = window.AppConfig.onesignal_safari_web_id;

if(appId)
{
    const pushPermission = localStorage.getItem('one-signal-notifications')

    console.log((pushPermission)
        ? "[oneSignal.js] Notifications Push: Enabled"
        : "[oneSignal.js] Notifications Push: Disabled")

    OneSignal.push(() => {
        OneSignal.init({
            appId,
            subdomainName: (process.env.NODE_ENV !== 'production') ? 'entrna-test' : null,
            safari_web_id: safariWebId,
            serviceWorkerPath: "OneSignalSDKWorker.js",
            allowLocalhostAsSecureOrigin: process.env.NODE_ENV !== 'production',
            welcomeNotification: { disable: true },
            promptOptions: {
                slidedown: {
                    prompts: [
                        {
                            type: "push",
                            autoPrompt: false,
                            text: {
                                actionMessage: "Queremos mostrarte notificaciones relacionadas con nuestra aplicación.",
                                acceptButton: "Permitir",
                                cancelButton: "Cancelar",
                            }
                        }
                    ]
                },
            }
        });

        OneSignal.on('subscriptionChange', function (isSubscribed) {
            console.log("[oneSignal.js] The user's subscription state is now:", isSubscribed);
            localStorage.setItem('one-signal-notifications', isSubscribed)
        });
    });

}

