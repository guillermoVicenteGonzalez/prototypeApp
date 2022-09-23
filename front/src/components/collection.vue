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
    <modal
    @create="(atr) => crearModal = atr"></modal>
    <v-btn
    @click="funcionaPlz"
    >haz click</v-btn>
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
    var crearModal = ref();
    var collectionDialog = ref(false);
    var collectionDialogMessage = ref({
        title:undefined,
        subtitle:undefined,
        text:undefined
    });

    function funcionaPlz(){
        //crearModal.value("ahora si?","","");
        //crearModal.value("buenas tardes");
        //console.log(crearModal.value);
        crearModal.value();
    }

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
                console.log("estoy aqui");
                crearModal.value("por fin funciona","","");
                //console.log(response.data);
                array.value = [];
                array.value.push(response.data.tvshow);
            })
            .catch(function(error){
                if(error.response){
                    console.log(error.response.data);
                    createModel("Error","",error.response.data.message);
                }else if(error.request){
                    createModel("Error","Request error","An error ocurred while trying to connect with the database. Please try again later");
                    console.log(error.request);
                }else if(error != undefined){
                    //createModel("Error","", "unknown error. Try again later");
                    console.log("unknown error");
                }
            });
        }
    }

    /*
    function createModel(nTitle, nSubtitle, nText){
        collectionDialog.value = true;
        collectionDialogMessage.value.title = nTitle;
        collectionDialogMessage.value.subtitle = nSubtitle;
        collectionDialogMessage.value.text = nText;
    }*/
    getAllTVShows();
</script>