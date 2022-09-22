import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
//import VueRouter from 'vue-router';
//import { createRouter, createWebHashHistory } from 'vue-router'

const newCreateModel = function(dialogSwitch, messageObject, nTitle, nSubtitle, nText){
  dialogSwitch.value = true;
  messageObject.value.title = nTitle;
  messageObject.value.subtitle = nSubtitle,
  messageObject.value.text = nText;
}

//es correcto exportar desde aqui los metodos????
export {newCreateModel};

loadFonts()

createApp(App)
  .use(vuetify)
  .mount('#app')
  //.provide('newCreateModel',newCreateModel);
