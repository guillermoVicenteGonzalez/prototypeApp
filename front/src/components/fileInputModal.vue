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

            <v-btn @click="uploadFile">click</v-btn>

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
    //var triggerFileModal = ref();

    function createFileInputModal(){
        trigger.value = true;
    }

    function uploadFile(){
        if(myPhoto.value != undefined){
            formData.append("name",myPhoto.value[0].name);
            formData.append("profileImage",myPhoto.value[0]);
            console.log(myPhoto.value[0]);
            axios.post(config.host + config.api + config.uploadPicture,formData,{
            //axios.post("http://localhost:3000/api/upload",formData,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            })
        }
    }

    defineExpose({
        createFileInputModal
    });

</script>