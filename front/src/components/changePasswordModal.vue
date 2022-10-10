<template>
    <v-dialog
    v-model="triggerPasswdModal"
    width="500"
    class="text-center justify-center">
        <v-card class="py-3">
            <v-card-title class="text-center">Change password</v-card-title>
            <v-text-field 
               class="mx-10"
               variant="outlined"
               label="current password"
               v-model="currentPasswd"
               :type="showCurrentPasswd ? 'text' : 'password'"
               @click:append="showCurrentPasswd = !showCurrentPasswd"
               :append-icon="showCurrentPasswd ? 'mdi-eye' : 'mdi-eye-off'"
               ></v-text-field>

               <v-text-field 
               class="mx-10"
               variant="outlined"
               label="new password"
               v-model="newPasswd"
               :type="showPasswd ? 'text' : 'password'"
               @click:append="showPasswd = !showPasswd"
               :append-icon="showPasswd ? 'mdi-eye' : 'mdi-eye-off'"
               ></v-text-field>

               <v-text-field 
               class="mx-10"
               variant="outlined"
               label="confirm new password"
               v-model="confirmNewPasswd"
               :type="showRepeatPasswd ? 'text' : 'password'"
               @click:append="showRepeatPasswd = !showRepeatPasswd"
               :append-icon="showRepeatPasswd ? 'mdi-eye' : 'mdi-eye-off'"
               ></v-text-field>
           
        </v-card>
    </v-dialog>
</template>

<script setup>
    import {ref} from "vue";

    var triggerPasswdModal = ref();
    var showPasswd = ref();
    var showRepeatPasswd = ref();
    var showCurrentPasswd = ref();

    var currentPasswd = ref();
    var newPasswd = ref();
    var confirmNewPasswd = ref();

    function createPasswdModal(){
        triggerPasswdModal.value = true;
    }

    function updatePassword(){
        //llamada a sign in con la password normal
        //crear llamada update password
    }

    defineExpose({
        createPasswdModal
    })

</script>