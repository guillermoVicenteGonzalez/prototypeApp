<template>
    <v-dialog
    v-model="collectionDialog">
        <v-card
        :title="collectionDialogMessage.title"
        :subtitle="collectionDialogMessage.subtitle"
        :text="collectionDialogMessage.text">
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

    var collectionDialog;
    const dialogMessage = ref({
        title:undefined,
        subtitle:undefined,
        text:undefined
    });
   //const props = defineProps(collectionDialog);

    function createModel(nTitle, nSubtitle, nText){
        collectionDialog.value = true;
        dialogMessage.value.title = nTitle;
        dialogMessage.value.subtitle = nSubtitle;
        dialogMessage.value.text = nText;
    }

</script>