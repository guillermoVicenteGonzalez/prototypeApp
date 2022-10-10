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
               :type="showPasswd ? 'text' : 'password'"
               @click:append="showPasswd = !showPasswd"
               :append-icon="showPasswd ? 'mdi-eye' : 'mdi-eye-off'"
               ></v-text-field>

               <v-text-field 
               class="mx-10"
               variant="outlined"
               label="confirm password"
               v-model="signupPasswd"
               :append-icon="showPasswd2 ? 'mdi-eye' : 'mdi-eye-off'"
               :type="showPasswd2 ? 'text' : 'password'"
               @click:append="showPasswd2 = !showPasswd2"
               ></v-text-field>

               <v-text-field 
               class="mx-10"
               variant="outlined"
               label="email"
               v-model="signUpMail"
               :rules="[rules.required, rules.email]"
               ></v-text-field>

                <v-file-input   
                accept="image/*"
                label="File input"
                filled
                prepend-icon="mdi-camera"
                v-model="userPhoto"
                ></v-file-input>

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


    const formData = new FormData();
    const emit = defineEmits(['userRegister']);
    var userPhoto = ref();
    var showPasswd = ref(false);
    var showPasswd2 = ref(false);
    var signUpMail = ref();
    var createModalSignup = ref();
    var signupUsername = ref();
    var signupPasswd = ref();
    var signupConfirmPasswd = ref();
    var userPhoto = ref();
    var triggerLoading_signup = ref();
    var signupDialog = ref(false);
    var signupDialogMessage = ref({
        title:undefined,
        subtitle:undefined,
        text:undefined
    })


    async function signUp(){
        //console.log(userPhoto.value[0]);
        console.log(signupConfirmPasswd.value);
        console.log(signupPasswd.value);
        if(signupPasswd.value !== signupConfirmPasswd.value){
            createModalSignup.value.createDialog("Error","The two passwords are not equal","",false);
        }else{
            triggerLoading_signup.value=true;

            let result = await axios.post(config.host + config.api + config.registerUser,{
                login: signupUsername.value,
                password: signupPasswd.value,
                //photo: userPhoto.value[0]
                mail:signUpMail.value
            })
            .then( function(response){
                triggerLoading_signup.value=false;
                console.log(response.data.success);
                uploadFile(); //temporary
                if(response.data.success == true){
                    createModalSignup.value.createDialog("Succes","Signup was successfull","",true);
                    console.log("estoy aqui");
                    emit('userRegister');
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

    async function uploadFile(){
        if(userPhoto.value != undefined){
            //aqui podria meter el nombre del usuario temporalmente
            formData.append("name",userPhoto.value[0].name);
            formData.append("profileImage",userPhoto.value[0]);
            console.log(userPhoto.value[0]);
            let promise = await axios.post(config.host + config.api + config.uploadPicture,formData,{
            //axios.post("http://localhost:3000/api/upload",formData,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            })
        }else{
            console.log("error");
            console.log(userPhoto.value);
        }
    }

</script>

<script>
    export default {
      data () {
        return {
          email: '',
          rules: {
            required: value => !!value || 'Required.',
            counter: value => value.length <= 20 || 'Max 20 characters',
            email: value => {
              const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              return pattern.test(value) || 'Invalid e-mail.'
            },
          },
        }
      },
    }
  </script>