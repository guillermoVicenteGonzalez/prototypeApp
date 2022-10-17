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
            v-model="updatedUser.username"
            clearable></v-text-field>
           
            <v-text-field
            variant="outlined"
            class="mx-10 my-2"
            label="mail"
            color="primary"
            v-model="updatedUser.userMail"
            clearable
            :rules="[rules.required, rules.email]"
            ></v-text-field>

            <v-card-actions class="text-center justify-center">
                <v-btn
                color="success"
                @click="updateUser">Accept</v-btn>

                <v-btn
                color="error"
                @click="cancelUserUpdate">Cancel</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <modal
    ref="errorModalProfile"></modal>



    <loading v-model="triggerLoading_profile"></loading>
</template>

<script setup>
    import loading from "../components/loading.vue";
    import verify from "../components/verify.vue";
    import axios from "axios";
    import {ref} from "vue";
    import config from "../config.json"
    import Modal from "./modal.vue";

    const emit = defineEmits(['updatedUserEvent','refreshSignup']);

    var triggerLoading_profile = ref();
    var errorModalProfile = ref();
    var currentUser;
    var trigger = ref();
    var updatedUser = ref({
        username:undefined,
        password:undefined,
        photo:undefined,
        mail:undefined
    });

    function createUpdateUserModal(user){
        console.log(user);
        trigger.value = true;
        currentUser = user;
        console.log(currentUser);
        for(const i in currentUser){
            updatedUser.value[i] = currentUser[i];
            console.log(i + ": " + updatedUser.value[i])
        }
    }


    async function updateUser(){
        triggerLoading_profile.value = true;
        console.log(currentUser.photo);
        let promise = await axios
        .put(config.host + config.api + config.updateUser + currentUser.username,{
            login:updatedUser.value.username,
            mail:updatedUser.value.userMail,
            photo:currentUser.userPhoto            
        },{
            headers:{
                'Authorization':'Bearer '+ localStorage.token
            },
        })

        .then(function (response){
            triggerLoading_profile.value = false;
            //modal + response
            errorModalProfile.value.createDialog("Success","the user was updated successfully","",true);
            localStorage.username = updatedUser.value.username;
            emit('updatedUserEvent'); //if username is changed something fails
            trigger.value = false;
        })
        .catch(function(error){
            console.log(error.response.data);
            triggerLoading_profile.value = false;
            errorModalProfile.value.createDialog("Error","An error ocurred while updating the user",error.response.data.message,false);
        })
    }

    function cancelUserUpdate(){
        for(const i in updatedUser.value){
            updatedUser.value[i] = undefined;
        }

        trigger.value = false;
    }


    defineExpose({createUpdateUserModal});

</script>

<script>
    export default {
        data () {
            return {
            email: '',
            rules: {
                required: value => !!value || 'Required.',
                counter: value => value.length <= 20 || 'Max 20 characters',
                email: value => {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return pattern.test(value) || 'Invalid e-mail.'
                },
            },
            }
        },
    }
</script>