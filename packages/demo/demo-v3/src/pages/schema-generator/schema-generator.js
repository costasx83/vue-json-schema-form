/**
 * Created by Liu.Jun on 2020/10/24 9:21 PM.
 */

import 'demo-common/bootstrap.js';

import { createApp } from 'vue';

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

import router from './router/index.js';

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

// create app
const app = createApp(App);

// use router
app.use(router);

// Ui
app.use(vuetify);

// mount
app.mount('#app');
