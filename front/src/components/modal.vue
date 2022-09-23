<template>
    <v-dialog
    v-model="collectionDialog">
        <v-card
        :title="dialogMessage.title"
        :subtitle="dialogMessage.subtitle"
        :text="dialogMessage.text">
        <v-divider></v-divider>
            <v-card-actions>
                <v-btn
                @click="collectionDialog = false">
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

    var collectionDialog = ref();
    const dialogMessage = ref({
        title:undefined,
        subtitle:undefined,
        text:undefined
    });
   

    function createModel(nTitle, nSubtitle, nText){
        alert("funciona?");
        
        collectionDialog.value = true;
        /*
        dialogMessage.value.title = nTitle;
        dialogMessage.value.subtitle = nSubtitle;
        dialogMessage.value.text = nText;
        */
    }

    const emit = defineEmits(['create']);
    emit('create',createModel);

    function holamundo(mensaje){
        alert(mensaje);
    }
    function prueba(mensaje){
        console.log(mensaje);
    }
</script>