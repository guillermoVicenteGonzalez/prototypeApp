<template>
    <v-container class="text-center mx-20 px-16 d-flex justify-center align-center">
        <v-card class="py-3" width="500">    
            <v-form >
               <h1>Sign up</h1>
               <v-text-field 
               class="mx-10"
               variant="outlined"
               label="username"
               v-model="signupUsername"
               ></v-text-field>

               <v-text-field 
               class="mx-10"
               variant="outlined"
               label="password"
               v-model="signupConfirmPasswd"
               type="password"
               @click:append="signUp"
               ></v-text-field>

               <v-text-field 
               class="mx-10"
               variant="outlined"
               label="confirm password"
               v-model="signupPasswd"
               type="password"
               ></v-text-field>


               <v-text-field 
               class="mx-10"
               variant="outlined"
               label="photo"
               v-model="signupPhoto"
               @click:append="signUp"
               ></v-text-field>

               <v-btn class="ma-2"
                   @click="signUp"
                   color="primary"
               >sign up</v-btn>

           </v-form>  
        </v-card>    

        <modal ref="createModalSignup"></modal>
        <loading v-model="triggerLoading_signup"></loading>
   </v-container>

</template>

<script setup>
    import axios from "axios";
    import {ref} from "vue";
    import AppVue from "../App.vue";
    import config from "../config.json"
    import modal from "../components/modal.vue";
    import Loading from "./loading.vue";


    const emit = defineEmits(['userRegister']);
    var createModalSignup = ref();
    var signupUsername = ref();
    var signupPasswd = ref();
    var signupConfirmPasswd = ref();
    var signupPhoto = ref();
    var triggerLoading_signup = ref();
    var signupDialog = ref(false);
    var signupDialogMessage = ref({
        title:undefined,
        subtitle:undefined,
        text:undefined
    })


    async function signUp(){
        console.log(signupConfirmPasswd.value);
        console.log(signupPasswd.value);
        if(signupPasswd.value !== signupConfirmPasswd.value){
            createModalSignup.value.createDialog("Error","The two passwords are not equal","",false);
        }else{
            triggerLoading_signup.value=true;
            let result = await axios.post(config.host + config.api + config.registerUser,{
                login: signupUsername.value,
                password: signupPasswd.value,
                photo: signupPhoto.value
            })
            .then( function(response){
                triggerLoading_signup.value=false;
                console.log(response.data.success);
                if(response.data.success == true){
                    emit('userRegister');
                    createModalSignup.value.createDialog("Succes","Signup was successfull","",true);
                    console.log("estoy aqui");
                }
            })
            .catch(function(error){
                triggerLoading_signup.value=false;
                if(error.response){
                    console.log(error.response.data)
                    if(error.response.data){
                        createModalSignup.value.createDialog("Error","",error.response.data.message,false);                    
                    }else{
                        createModalSignup.value.createDialog("Error","request error","An error ocurred while trying to connect with the database. Please try again later");
                        console.log(error.response);
                    }
                }else if(error.request){
                    createModalSignup.value.createDialog("Error","Request error","An error ocurred while trying to connect with the database. Please try again later");
                    console.log(error.request);
                }else{
                    createModalSignup.value.createDialog("Error","", "unknown error. Try again later");
                    console.log("unknown error");
                }
            });
        }
    }

</script>