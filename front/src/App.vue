<template>
  <v-app theme="dark">
    <v-app-bar app >
      <v-app-bar-nav-icon
      ></v-app-bar-nav-icon>
      <v-app-bar-title>App Title</v-app-bar-title>
      <v-btn
      @click="switchComponent('login')"
      variant="outlined"
      v-if="!userLogged"
    >sign in</v-btn>
    <v-btn
      variant="outlined"
      v-if="userLogged"
    >sign out</v-btn>

    <v-btn
    @click="switchComponent('signup')"
    variant="outlined"
    class="mx-2"
    >sign up</v-btn>

    </v-app-bar>

    <v-main app>

      <login v-if="activeComponent === 'login'"></login>
      <SignUp v-if="activeComponent == 'signup'"></SignUp>
      <Landing v-if="activeComponent == 'landing'"></Landing>
      <Collection></Collection>
      
      <!---->
      <addTVShow></addTVShow>
      
      <Prueba
      :is-modal-active="true"
      @prueba="(atr) => funcionHeredada = atr"></Prueba>
      <v-btn
      @click="cositas">click</v-btn>
    </v-main>
    <v-footer app>
    </v-footer>
  </v-app>
</template>

<script setup>

  import login from "./components/login.vue";
  import {ref} from "vue"
  import Collection from "./components/collection.vue";
  import Landing from "./components/landing.vue";
  import SignUp from "./components/SignUp.vue";
  import addTVShow from "./components/addTVShow.vue";
  import modal from "./components/modal.vue"
  import Prueba from "./components/prueba.vue"

  var activeComponent = ref("landing");
  var userLogged = false;
  var booleano = ref(true);
  var funcionHeredada = ref();

  function switchComponent(component){
    if(activeComponent.value == component){
      activeComponent.value = 'landing';
    }else{
      activeComponent.value = component;
      console.log(activeComponent);
    }
  }

  function cositas(){
    let booleano = false;
    if(booleano){
      alert("ok");
    }else{
      if(funcionHeredada != undefined) funcionHeredada.value();
    }
  }


  const newCreateModel = function(dialogSwitch, messageObject, nTitle, nSubtitle, nText){
    dialogSwitch.value = true;
    messageObject.value.title = nTitle;
    messageObject.value.subtitle = nSubtitle,
    messageObject.value.text = nText;
  }

  
</script>
