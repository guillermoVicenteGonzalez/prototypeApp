<template>
    <v-dialog
    class="text-justify"
    width="500"
    v-model="triggerTVShowModal"
    :persistent="updateActive">
        <v-card
        class="text-center"
        v-if="!updateActive"
        :title="currentShow.title"
        :subtitle="currentShow.year + ' ' + currentShow.country">
            <v-img
            lazy-src="https://picsum.photos/id/11/10/6"
            :src=currentShow.poster>
            </v-img>

            <v-card-text>{{currentShow.summary}}</v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="d-flex justify-center">
                <v-btn
                @click="triggerUpdate">update</v-btn>
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
            ></v-text-field>

            <v-text-field
                variant="outlined"
                class="mx-10 my-2"
                label="country"
                color="primary"
                :placeholder="currentShow.country"
                v-model="updatedShow.country"
            ></v-text-field>

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

</template>
<script setup>
    import axios from "axios"
    import {ref} from "vue";
    import config from "../config.json"

    const emit = defineEmits(['refresh']);

    var currentShow = ref({
        title:undefined,
        year:undefined,
        country:undefined,
        seasons:undefined,
        summary:undefined,
        poster:undefined,
        id:undefined
    });

    var updatedShow = ref({
        title:undefined,
        year:undefined,
        country:undefined,
        seasons:undefined,
        summary:undefined,
        poster:undefined,
        id:undefined
    })

    var updateActive =ref(false);
    var triggerTVShowModal = ref(false);


    const create = function(item){
        triggerTVShowModal.value = true;
        currentShow.value.title = item.title;
        currentShow.value.year = item.year;
        currentShow.value.country = item.country;
        currentShow.value.summary = item.summary;
        currentShow.value.poster = item.poster;
        currentShow.value.id = item._id;
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
        console.log(array.id);
        let promise = await axios
        .put(config.host + config.api + config.updateTVShow + array.id, array)
        .then( ()=>{
            emit('refresh');
            triggerTVShowModal.value=false;
            for(const i in updatedShow.value){
                updatedShow.value[i] = undefined;
                console.log(updatedShow.value[i]);
            }
        })
        //aqui falta verificacion

        //updateActive.value=false;
    }

    function deleteTVShow(){

    }

    function cancelUpdate(){

        updateActive.value = false;
    }
    defineExpose({create});

</script>