<style>
    .myImage{
        max-width: 100%;
        max-height: 100%;
        object-fit: cover;
        overflow: hidden;
    }
</style>

<template>
    <v-form
    @submit.prevent="searchTVShow">
        <v-text-field
        variant="outlined"
        class="mx-10 my-10"
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
        width="300"
        height="200"
        @click="tvshowModal.create(item,item._id)">
            <v-img
                cover
                lazy-src="http://www.tea-tron.com/antorodriguez/blog/wp-content/uploads/2016/04/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png"
                :src=item.poster>
            </v-img>
        </v-card>
    </v-container>

    <modal ref="collectionModal"></modal>
    <loading v-model="triggerLoadgin_Col"></loading>
    <tvshow-modal ref="tvshowModal"
    @refresh="getAllTVShows"></tvshow-modal>

</template>

<script setup>
    import axios from "axios";
    import {ref} from "vue";
    import config from "../config.json";
    import modal from "../components/modal.vue";
    import Loading from "./loading.vue";
    import TvshowModal from "./tvshowModal.vue";

    var tvshowModal = ref();
    const array = ref([]);
    const message = ref();
    var collectionModal = ref();
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
                console.log(response.data.tvshow);
            })
            .catch(function(error){
                triggerLoadgin_Col.value = false;
                if(error.response){
                    console.log(error.response.data);
                    collectionModal.value.createDialog("Error","",error.response.data.message);
                }else if(error.request){
                    collectionModal.value.createDialog("Error","Request error","An error ocurred while trying to connect with the database. Please try again later");
                    console.log(error.request);
                }else if(error != undefined){
                    collectionModal.value.createDialog("Error","unknown error","",false);
                    console.log("unknown error");
                }
            });
        }
    }

    function createShowCard(){
        tvshowModal.value.create();
    }
    getAllTVShows();
</script>