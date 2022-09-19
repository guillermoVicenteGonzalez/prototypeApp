<template>
  <v-app theme="dark">
    <v-app-bar app >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-app-bar-title>Mi aplicacion</v-app-bar-title>
      <v-btn
      @click="switchComponent('login')"
      variant="outlined"
      v-if="!userLogged"
    >Iniciar sesion</v-btn>
    <v-btn
      variant="outlined"
      v-if="userLogged"
    >CerrarSesion</v-btn>

    <v-btn
    @click="switchComponent('signup')"
    variant="outlined"
    class="mx-2"
    >sign up</v-btn>

    </v-app-bar>

    <v-main app>

      <login v-if="activeComponent === 'login'"></login>
      <SignUp v-if="activeComponent == 'signup'"></SignUp>
      <Collection class="ma-10"
      v-if="activeComponent == 'collection'"></Collection>
      <Landing v-if="activeComponent == 'landing'"></Landing>
      <collection></collection>


    </v-main>
    <v-footer app>
      Buenas tardes
    </v-footer>
  </v-app>
</template>

<script setup>

  import login from "./components/login.vue";
  import {ref} from "vue"
  import Collection from "./components/collection.vue";
  import Landing from "./components/landing.vue";
  import { defineProps } from "vue";
import SignUp from "./components/SignUp.vue";

  var activeComponent = ref("landing");
  var userLogged = false;

  function switchComponent(component){
    if(activeComponent.value == component){
      activeComponent.value = 'landing';
    }else{
      activeComponent.value = component;
      console.log(activeComponent);
    }

  }

  
</script>
