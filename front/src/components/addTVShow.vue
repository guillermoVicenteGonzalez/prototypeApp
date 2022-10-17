<template>
    <v-container class="text-center d-flex justify-center">
        <v-card
            class=""
            width="700">
            <h1 class="text-center">Add tvshow</h1>
            <v-form>
                <v-text-field
                variant="outlined"
                class="mx-10 my-2"
                label="title"
                v-model="tvTitle"
                color="primary"></v-text-field>

                <v-text-field
                variant="outlined"
                class="mx-10 my-2"
                label="year"
                v-model="tvYear"
                color="primary"
                type="date"></v-text-field>

                <v-text-field
                variant="outlined"
                class="mx-10 my-2"
                label="seasons"
                v-model="tvSeasons"
                color="primary"
                type="number"></v-text-field>

                <v-select
                class="mx-10 my-2"
                variant="outlined"
                label="Country"
                :items="items"
                v-model="tvCountry">
                    
                </v-select>

                <v-text-field
                variant="outlined"
                class="mx-10 my-2"
                label="summary"
                v-model="tvSummary"
                color="primary"></v-text-field>

                
                <v-text-field
                variant="outlined"
                class="mx-10 my-2"
                label="poster route"
                v-model="tvPoster"
                color="primary"></v-text-field>

                <v-btn
                class="mb-5"
                @click="registerTVShow">register</v-btn>
            </v-form>

        </v-card>

        <modal ref="createModalAS"></modal>
        <loading
        v-model="triggerLoading_AS"></loading>
    </v-container>
</template>

<script setup>
    import {ref, inject} from "vue";
    import axios from "axios";
    import config from "../config.json";
    import Modal from "./modal.vue";
    import Loading from "./loading.vue";


    
    var items = ref(['ES','UK','USA']);
    var tvPoster = ref();
    var createModalAS = ref();
    var tvTitle = ref();
    var tvYear = ref();
    var tvCountry = ref();
    var tvSeasons = ref();
    var tvGenre = ref();
    var tvSummary = ref();
    var triggerLoading_AS = ref();
    const router = inject('router');

    async function registerTVShow(){
        triggerLoading_AS.value=true;
        let promise = await axios.post(config.host + config.api + config.registerTVShow,{
            title:tvTitle.value,
            year:tvYear.value,
            seasons:tvSeasons.value,
            summary:tvSummary.value,
            country: tvCountry.value,
            poster:tvPoster.value
        })
        .then(function (response){
            console.log("exito");
            console.log(response.data.message);
            triggerLoading_AS.value=false;
            createModalAS.value.createDialog("Success","succesfully added tvshow: " + tvTitle.value,"",true);
            tvTitle.value = tvYear.value = tvCountry.value = tvSeasons.value = tvSummary.value = undefined;
            router.push('showCollection');
        })
        .catch(function(error){
            triggerLoading_AS.value=false;
            if(error.response.data){
                createModalAS.value.createDialog("Error","",error.response.data.message,false);
            }else if(error.request){
                createModalAS.value.createDialog("Error","Request error","An error ocurred while trying to connect to the database",false);
            }else{
                createModalAS.value.createDialog("Error","unknown error","",false);
            }
        })
        tvTitle.value = tvPoster.value = tvCountry.value = tvSummary.value = tvYear.value = tvSeasons.value = tvPoster.value = undefined;
    }
</script>