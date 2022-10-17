<template>
    <v-dialog 
    v-model="trigger" 
    class="text-center" 
    width="500"
    outlined>
        <v-card>

            <v-file-input   
            accept="image/*"
            label="File input"
            filled
            prepend-icon="mdi-camera"
            v-model="myPhoto"
            ref="otherPhoto"
            ></v-file-input>

            <v-btn @click="updateUserPhoto">click</v-btn>

            <v-img
            lazy-src=""
            :src="myPhoto"></v-img>
        </v-card>
    </v-dialog>
</template>

<script setup>
    import {ref} from "vue";
    import axios from "axios";
    import config from "../config.json";

    const formData = new FormData();
    var myPhoto = ref();
    var trigger = ref();
    var currentUser;
    //var triggerFileModal = ref();

    defineEmits(['profilePictureUpdated']);

    function createFileInputModal(user){
        trigger.value = true;
        currentUser = user;
        console.log(currentUser);
    }

    async function updateUserPhoto(){
        //trigger loading
        let updatedImageId = await uploadFile();
        console.log(currentUser.username + " " + currentUser.userMail);
        console.log(updatedImageId);
        let promise = await axios
        .put(config.host + config.api + config.updateUser + currentUser.username,{
            login:currentUser.username,
            mail:currentUser.userMail,
            photo:updatedImageId
        },
        {
            headers:{
                'Authorization':'Bearer '+ localStorage.token
            },
        })
        .then(function(response){
            //trigger loading off
            //create modal
            console.log("success updating image");
        })
        .catch(function(err){
            console.log(err);
        })
    }
    async function uploadFile(){
        let imgID;
        if(myPhoto.value != undefined){
            const formData = new FormData();
            //aqui podria meter el nombre del usuario temporalmente
            formData.append("name",myPhoto.value[0].name);
            formData.append("profileImage",myPhoto.value[0]);
            console.log(myPhoto.value[0]);
            let promise = await axios.post(config.host + config.api + config.uploadPicture,formData,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            })
            .then(function(response){
                imgID = response.data.id;
                //console.log("image id: " + imgID);
                formData.delete("name");
                formData.delete("profileImage");
                //emit('profileImageUpdated');
            })
            return imgID;
        }else{
            console.log("error");
            console.log(userPhoto.value);
            return undefined;
        }
    }

    defineExpose({
        createFileInputModal
    });

</script>