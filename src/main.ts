import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import { createPinia } from 'pinia'

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';
import { createI18n } from "vue-i18n";

/* Theme variables */
import './theme/variables.css';

// import translations
import en from "./locales/en.json";
import nb from "./locales/nb.json";
import { useStorageStore } from './stores/storage'

// configure i18n
const i18n = createI18n({
  locale: "nb",
  fallbackLocale: "nb",
  messages: { nb, en },
});
const pinia = createPinia()
const app = createApp(App)
  .use(IonicVue)
  .use(i18n)
  .use(router)
  .use(pinia)

// setup storage and preset data
const storage = useStorageStore()
await storage.presetData()
  
router.isReady().then(() => {
  app.mount('#app');
});