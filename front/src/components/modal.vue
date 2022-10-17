<template>
    <v-dialog
    class="text-center"
    width="500"
    v-model="collectionDialog">
        <v-card
        :class="dialogClass"
        :title="dialogMessage.title"
        :subtitle="dialogMessage.subtitle"
        :text="dialogMessage.text">
        <v-card-title
        append-icon="mdi-map-marker"></v-card-title>
        <v-divider></v-divider>
            <v-card-actions class="justify-center">
                <v-btn
                @click="modalBtnClick"
                :color="btnColor"
                :append-icon="dialogIcon">
                Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

</template>

<script setup>
    import {ref} from "vue";

    const props = defineProps({
        isModalActive:Boolean
    });
    const emit = defineEmits(['close']);
    //emit('create',createModel);
    var dialogClass = ref();
    var dialogIcon = ref();
    var cardColor = ref();
    var btnColor = ref();
    var collectionDialog = ref();
    const dialogMessage = ref({
        title:undefined,
        subtitle:undefined,
        text:undefined
    });
   
    
    const createDialog = function (nTitle, nSubtitle, nText,isSuccessful){        
        collectionDialog.value = true;
        dialogMessage.value.title = nTitle;
        dialogMessage.value.subtitle = nSubtitle;
        dialogMessage.value.text = nText;
        if(isSuccessful){
            dialogClass.value = "text-success";
            btnColor.value="success";
            dialogIcon.value = "mdi-check-circle";
        }else{
            dialogClass.value="text-error";
            btnColor.value="error";
            dialogIcon.value="mdi-close-circle";
        }
    }

    function modalBtnClick(){
        collectionDialog.value = false
        emit('close');
    }

    defineExpose({
        createDialog
    });

</script>