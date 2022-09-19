<template>
    <v-container>
        <v-card>
            <h1 class="text-center">Registrar pelicula</h1>
            <v-form>
                <v-text-field
                variant="outlined"
                class="mx-10 my-2"
                label="titulo"></v-text-field>

            </v-form>

        </v-card>
    </v-container>
</template>

<script>
    import {ref} from "vue";
/*
    var tvshow = ref({
        title:"pelicula",
        year:undefined,
        country:undefined,
        seasons:undefined,
        genre:undefined
    });*/

    async function registerTVShow(){

    }

    function showTVShow(){
        console.log(tvshow.value.title);
    }
</script>