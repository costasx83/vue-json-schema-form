
import 'demo-common/bootstrap.js';
import './vue-editor.css';

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
import routerGuards from './router/guards';
import router from './router/index.js';

import App from './App';
import { ExtraComponents } from './views/editor/common/registerExtraElementComponent';

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

// Add router guards
routerGuards(router); // Router guards

// use router
app.use(router);

// Ui
app.use(vuetify);

// Register extra components
Object.entries(ExtraComponents).forEach(([key, value]) => {
    app.component(key, value);
});

// mount
app.mount('#app');
