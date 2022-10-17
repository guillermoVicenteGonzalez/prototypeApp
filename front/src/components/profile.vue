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
            <v-container class="text-center mx-20 px-16 d-flex justify-center align-center">
                <v-card 
                width="500"
                class="pt-3 text-center ">
                    <div class="centeredDiv">
                        <v-btn
                        icon
                        size="56"
                        color="primary"
                        @click="triggerFileInputModal.createFileInputModal(userData)">

                        </v-btn>
                    </div>
                    <v-card-title>Profile</v-card-title>
                    <v-card-text class="py-1">{{'username: ' + userData.username}}</v-card-text>
                    <v-card-text class="py-1">{{'mail: ' + userData.userMail}}</v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions class="justify-center">
                        <v-btn
                        color="primary"
                        @click="updateUserModalRef.createUpdateUserModal(userData)">Update</v-btn>

                        <v-btn
                        color="primary"
                        @click="passwdModal.createPasswdModal()">Change password</v-btn>

                        <v-btn
                        color="error"
                        @click="deleteUser">Delete</v-btn>
                    </v-card-actions>
                </v-card>
            </v-container>
        </div>

        <Modal
        ref="dialogModal"></Modal>

        <updateUserModal
        ref="updateUserModalRef"
        @updatedUserEvent="loadUserData()"></updateUserModal>

        <ChangePasswordModal
        ref="passwdModal"></ChangePasswordModal>

        <FileInputModal
        ref="triggerFileInputModal"
        @profilePictureUpdated="loadUserData()"></FileInputModal>

</template>


<script setup>
    import {ref} from "vue";
    import axios from "axios";
    import config from "../config.json";
    import updateUserModal from "../components/updateUserModal.vue"
    import FileInputModal from "./fileInputModal.vue";
    import Modal from "./modal.vue";
    import ChangePasswordModal from "../components/changePasswordModal.vue"

    const formData = new FormData();
    var updateUserModalRef = ref();
    var passwdModal = ref();
    var dialogModal = ref();
    var profilePic = ref();
    var triggerFileInputModal = ref();
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
                console.log(response.data.user);
            })
            .catch(function(error){
                //create modal
                console.log(error);
            })
        }else{
            console.log("not all data");
            //probably emit to unlog and send to home
        }
    }

    async function getProfilePic(){
        let tempId = "6342fd9ef53d19167d5b58fe";
        let buffer64
        let promise = await axios.get(config.host + config.api + config.getPicture + tempId)
        .then(function(response){
            console.log(response.data.photo.image.data);
            buffer64 = Buffer.from(response.data.photo.image.data,'binary').toString('base64');
            profilePic.value = buffer64;
            console.log(profilePic.value);
        })
        .catch(function(error){
            console.log(error);
        })
    }

    async function deleteUser(){
        let deletedUser = await axios.delete(config.host + config.api + config.deleteUser + userData.value.username)
        .then(function(response){
            if(response.data.success == true){
                //redirect
                dialogModal.value.createDialog("Success","user successfully deleted","",true);
            }else{
                dialogModal.value.createDialog("Error","",response.data.message,false);
            }
            //redirect
        })
        .catch(function(err){
            dialogModal.value.createDialog("Error","Error deleting user","",false);
            console.log("error");
        })
    }

    loadUserData();
</script>