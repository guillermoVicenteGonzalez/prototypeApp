<template>
     <v-container class="text-center mx-20 px-16">
        <v-card class="py-5">    
            <v-form>
                <h1>Login</h1>
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
                @click:append="iniciarSesion"
                ></v-text-field>

                <v-btn class="ma-2"
                    @click="iniciarSesion"
                >Iniciar sesion</v-btn>

            </v-form>  
        </v-card>       
    </v-container>

</template>

<script setup>
    import axios from "axios";
    import {ref} from "vue";
    import AppVue from "../App.vue";

    var token ="";
    var userLogin = ref();
    var userPasswd = ref();
    var userLogged = ref();

    async function iniciarSesion(){
        let result = await axios.post("http://localhost:3000/api/usuarios/login",{
            nombre:userLogin.value,
            password:userPasswd.value
        })
        .then( function(response){
            console.log(response.data);
            if(response.data.success == true){
                userLogged.value = true;
                token=response.data.token;
            }
        })
        .catch(function(error){
            if(error.response){
                console.log(error.response.data);
            }else if(error.request){
                console.log(error.request);
            }else if(error != undefined){
                console.log("error desconocido");
            }
        });
    }

    function prueba(){
        console.log(userLogged.value);
    }

</script>