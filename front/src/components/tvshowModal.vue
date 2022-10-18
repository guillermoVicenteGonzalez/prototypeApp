<template>
    <v-dialog
    class="text-justify"
    width="700"
    v-model="triggerTVShowModal"
    :persistent="updateActive">
        <v-card

        class="text-center"
        v-if="!updateActive"
        :title="currentShow.title"
        :subtitle="currentShow.year + ' ' + currentShow.country">
            <v-img
            cover="true"
            lazy-src="http://www.tea-tron.com/antorodriguez/blog/wp-content/uploads/2016/04/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png"
            :src=currentShow.poster>
            </v-img>

            <v-card-text>{{currentShow.summary}}</v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="d-flex justify-center">
                <v-btn
                color="primary"
                @click="triggerUpdate">update</v-btn>

                <v-btn
                color="error"
                @click="triggerVerifyUTVS.createVerify('Delete',currentShow.title,'are you sure you want to delete ' + currentShow.title)">delete</v-btn>
            </v-card-actions>
        </v-card>

        <v-card    
        class="text-center"
        v-if="updateActive">
            <v-card-title>Update tvshow</v-card-title>
            <v-text-field
                variant="outlined"
                class="mx-10 my-2"
                label="title"
                color="primary"
                :placeholder="currentShow.title"
                v-model="updatedShow.title"
            ></v-text-field>

            <v-text-field
                variant="outlined"
                class="mx-10 my-2"
                label="year"
                color="primary"
                type="number"
                :placeholder="currentShow.year"
                v-model="updatedShow.year"
                min="1900" max="2099" placeholder="YYYY" :value="tvYear"
            ></v-text-field>

            <v-select
                class="mx-10 my-2"
                variant="outlined"
                label="Country"
                :items="items"
                v-model="tvCountry"> 
            </v-select>

            <country-select 
                v-model="updatedShow.country" 
                :country="updatedShow.country" 
                topCountry="US" 
                class="mx-10 my-2 customCountrySelector">
            </country-select>

            <v-select
                class="mx-10 my-2"
                variant="outlined"
                label="Genre"
                :items="genres"
                v-model="updatedShow.genre"> 
            </v-select>

            <v-text-field
                variant="outlined"
                class="mx-10 my-2"
                label="seasons"
                color="primary"
                :placeholder="currentShow.seasons"
                v-model="updatedShow.seasons"
            ></v-text-field>

            <v-text-field
                variant="outlined"
                class="mx-10 my-2"
                label="summary"
                color="primary"
                :placeholder="currentShow.summary"
                v-model="updatedShow.summary"
            ></v-text-field>

            <v-text-field
                variant="outlined"
                class="mx-10 my-2"
                label="poster"
                color="primary"
                :placeholder="currentShow.poster"
                v-model="updatedShow.poster"
            ></v-text-field>
        
            <v-divider></v-divider>
            <v-card-actions class="justify-center">
                <v-btn
                color="success"
                @click="confirmUpdate">confirm</v-btn>

                <v-btn
                color="error"
                @click="cancelUpdate">cancel</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <loading
    v-model="triggerLoading"></loading>

    <modal ref="errorModal"></modal>

    <verify ref="triggerVerifyUTVS"
    @accept-verify="deleteTVShow"
    @cancel-verify="cancelDelete"></verify>

</template>
<script setup>
    import axios from "axios"
    import {ref} from "vue";
    import config from "../config.json"
    import loading from"../components/loading.vue"
    import Modal from "./modal.vue";
    import Verify from "./verify.vue";

    const emit = defineEmits(['refresh']);

    var genres = ref(['Drama', 'Fantasy', 'Sci-Fi', 'Thriller', 'Comedy']);
    var items = ref(['ES','UK','USA']);
    var errorModal = ref();
    var triggerVerifyUTVS = ref();
    var triggerLoading = ref();
    var currentShow = ref({
        title:undefined,
        year:undefined,
        country:undefined,
        seasons:undefined,
        summary:undefined,
        poster:undefined,
        genre:undefined,
        id:undefined
    });

    var updatedShow = ref({
        title:undefined,
        year:undefined,
        country:undefined,
        seasons:undefined,
        summary:undefined,
        poster:undefined,
        genre:undefined,
        id:undefined
    })

    var updateActive =ref(false);
    var triggerTVShowModal = ref(false);


    const create = function(item){
        console.log(item.genre);
        triggerTVShowModal.value = true;
        currentShow.value.title = item.title;
        currentShow.value.year = item.year;
        currentShow.value.country = item.country;
        currentShow.value.summary = item.summary;
        currentShow.value.poster = item.poster;
        currentShow.value.id = item._id;
        currentShow.value.seasons = item.seasons;
        currentShow.value.genre = item.genre;

        //if i use currentShow as model it messes up the card and overrides its fields
        //updatedShow.value.title = currentShow.value.title;
        for(const item in currentShow.value){
            updatedShow.value[item] = currentShow.value[item];
            console.log(item + ": " + updatedShow.value[item]);
        }

        console.log(updatedShow.value);
    }

    function triggerUpdate(){
        updateActive.value=true;
    }

    async function confirmUpdate(){
        let array = {
            title:undefined,
            year:undefined,
            country:undefined,
            seasons:undefined,
            summary:undefined,
            poster:undefined,
            id:undefined
        }

        for(const i in array){
            currentShow
            if(updatedShow.value[i] == undefined){
                array[i] = currentShow.value[i];
            }else{
                array[i] = updatedShow.value[i];
            }
        }
        triggerLoading.value=true;
        let promise = await axios
        .put(config.host + config.api + config.updateTVShow + array.id, array)
        .then( ()=>{
            emit('refresh');
            for(const i in updatedShow.value){
                updatedShow.value[i] = undefined;
                console.log(updatedShow.value[i]);
            }
            triggerLoading.value=false;
            triggerTVShowModal.value=false;
        })
        .catch(function(error){
            errorModal.value.createDialog("Error updating tvshow","There was an error while trying to update the tvshow",error.response.data.message,false);
            emit('refresh');
            triggerTVShowModal.value = false;
        })
        //aqui falta verificacion

        //updateActive.value=false;
    }

    async function deleteTVShow(){
        triggerVerifyUTVS.value.deleteVerify()
        triggerLoading.value = true;
        //deactivate confirm modal
        let deletePromise = await axios.delete(config.host + config.api + config.deleteTVShow + currentShow.value.id)
        .then(function (message){
            triggerLoading.value = false;
            emit('refresh');
            triggerTVShowModal.value=false;
        })
        .catch(function (error){
            triggerLoading.value = false;
            errorModal.value.createDialog("Error","Error deleting tvshow","ther was an unknown error while trying to delete the tvshow",false);
            triggerTVShowModal.value=false;
        });
    }

    function cancelDelete(){
        triggerVerifyUTVS.value.deleteVerify();
    }

    function cancelUpdate(){

        updateActive.value = false;
    }
    defineExpose({create});

</script>