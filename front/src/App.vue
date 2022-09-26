<template>
  <v-app theme="dark">
    <v-app-bar app >

      <v-app-bar-title>App Title</v-app-bar-title>
      <v-btn
      @click="this.$router.push('/login')"
      variant="outlined"
      v-if="!userLogged"
    >sign in</v-btn>

    <v-btn
    v-if="!userLogged"
    @click="this.$router.push('/signup')"
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
      @click="signOut"
    >sign out</v-btn>

    </v-app-bar>
    <v-main app class="text-center">
      <router-view
      @userLogs="(atr) => userLogged = atr"></router-view>
    </v-main>
    <v-footer app>
      footer
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
  import Login from "./components/login.vue"

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

  function signOut(){
    userLogged.value = false;
  }  
</script>
