<template>
        <v-dialog
        class="text-center"
        width="500"
        persistent
        v-model="triggerVerify">
            <v-card class="text-center">
                <v-card-title>Verify</v-card-title>
                <v-card-subtitle>Confirm your logout</v-card-subtitle>
                <v-card-text>Are you sure you want to log out</v-card-text>
                <v-divider></v-divider>
                <v-card-actions
                class="d-flex justify-center">
                    <v-btn
                    color="success">confirm</v-btn>

                    <v-btn
                    color="error"
                    @click="closeVerify">cancel</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
</template>

<script setup>
    //el trigger verify hay que convertirlo a prop y acceder desde app.
    import {ref} from "vue"

    var triggerVerify = ref();

    const emit = defineEmits(['cancelSignoutEvent']);
    function closeVerify(){
        //alert("estoy aqui");
        //triggerVerify.value=false;
        emit('cancelSignoutEvent');
    }

</script>