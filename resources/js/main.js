import {createApp} from 'vue'
import {createPinia} from 'pinia'

import router from "@/router";
import i18n from "@/plugins/i18n";
import App from "@/App";

import 'bootstrap-icons/font/bootstrap-icons.css'
import './register-service-worker.js'
import './plugins/oneSignal.js'

const app = createApp(App)
    .use(createPinia())
    .use(router)
    .use(i18n)
    .mount('#app');
