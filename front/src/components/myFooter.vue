<template>
    <v-btn
    icon
    color="purple"
    @click="goToGithub">
        <v-icon
        color="black">mdi-github</v-icon>
    </v-btn>


</template>

<script setup>
    import router from "../router/index.js"

    function goToGithub(){
        window.open("https://github.com/guillermoVicenteGonzalez/prototypeApp");
    }
</script>
