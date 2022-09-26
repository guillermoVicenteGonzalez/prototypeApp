<template>
    <v-form
    @submit.prevent="searchTVShow">
        <v-text-field
        variant="outlined"
        class="ma-10"
        label="search tvshow"
        v-model="message"></v-text-field> 
    </v-form>


    <v-card
    class="mx-10 my-5"
    v-for="item of array"
    :title="item.title"
    :subtitle="item.year + ' , ' + item.country"
    :text="item.summary">
    </v-card>

    <!--
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
    -->
    <modal @create="(atr) => createModal = atr"></modal>

</template>

<script setup>
    import axios from "axios";
    import {ref} from "vue";
    import config from "../config.json";
    import {inject} from "vue";
    import {newCreateModel} from "../main.js"
    import modal from "../components/modal.vue";


    const array = ref([]);
    const message = ref();
    var createModal = ref();
    var collectionDialog = ref(false);
    var collectionDialogMessage = ref({
        title:undefined,
        subtitle:undefined,
        text:undefined
    });


    async function getAllTVShows(){
        let promise = axios.get(config.host + config.api + config.getAllTVShows)
        .then(function(result){
            array.value = [];
            array.value = result.data.tvshows;
        })
        .catch(function (error){
            if(error.response);
            createModel()
        });
    }

    async function searchTVShow(){
        if( message.value == "" || message.value == undefined){
            console.log("vacio");
            getAllTVShows();
        }else{
            let promise = axios.get(config.host + config.api + config.findTVShow + "/" + message.value)
            .then(function (response){
                array.value = [];
                array.value.push(response.data.tvshow);
            })
            .catch(function(error){
                if(error.response){
                    console.log(error.response.data);
                    createModal.value("Error","",error.response.data.message);
                }else if(error.request){
                    createModal.value("Error","Request error","An error ocurred while trying to connect with the database. Please try again later");
                    console.log(error.request);
                }else if(error != undefined){
                    createModalAS.value("Error","unknown error","",false);
                    console.log("unknown error");
                }
            });
        }
    }

    getAllTVShows();
</script>