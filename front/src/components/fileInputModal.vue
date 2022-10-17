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
            ></v-file-input>
            <v-divider></v-divider>
            <v-card-actions class="justify-center">
                <v-btn
                color="primary" 
                @click="updateUserPhoto">update photo</v-btn>
            </v-card-actions>

            <v-img
            lazy-src=""
            :src="myPhoto"></v-img>
        </v-card>

        <loading v-model="triggerLoadingFIM"></loading>
        
        <modal
        ref="errorModalFIM"
        @close="trigger = false"></modal>
    </v-dialog>
</template>

<script setup>
    import {ref} from "vue";
    import axios from "axios";
    import config from "../config.json";
    import Loading from "./loading.vue";
    import Modal from "./modal.vue";

    const formData = new FormData();
    var errorModalFIM = ref();
    var triggerLoadingFIM = ref(false);
    var myPhoto = ref();
    var trigger = ref();
    var currentUser;
    //var triggerFileModal = ref();

    const  emit = defineEmits(['profilePictureUpdated']);

    function createFileInputModal(user){
        trigger.value = true;
        currentUser = user;
        console.log(currentUser);
    }

    async function updateUserPhoto(){
        triggerLoadingFIM.value = true;
        let updatedImageId = await uploadFile();
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
            triggerLoadingFIM.value = false;
            errorModalFIM.value.createDialog("Success","user picture was updated succesfully","",true);
            myPhoto.value = undefined;
            console.log("success updating image");
            emit('profilePictureUpdated');
        })
        .catch(function(err){
            triggerLoadingFIM.value = false;
            errorModalFIM.value.createDialog("Error","There was an error while updating user picture",err,false);
            //modal
            console.log(err);
        })
    }
    async function uploadFile(){
        let imgID;
        if(myPhoto.value != undefined){
            const formData = new FormData();
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
            errorModalFIM.value.createDialog("Error","no picture was selected","",true);
            console.log("error");
            return undefined;
        }
    }

    defineExpose({
        createFileInputModal
    });

</script>