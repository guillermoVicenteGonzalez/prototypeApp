<template>
    <v-container class="text-center mx-20 px-16">
        <v-card class="py-5">    
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
               v-model="signupPasswd"
               type="password"
               @click:append="signUp"
               ></v-text-field>

               <v-btn class="ma-2"
                   @click="signUp"
               >sign up</v-btn>

           </v-form>  
        </v-card>    

        <v-dialog v-model="signupDialog" width="500">
            <v-card
            :title="signupDialogMessage.title"
            :subtitle="signupDialogMessage.subtitle"
            :text="signupDialogMessage.text">
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn
                    class="text-center"
                    @click="signupDialog=false">
                    Close
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>    
   </v-container>

</template>

<script setup>
    import axios from "axios";
    import {ref} from "vue";
    import AppVue from "../App.vue";
    import config from "../config.json"

    var signupUsername = ref();
    var signupPasswd = ref();
    var signupDialog = ref(false);
    var signupDialogMessage = ref({
        title:undefined,
        subtitle:undefined,
        text:undefined
    })

    async function signUp(){
        let result = await axios.post(config.host + config.api + config.registerUser,{
            login: signupUsername.value,
            password: signupPasswd.value
        })
        .then( function(response){
            console.log(response.data);
            if(response.data.success == true){
                createModel("Succes","Signup was successfull");
                userLogged.value = true;
            }
        })
        .catch(function(error){
            if(error.response){
                console.log(error.response.data);
                createModel("Error","",error.response.data.message);
            }else if(error.request){
                createModel("Error","Request error","An error ocurred while trying to connect with the database. Please try again later");
                console.log(error.request);
            }else if(error != undefined){
                createModel("Error","", "unknown error. Try again later");
                console.log("unknown error");
            }
        });
    }

    function createModel(nTitle, nSubtitle, nText){
        signupDialog.value = true;
        signupDialogMessage.value.title = nTitle;
        signupDialogMessage.value.subtitle = nSubtitle;
        signupDialogMessage.value.text = nText;
    }

</script>