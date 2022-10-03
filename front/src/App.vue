<template>
  <v-app theme="dark">
    <v-app-bar app >
      <v-app-bar-nav-icon
      @click.stop="drawer = !drawer"
      color="primary">
      
      </v-app-bar-nav-icon>
      <v-app-bar-title
      class="text-primary">App Title</v-app-bar-title>
      <v-btn
      @click="this.$router.push('/login')"
      variant="outlined"
      v-if="!userLogged"
      color="success"
    >sign in</v-btn>

    <v-btn
    v-if="!userLogged"
    @click="this.$router.push('/signup')"
    variant="outlined"
    class="mx-2"
    color="primary"
    >sign up</v-btn>

    <v-avatar
    v-if="userLogged"
    size="56"
    color="primary"
    class="mx-2">
      <v-img v-if="photo"
        :src="photo"></v-img>
      
      <v-icon
      v-if="!photo">mdi-account-circle</v-icon>
    </v-avatar>
    <v-btn
      variant="outlined"
      v-if="userLogged"
      @click="triggerVerify.
      createVerify('Log out','confirm your logout','Are you sure you want to log yourself out?')"
    >sign out</v-btn>

  
    </v-app-bar>
    <v-main app class="text-center">
      <router-view
      @userLogs="signIn"
      @userRegister="this.$router.push('/')"
      ></router-view>
      
      <modal
      @create="(atr) => createModalApp = atr"></modal>

      <drawerMenu v-model="drawer"
      :disabledFeatures="!userLogged"></drawerMenu>

      <verify
      ref="triggerVerify"
      @cancelVerify="cancelSignOut"
      @acceptVerify="signOut"></verify>

      <modal
      ref="appErrorModal"></modal>
    </v-main>
    <v-footer app class="justify-center">
      <MyFooter></MyFooter>
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
  import router from "../src/router/index.js"
  import drawerMenu from "./components/drawerMenu.vue"
  import verify from "./components/verify.vue"
  import MyFooter from "./components/myFooter.vue";
  import axios from "axios";
  import config from "../src/config.json"

  var photo = ref();
  var appErrorModal= ref();
  var triggerVerify = ref();
  var createModalApp = ref();
  var userLogged = ref(false);
  var drawer = ref(false);
  var group = ref()

  function cancelSignOut(){
    triggerVerify.value.deleteVerify();
  }  

  function signIn(){
    userLogged.value = true;
    verifyLogged();
    //this.$router.push('/');
    router.push('/');
  }

  function signOut(){
    triggerVerify.value.deleteVerify();
    localStorage.token=undefined;
    localStorage.username=undefined;
    localStorage.photo=undefined;
    userLogged.value = false;
    router.push('/');
  }

  async function verifyLogged(){
    console.log(localStorage);

    if(localStorage.token != 'undefined' || localStorage.username != 'undefined'){
      let promise = await axios
        .get(config.host + config.api + config.getUserData + localStorage.username,
        {
          headers:{
            'Authorization':'Bearer '+ localStorage.token
          }
        })
        .then(async function (response){
          userLogged.value = true;
          console.log(response.data.user.photo);
          photo.value = response.data.user.photo;
        })
        .catch(function(error){
          console.log(error);
          userLogged.value=false;
          localStorage.token = undefined;
          localStorage.username = undefined;
          appErrorModal.value.createDialog("Error","Invalid session", "your session token is not valid or has expired",false);
        });

    }else{
      localStorage.token=undefined;
      localStorage.username=undefined;
      userLogged.value = false;
    }
  }



  defineExpose({
    userLogged
  })
  verifyLogged();

</script>
