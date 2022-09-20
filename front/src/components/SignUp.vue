<template>
    <v-container class="text-center mx-20 px-16">
       <v-card class="py-5">    
           <v-form >
               <h1>Sign up</h1>
               <v-text-field 
               class="mx-10"
               variant="outlined"
               label="usuario"
               v-model="userLogin"
               ></v-text-field>

               <v-text-field 
               class="mx-10"
               variant="outlined"
               label="contraseña"
               v-model="userPasswd"
               type="password"
               @click:append="signUp"
               ></v-text-field>

               <v-btn class="ma-2"
                   @click="signUp"
               >Iniciar sesion</v-btn>

           </v-form>  
       </v-card>       
   </v-container>

</template>

<script setup>
   import axios from "axios";
   import {ref} from "vue";
   import AppVue from "../App.vue";
   import config from "../config.json"

   var userLogin = ref();
   var userPasswd = ref();
   var userLogged = ref();

   async function signUp(){
       let result = await axios.post(config.host + config.api + config.registerUser,{
        //let result = await axios.post("http://localhost:3000/api/usuarios",{
           login:userLogin.value,
           password:userPasswd.value
       })
       .then( function(response){
           console.log(response.data);
           if(response.data.success == true){
               userLogged.value = true;
           }
       })
       .catch(function(error){
           if(error.response){
               console.log(error.response.data);
               alert(error.response.data)
           }else if(error.request){
               console.log(error.request);
           }else if(error != undefined){
               console.log("error desconocido");
           }
       });
   }


</script>