<template>
    <v-dialog
    v-model="triggerTVShowModal">
        <v-card>
            <v-card-title>This will be a card with the full show info.</v-card-title>
        </v-card>
    </v-dialog>
</template>

<script setup>
    import {ref} from "vue";

    var triggerTVShowModal = ref(false);

    const create = function(){
        triggerTVShowModal.value = true;
    }

    defineExpose({create});

</script>