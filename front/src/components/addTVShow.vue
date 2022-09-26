<template>
    <v-container class="text-center">
        <v-card>
            <h1 class="text-center">Add tvshow</h1>
            <v-form>
                <v-text-field
                variant="outlined"
                class="mx-10 my-2"
                label="title"
                v-model="tvTitle"></v-text-field>

                <v-text-field
                variant="outlined"
                class="mx-10 my-2"
                label="year"
                v-model="tvYear"></v-text-field>

                <v-text-field
                variant="outlined"
                class="mx-10 my-2"
                label="seasons"
                v-model="tvSeasons"></v-text-field>

                <v-text-field
                variant="outlined"
                class="mx-10 my-2"
                label="country"
                v-model="tvCountry"></v-text-field>

                <v-text-field
                variant="outlined"
                class="mx-10 my-2"
                label="summary"
                v-model="tvSummary"></v-text-field>
                <v-btn
                class="mb-5"
                @click="registerTVShow">register</v-btn>
            </v-form>

        </v-card>

        <modal @create="(atr) => createModalAS = atr"></modal>
    </v-container>
</template>

<script setup>
    import {ref} from "vue";
    import axios from "axios";
    import config from "../config.json";
    import Modal from "./modal.vue";

    //no me deja hacerlo con un objeto
    var createModalAS = ref();
    var tvTitle = ref();
    var tvYear = ref();
    var tvCountry = ref();
    var tvSeasons = ref();
    var tvGenre = ref();
    var tvSummary = ref();

    async function registerTVShow(){
        let promise = await axios.post(config.host + config.api + config.registerTVShow,{
        //let promise = await axios.post("http://localhost:3000/api/tvshows",{
            title:tvTitle.value,
            year:tvYear.value,
            seasons:tvSeasons.value,
            summary:tvSummary.value,
            country: tvCountry.value
        })
        .then(function (response){
            console.log("exito");
            console.log(response.data.message);
            createModalAS.value("Success","succesfully added tvshow: " + tvTitle.value,"",true);
            tvTitle.value = tvYear.value = tvCountry.value = tvSeasons.value = tvSummary.value = undefined;
        })
        .catch(function(error){
            if(error.response){
                createModalAS.value("Error","",error.response.data.message,false);
            }else if(error.request){
                createModalAS.value("Error","Request error","An error ocurred while trying to connect to the database",false);
            }else{
                createModalAS.value("Error","unknown error","",false);
            }
        })
    }
</script>