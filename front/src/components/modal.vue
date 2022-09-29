<template>
    <v-dialog
    class="text-center"
    width="500"
    v-model="collectionDialog">
        <v-card
        :title="dialogMessage.title"
        :subtitle="dialogMessage.subtitle"
        :text="dialogMessage.text">
        <v-card-title
        append-icon="mdi-map-marker"></v-card-title>
        <v-divider></v-divider>
            <v-card-actions class="justify-center">
                <v-btn
                @click="collectionDialog = false"
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
    const emit = defineEmits(['create']);
    emit('create',createModel);
    var dialogIcon = ref();
    var cardColor = ref();
    var btnColor = ref();
    var collectionDialog = ref();
    const dialogMessage = ref({
        title:undefined,
        subtitle:undefined,
        text:undefined
    });
   
    
    function createModel(nTitle, nSubtitle, nText,isSuccessful){        
        collectionDialog.value = true;
        dialogMessage.value.title = nTitle;
        dialogMessage.value.subtitle = nSubtitle;
        dialogMessage.value.text = nText;
        if(isSuccessful){
            btnColor.value="success";
            dialogIcon.value = "mdi-check-circle";
        }else{
            btnColor.value="error";
            dialogIcon.value="mdi-close-circle";
        }
    }

    //para nota
    defineExpose({
        createModel
    });

</script>