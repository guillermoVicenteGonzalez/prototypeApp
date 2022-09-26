<template>
  <v-app theme="dark">
    <v-app-bar app >

      <v-app-bar-title>App Title</v-app-bar-title>
      <v-btn
      @click="switchComponent('login')"
      variant="outlined"
      v-if="!userLogged"
    >sign in</v-btn>

    <v-btn
    v-if="!userLogged"
    @click="switchComponent('signup')"
    variant="outlined"
    class="mx-2"
    >sign up</v-btn>

    <v-avatar
    v-if="userLogged"
    size="56"
    color="primary"
    class="mx-2">
      
    </v-avatar>
    <v-btn
      variant="outlined"
      v-if="userLogged"
    >sign out</v-btn>

    </v-app-bar>

    <v-main app>

      <login v-if="activeComponent === 'login'" @userLogs="(atr) => userLogged = atr"></login>
      <SignUp v-if="activeComponent == 'signup'"></SignUp>
      <Landing v-if="activeComponent == 'landing'"></Landing>
      <Collection></Collection>
      
      <!---->
      <addTVShow></addTVShow>
    </v-main>
    <v-footer app>
    <v-btn @click="showUserLogged">click</v-btn>
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

  var activeComponent = ref("landing");
  var userLogged = ref(false);

  function switchComponent(component){
    if(activeComponent.value == component){
      activeComponent.value = 'landing';
    }else{
      activeComponent.value = component;
      console.log(activeComponent);
    }
  }

  function showUserLogged(){
    console.log(userLogged.value);
  }




  
</script>
