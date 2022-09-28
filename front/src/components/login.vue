<template>
     <v-container class="text-center mx-20 px-16">
        <v-card 
        class="py-5"
        width="500">    
            <v-form>
                <h1>Login</h1>
                <v-text-field 
                class="mx-10"
                variant="outlined"
                label="username"
                v-model="userLogin"
                required
                color="primary"
                ></v-text-field>

                <v-text-field 
                class="mx-10"
                variant="outlined"
                label="password"
                v-model="userPasswd"
                type="password"
                required
                color="primary"
                ></v-text-field>

                <v-btn class="ma-2"
                @click="login"
                color="success"
                >sign in</v-btn>



            </v-form>  
        </v-card>      

        <modal @create="(atr) => createModalLogin = atr"></modal>
        <loading
        v-model="triggerLoading"></loading>
    </v-container>

</template>

<script setup>
    import axios from "axios";
    import {ref} from "vue";
    import AppVue from "../App.vue";
    import config from "../config.json";
    import modal from "../components/modal.vue";
    import loading from "../components/loading.vue";
    import Loading from "./loading.vue";


    const emit = defineEmits(['userLogs']);
    var token ="";
    var userLogin = ref();
    var userPasswd = ref();
    var userLogged = ref();
    var createModalLogin = ref();
    var triggerLoading = ref();
    //"booleano" que controla si aparece o no el dialogo
    var dialog = ref(false);
    //objeto mensaje que aparecerá en el model
    var message = ref({
        title:undefined,
        subtitle:undefined,
        text:undefined
    });


    async function login(){
        triggerLoading.value=true;
        let result = await axios.post(config.host + config.api + config.loginUser,{
            login:userLogin.value,
            password:userPasswd.value
        })
        .then( async function(response){
            triggerLoading.value=false;
            console.log(response.data);
            if(response.data.success == true){
                await createModalLogin.value("Success","Successful login","",true);
                userLogged.value = true;
                token=response.data.token;
                emit('userLogs',true);
            }
        })
        .catch(function(error){
            triggerLoading.value=false;
            //emit('userLogs',false);
            if(error.response){
                if(error.response.data){
                    createModalLogin.value("Error","",error.response.data.message,false);                    
                }else{
                    createModalLogin.value("Error","request error","An error ocurred while trying to connect with the database. Please try again later");
                    console.log(error.response);
                }
            }else if(error.request){
                createModallogin.value("Error","Request error","An error ocurred while trying to connect with the database. Please try agai later");
                console.log(error.request);
            }else{
                createModalLogin.value("Error","error desconocido", "unknown error. Try again later");
                console.log("unknown error");
            }
        });
    }
</script>