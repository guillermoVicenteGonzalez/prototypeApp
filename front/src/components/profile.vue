<style>
    .allAxisCenteredContainer{
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .centeredDiv{
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>

<template>
        <div class="allAxisCenteredContainer text-left">

            <v-card 
            width="500"
            class="pt-3 text-center">
                <div class="centeredDiv">
                    <v-btn
                    icon
                    size="56"
                    color="primary"
                    @click="triggerFileInputModal.createFileInputModal()">

                    </v-btn>
                </div>
                <v-card-title>Profile</v-card-title>
                <v-card-text class="py-1">{{'username: ' + userData.username}}</v-card-text>
                <v-card-text class="py-1">{{'mail: ' + userData.userMail}}</v-card-text>
                <v-divider></v-divider>
                <v-card-actions class="justify-center">
                    <v-btn
                    @click="test">Update</v-btn>
                    <v-btn>Delete</v-btn>
                </v-card-actions>
            </v-card>
        </div>
        <updateUserModal
        ref="updateUserModalRef"></updateUserModal>

        <FileInputModal
        ref="triggerFileInputModal"></FileInputModal>
</template>


<script setup>
    import {ref} from "vue";
    import axios from "axios";
    import config from "../config.json";
    import updateUserModal from "../components/updateUserModal.vue"
    import FileInputModal from "./fileInputModal.vue";

    const formData = new FormData();
    var triggerFileInputModal = ref();
    var updateUserModalRef = ref();
    var userData = ref({
        username:undefined,
        userPhoto:undefined,
        userMail:undefined
    });

    function test(){
        //updateUserModalRef.value.createUpdateUserModal();
        alert()
    }

    async function loadUserData(){
        if(localStorage.token != undefined && localStorage.username != undefined){
            let token = localStorage.token;
            userData.value.username = localStorage.username;
            let user = axios.get(config.host + config.api + config.getUserData + userData.value.username,
            {
                headers:{
                    'Authorization':'Bearer '+ localStorage.token
                }
            })
            .then(function(response){
                userData.value.username = response.data.user.login;
                userData.value.userPhoto = response.data.user.photo;
                userData.value.userMail = response.data.user.mail;
                console.log(userData.value.userMail);
            })
            .catch(function(error){
                console.log("error");
            })
        }else{
            console.log("not all data");
        }
    }

    loadUserData();
</script>