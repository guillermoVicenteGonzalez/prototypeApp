<template>
     <v-container class="text-center mx-20 px-16">
        <v-card class="py-5">    
            <v-form>
                <h1>Login</h1>
                <v-text-field 
                class="mx-10"
                variant="outlined"
                label="username"
                v-model="userLogin"
                ></v-text-field>

                <v-text-field 
                class="mx-10"
                variant="outlined"
                label="password"
                v-model="userPasswd"
                type="password"
                ></v-text-field>

                <v-btn class="ma-2"
                    @click="login"
                >sign in</v-btn>



            </v-form>  
        </v-card>      

        <v-dialog v-model="dialog" width="500">
            <v-card
            :title="message.title"
            :subtitle="message.subtitle"
            :text="message.text">
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn
                    class="text-center"
                    @click="dialog=false">
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
    import config from "../config.json";

    var token ="";
    var userLogin = ref();
    var userPasswd = ref();
    var userLogged = ref();
    //"booleano" que controla si aparece o no el dialogo
    var dialog = ref(false);
    //objeto mensaje que aparecerá en el model
    var message = ref({
        title:undefined,
        subtitle:undefined,
        text:undefined
    });


    async function login(){
        let result = await axios.post(config.host + config.api + config.loginUser,{
            login:userLogin.value,
            password:userPasswd.value
        })
        .then( function(response){
            console.log(response.data);
            if(response.data.success == true){
                createModel("Success","Successful login","");
                userLogged.value = true;
                token=response.data.token;
            }
        })
        .catch(function(error){
            if(error.response){
                if(error.response.data){
                    createModel("Error","",error.response.data.message);
                }else{
                    createModel("Error","request error","An error ocurred while trying to connect with the database. Please try agai later");
                    console.log(error.response);
                }
            }else if(error.request){
                createModel("Error","Request error","An error ocurred while trying to connect with the database. Please try agai later");
                console.log(error.request);
            }else{
                createModel("Error","error desconocido", "unknown error. Try agai later");
                console.log("unknown error");
            }
        });
    }


    function createModel(nTitle, nSubtitle, nText){
        dialog.value = true;
        message.value.title = nTitle;
        message.value.subtitle = nSubtitle;
        message.value.text = nText;
    }

</script>