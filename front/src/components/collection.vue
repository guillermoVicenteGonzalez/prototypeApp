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
</template>

<script setup>
    import axios from "axios";
    import {ref} from "vue";
    import config from "../config.json";

    const array = ref([]);
    const message = ref();
    async function getAllTVShows(){
        let promise = axios.get(config.host + config.api + config.getAllTVShows)
        .then(function(result){
            array.value = result.data.tvshows;
        })
    }

    async function searchTVShow(){
        if( message.value == ""){
            console.log("vacio");
            getAllTVShows();
        }else{
            let promise = axios.get(config.host + config.api + config.findTVShow + "/" + message.value)
            .then(function (response){
                array.value = [];
                array.value.push(response.data.tvshow);
            })
        }
    }

    
    getAllTVShows();
</script>