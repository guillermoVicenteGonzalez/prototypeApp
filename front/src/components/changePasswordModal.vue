<template>
    <v-dialog
    v-model="triggerPasswdModal"
    width="500"
    class="text-center justify-center">
        <v-card class="py-3">
            <v-card-title class="text-center">Change password</v-card-title>
            <v-text-field 
               class="mx-10"
               variant="outlined"
               label="current password"
               v-model="currentPasswd"
               :type="showCurrentPasswd ? 'text' : 'password'"
               @click:append="showCurrentPasswd = !showCurrentPasswd"
               :append-icon="showCurrentPasswd ? 'mdi-eye' : 'mdi-eye-off'"
               ></v-text-field>

               <v-text-field 
               class="mx-10"
               variant="outlined"
               label="new password"
               v-model="newPasswd"
               :type="showPasswd ? 'text' : 'password'"
               @click:append="showPasswd = !showPasswd"
               :append-icon="showPasswd ? 'mdi-eye' : 'mdi-eye-off'"
               ></v-text-field>

               <v-text-field 
               class="mx-10"
               variant="outlined"
               label="confirm new password"
               v-model="confirmNewPasswd"
               :type="showRepeatPasswd ? 'text' : 'password'"
               @click:append="showRepeatPasswd = !showRepeatPasswd"
               :append-icon="showRepeatPasswd ? 'mdi-eye' : 'mdi-eye-off'"
               ></v-text-field>
               <v-divider></v-divider>
               <v-card-actions class="justify-center">
                    <v-btn
                    color="success"
                    @click="updatePassword()">Accept</v-btn>

                    <v-btn
                    color="error">Cancel</v-btn>
                </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
    import {ref} from "vue";
    import axios from "axios";
    import config from "../config.json"

    var triggerPasswdModal = ref();
    var showPasswd = ref();
    var showRepeatPasswd = ref();
    var showCurrentPasswd = ref();

    var currentPasswd = ref();
    var newPasswd = ref();
    var confirmNewPasswd = ref();

    function createPasswdModal(){
        triggerPasswdModal.value = true;
    }

    async function updatePassword(){
        let user;
        //primero comprueba que las contraseñas sean iguales
        if(newPasswd.value != confirmNewPasswd.value){
            //create modal
        }else{
            //llamada a sign in con la password normal
            let tokenPromise = await axios.post(config.host + config.api + config.loginUser,{
                login:localStorage.username,
                password:currentPasswd.value
            })
            .then(async function(response){
                localStorage.token = response.data.token;
                console.log("hasta aqui funciona");
                let promise = axios.put(config.host + config.api + config.updatePassword + localStorage.username,{
                    password:newPasswd.value
                })
                .then(function(response){
                    console.log(response.data);
                })
                .catch(function(err){
                    console.log(err);
                })

            })
            .catch(function(err){
                console.log("error, user not found???");
            })
        }
    }

    defineExpose({
        createPasswdModal
    })

</script>