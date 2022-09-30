<template>
    <v-dialog
    class="text-justify"
    width="500"
    v-model="triggerTVShowModal"
    :persistent="updateActive">
        <v-card
        v-if="!updateActive"
        :title="currentShowTitle"
        :subtitle="currentShowYear + ' ' + currentShowCountry">
            <v-img
            lazy-src="https://picsum.photos/id/11/10/6"
            :src=currentShowPoster>
            </v-img>

            <v-card-text>{{currentShowSummary + '\n' + currentShowSummary}}</v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
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
                :value="currentShowTitle"
            ></v-text-field>

            <v-text-field
                variant="outlined"
                class="mx-10 my-2"
                label="year"
                color="primary"
                type="number"
                :value="currentShowYear"
            ></v-text-field>

            <v-text-field
                variant="outlined"
                class="mx-10 my-2"
                label="country"
                color="primary"
                :value="currentShowCountry"
            ></v-text-field>

            <v-text-field
                variant="outlined"
                class="mx-10 my-2"
                label="seasons"
                color="primary"
                :value="currentShowSeasons"
            ></v-text-field>

            <v-text-field
                variant="outlined"
                class="mx-10 my-2"
                label="summary"
                color="primary"
                :value="currentShowSummary"
            ></v-text-field>

            <v-text-field
                variant="outlined"
                class="mx-10 my-2"
                label="poster"
                color="primary"
                :value="currentShowPoster"
            ></v-text-field>
        
            <v-divider></v-divider>
            <v-card-actions class="justify-center">
                <v-btn
                color="success">confirm</v-btn>

                <v-btn
                color="error"
                @click="cancelUpdate">cancel</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

</template>
<script setup>
    import {ref} from "vue";

    var updateActive =ref(false);
    var triggerTVShowModal = ref(false);
    var currentShowTitle = ref();
    var currentShowSummary = ref();
    var currentShowCountry = ref();
    var currentShowYear = ref();
    var currentShowPoster = ref();

    const create = function(title, year, country, summary, poster){
        triggerTVShowModal.value = true;
        currentShowTitle.value = title;
        currentShowYear.value = year;
        currentShowCountry.value = country;
        currentShowSummary.value = summary;
        currentShowPoster.value = poster;
    }

    function triggerUpdate(){
        updateActive.value=true;
    }

    function confirmUpdate(){

    }

    function cancelUpdate(){
        updateActive.value = false;
    }
    defineExpose({create});

</script>