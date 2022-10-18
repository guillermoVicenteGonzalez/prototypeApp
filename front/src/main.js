import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import router from './router/index';
import vueCountryRegionSelect from 'vue3-country-region-select'
//import vuetifyCountryRegionSelect from "vuetify-country-region-select"
//import VueCountryCode from "vue-country-code";



loadFonts()

createApp(App)
  .use(vuetify)
  .use(router)
  .use(vueCountryRegionSelect)
  //.use(VueCountryCode)
  .mount('#app')
  //.provide('newCreateModel',newCreateModel);
