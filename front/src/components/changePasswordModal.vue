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
                    color="error"
                    @click="cancelUpdatePasswd()">Cancel</v-btn>
                </v-card-actions>
        </v-card>

        <loading
        v-model="triggerLoadingCPM"></loading>

        <Modal
        ref="errorModalCPM"></Modal>
    </v-dialog>
</template>

<script setup>
    import {ref} from "vue";
    import axios from "axios";
    import config from "../config.json"
    import Verify from "../components/verify.vue"
    import Loading from "./loading.vue";
    import Modal from "./modal.vue";

    var errorModalCPM = ref();
    var triggerLoadingCPM = ref();
    var triggerPasswdModal = ref();
    var showPasswd = ref();
    var showRepeatPasswd = ref();
    var showCurrentPasswd = ref();

    var currentPasswd = ref();
    var newPasswd = ref();
    var confirmNewPasswd = ref();

    defineEmits(['passwordChanged']);

    function createPasswdModal(){
        triggerPasswdModal.value = true;
    }

    function cancelUpdatePasswd(){
        currentPasswd.value = newPasswd.value = confirmNewPasswd.value = undefined;
        triggerPasswdModal.value = false
    }
    async function updatePassword(){
        let user;
        triggerLoadingCPM.value = true;
        //primero comprueba que las contrase??as sean iguales
        if(newPasswd.value != confirmNewPasswd.value){
            triggerLoadingCPM.value = false;
            errorModalCPM.value.createDialog("Error","Error while trying to sign","The passwords are not equal",false);
        }else{
            //llamada a sign in con la password normal
            let tokenPromise = await axios.post(config.host + config.api + config.loginUser,{
                login:localStorage.username,
                password:currentPasswd.value
            })
            .then(async function(response){
                localStorage.token = response.data.token;
                let promise = axios.put(config.host + config.api + config.updatePassword + localStorage.username,{
                    password:newPasswd.value,     
                },{
                    headers:{
                        'Authorization':'Bearer '+ localStorage.token
                    }
                })
                .then(function(response){
                    triggerLoadingCPM.value = false;
                    currentPasswd.value = newPasswd.value = confirmNewPasswd.value = undefined;
                    triggerPasswdModal.value = false;
                })
                .catch(function(err){
                    triggerLoadingCPM.value = false;
                    errorModalCPM.value.createDialog("Error","There was an error ",err.response.data.message)
                    //create modal
                    console.log(err);
                })

            })
            .catch(function(err){
                triggerLoadingCPM.value = false;
                errorModalCPM.value.createDialog("Error","Error while trying to sign",err.response.data.message,false);
                console.log("error, user not found???");
            })
            currentPasswd.value = newPasswd.value = confirmNewPasswd.value = undefined;
        }
    }

    defineExpose({
        createPasswdModal
    })

</script>