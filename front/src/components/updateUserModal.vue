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
            color="primary"
            v-model="updatedUser.username"></v-text-field>
           
            <v-text-field
            variant="outlined"
            class="mx-10 my-2"
            label="mail"
            color="primary"
            v-model="updatedUser.mail"></v-text-field>

            <v-card-actions class="text-center justify-center">
                <v-btn
                color="success"
                @click="updateUser">Accept</v-btn>

                <v-btn
                color="error"
                @click="trigger = false">Cancel</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
    import axios from "axios";
    import {ref} from "vue";
    import config from "../config.json"

    const emit = defineEmits(['updatedUserEvent']);
    var currentUser;
    var trigger = ref();
    var updatedUser = ref({
        username:undefined,
        password:undefined,
        photo:undefined,
        mail:undefined
    });

    function createUpdateUserModal(user){
        trigger.value = true;
        currentUser = user;
        for(const i in currentUser){
            //console.log(i);
            updatedUser.value[i] = currentUser[i];

        }
        //alert("funciona??'");
    }

    //error handling
    async function updateUser(){
        let promise = await axios
        .put("http://localhost:3000/api/users/guillermo",{
            login:updatedUser.value.username,
            mail:updatedUser.value.mail,            
        },{
            headers:{
                'Authorization':'Bearer '+ localStorage.token
            },
        })

        .then(function (response){
            //modal + response
            emit('updatedUserEvent');
            trigger.value = false;
        })
        .catch(function(error){
            console.log(error);
            console.log(updatedUser.value.username);
            //modal error
        })
    }

    defineExpose({createUpdateUserModal});

</script>