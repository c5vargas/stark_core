import {createApp} from 'vue'
import {createPinia} from 'pinia'
import {DatePicker} from 'v-calendar';

import router from "@/js/router";
import i18n from "@/js/plugins/i18n";
import App from "@/js/App";

import 'bootstrap-icons/font/bootstrap-icons.css'
import './register-service-worker.js'
import './plugins/oneSignal.js'
import 'v-calendar/style.css';

const app = createApp(App)
    .use(createPinia())
    .use(router)
    .use(i18n)
    .component('VDatePicker', DatePicker)
    .mount('#app');
