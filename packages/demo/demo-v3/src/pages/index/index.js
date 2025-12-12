/**
 * Created by Liu.Jun on 2020/5/13 15:52.
 */

import 'demo-common/bootstrap.js';
import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'VueRouter';
// import ElementPlus from 'demo-common/components/ElementPlus/index.js';
// import Vuetify from 'demo-common/components/Vuetify/index.js';
// Vuetify
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { VFileUpload } from 'vuetify/labs/VFileUpload';
import { VDateInput } from 'vuetify/labs/VDateInput';
import { VColorInput } from 'vuetify/labs/VColorInput';
import routes from './routes';

import App from './App';

const vuetify = createVuetify({
    components: {
        ...components,
        VFileUpload,
        VDateInput,
        VColorInput
    },
    directives,
    theme: {
        defaultTheme: 'light',
        themes: {
            light: {
                colors: {
                    primary: '#1976D2',
                    secondary: '#424242',
                    accent: '#82B1FF',
                    error: '#FF5252',
                    info: '#2196F3',
                    success: '#4CAF50',
                    warning: '#FFC107',
                }
            }
        }
    }
});


// create router
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

// create app
const app = createApp(App);

// use router
app.use(router);

// use ui lib
app.use(vuetify);

// mount
app.mount('#app');

app.config.unwrapInjectedRef = true;

window.app1 = app;
