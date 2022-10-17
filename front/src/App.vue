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

    <v-menu>
      <template v-slot:activator="{props}">
        <v-avatar
        v-if="userLogged"
        size="54"
        color="primary"
        class="mx-2"
        v-bind="props">
          <v-img 
          cover
          :src="full_photo_url"
          v-bind="props"></v-img>
        </v-avatar>
      </template>
      <v-list>
        <v-list-item
        v-for="(item, i) in profileMenuItems"
        :key="i"
        :value="i"
        @click="profileMenuAction(i)">
          <v-list-item-title>{{item}}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

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
  import {ref, provide} from "vue"
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
  import MenuTest from "./components/menuTest.vue"


  provide('router',router);
  var full_photo_url = ref();
  var getImgUrl = "http://localhost:3000/api/images/";
  var appErrorModal= ref();
  var triggerVerify = ref();
  var createModalApp = ref();
  var userLogged = ref(false);
  var drawer = ref(false);
  var group = ref()
  var profileMenuItems = ref(['Profile','Shows','SignOut'])
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
          localStorage.photoId = response.data.user.photo;
          full_photo_url.value = getImgUrl + response.data.user.photo;
          console.log(response.data);
        })
        .catch(function(error){
          console.log(error);
          userLogged.value=false;
          localStorage.token = undefined;
          localStorage.username = undefined;
          appErrorModal.value.createDialog("Error","Invalid session", "your session token is not valid or has expired",false);
          router.push('/');
        });

    }else{
      localStorage.token=undefined;
      localStorage.username=undefined;
      userLogged.value = false;
    }
  }

  function profileMenuAction(index){
    //console.log(profileMenuItems.value[index]);
    switch(index){
      case 0:
        //profile
        console.log("vete a profile");
        router.push('/userProfile');
        break;

      case 1:
        //shows
        break;
      
      case 2:
        //signout
        //crea un modal que invoca a signOut
        triggerVerify.value.createVerify('Log out','confirm your logout','Are you sure you want to log yourself out?');
        break;

    }
  }

  async function getUserPhoto(){
    if(localStorage.photoId){
      let promise = await axios.get(config.host + config.api + config.getPicture + localStorage.photoId)
      .then(function(response){
        photo.value = response.data;
        //console.log(photo.value)
      })
      .catch(function(err){
        console.log(err);
      })
    }else{
      console.log("no photo defined");
    }
  }



  defineExpose({
    userLogged
  })
  verifyLogged();

</script>
