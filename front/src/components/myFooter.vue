<template>
    <v-btn
    icon
    color="#df6b6b"
    @click="goToGithub">
        <v-icon
        color="white">mdi-github</v-icon>
    </v-btn>


</template>

<script setup>
    import router from "../router/index.js"

    function goToGithub(){
        window.open("https://github.com/guillermoVicenteGonzalez/prototypeApp");
    }
</script>
