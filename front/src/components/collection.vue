<template>
    <v-form
    @submit.prevent="searchTVShow">
        <v-text-field
        variant="outlined"
        class="mx-20"
        label="search tvshow"
        v-model="message"
        append-icon="mdi-magnify"
        width="400">
        </v-text-field> 
    </v-form>

    <v-container class="d-flex flex-wrap mb-6 justify-center" fluid>
        <v-card
        class="mx-3 my-5"
        v-for="item of array"
        :title="item.title"
        :subtitle="item.year + ' , ' + item.country"
        :text="item.summary"
        width="300"
        height="150"
        @click="test">
        </v-card>
    </v-container>

    <modal @create="(atr) => createModal = atr"></modal>
    <loading v-model="triggerLoadgin_Col"></loading>

</template>

<script setup>
    import axios from "axios";
    import {ref} from "vue";
    import config from "../config.json";
    import {inject} from "vue";
    import modal from "../components/modal.vue";
    import Loading from "./loading.vue";


    const array = ref([]);
    const message = ref();
    var createModal = ref();
    var collectionDialog = ref(false);
    var triggerLoadgin_Col = ref();
    var collectionDialogMessage = ref({
        title:undefined,
        subtitle:undefined,
        text:undefined
    });


    async function getAllTVShows(){
        triggerLoadgin_Col.value = true;
        let promise = axios.get(config.host + config.api + config.getAllTVShows)
        .then(function(result){
            triggerLoadgin_Col.value = false;
            array.value = [];
            array.value = result.data.tvshows;
        })
        .catch(function (error){
            triggerLoadgin_Col.value = false;
            if(error.response);
            createModel()
        });
    }

    async function searchTVShow(){
        if( message.value == "" || message.value == undefined){
            console.log("vacio");
            getAllTVShows();
        }else{
            triggerLoadgin_Col.value = true;
            let promise = axios.get(config.host + config.api + config.findTVShow + "/" + message.value)
            .then(function (response){
                array.value = [];
                array.value.push(response.data.tvshow);
                triggerLoadgin_Col.value = false;
            })
            .catch(function(error){
                triggerLoadgin_Col.value = false;
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

    function test(){
        alert("hello");
    }

    getAllTVShows();
</script>