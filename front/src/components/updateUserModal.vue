<template>
    <v-dialog
    v-model="trigger"
    width="500"
    class="text-center">
        <v-card class="text-center">
            <v-card-title>
            Profile update</v-card-title>

            <v-text-field
            variant="outlined"
            class="mx-10 my-2"
            label="username"
            color="primary"></v-text-field>


        </v-card>
    </v-dialog>
</template>

<script setup>
    import {ref} from "vue";

    var trigger = ref();

    function createUpdateUserModal(){
        trigger.value = true;
        //alert("funciona??'");
    }

    defineExpose({createUpdateUserModal});
</script>