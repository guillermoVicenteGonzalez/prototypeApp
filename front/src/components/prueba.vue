<template>
    <h1 v-if="isModalActive">Hola buenas tardes</h1>
</template>

<script setup>
    import {ref} from "vue";

    const props = defineProps({
        isModalActive:Boolean,
    });

    const prueba = function prueba(){
        alert("funciona");
    }

    const emit = defineEmits(['prueba']);
    emit('prueba',prueba);
</script>