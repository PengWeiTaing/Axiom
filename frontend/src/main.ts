import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

import '@fontsource-variable/inter';
import '@fontsource-variable/noto-sans-sc';
import './styles/tokens.css';
import './styles/base.css';

const app = createApp(App);
app.use(createPinia());
app.mount('#app');
