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

            <v-btn @click="test">click</v-btn>

            <v-img
            :src="myPhoto"></v-img>
        </v-card>
    </v-dialog>
</template>

<script setup>
    import {ref} from "vue";

    const formData = new FormData();
    var myPhoto = ref();
    var trigger = ref();
    //var triggerFileModal = ref();

    function createFileInputModal(){
        trigger.value = true;
    }

    function test(){
        formData.append("userPhoto",myPhoto.value[0]);    
    }

    defineExpose({
        createFileInputModal
    });

</script>