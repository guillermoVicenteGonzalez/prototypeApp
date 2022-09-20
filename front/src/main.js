import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
//import VueRouter from 'vue-router';
//import { createRouter, createWebHashHistory } from 'vue-router'



loadFonts()

createApp(App)
  .use(vuetify)
  .mount('#app')
