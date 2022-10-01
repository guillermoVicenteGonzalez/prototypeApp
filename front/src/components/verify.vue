<template>
        <v-dialog
        class="text-center"
        width="500"
        persistent
        v-model="triggerVerify">
            <v-card class="text-center"
            :title="verifyTextParams.title"
            :subtitle="verifyTextParams.subtitle"
            :text="verifyTextParams.text">
                <v-divider></v-divider>
                <v-card-actions
                class="d-flex justify-center">
                    <v-btn
                    color="success"
                    @click="emit('acceptVerify')">confirm</v-btn>

                    <v-btn
                    color="error"
                    @click="emit('cancelVerify')">cancel</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
</template>

<script setup>
    //el trigger verify hay que convertirlo a prop y acceder desde app.
    import {ref} from "vue"

    var triggerVerify = ref();
    var verifyTextParams = ref({
        title:undefined,
        subtitle:undefined,
        text:undefined
    })

    const emit = defineEmits(['cancelVerify','acceptVerify']);

    function createVerify(title, subtitle, text){
        triggerVerify.value = true;
        verifyTextParams.value.title =  title;
        verifyTextParams.value.subtitle = subtitle;
        verifyTextParams.value.text = text;
    }

    function deleteVerify(){
        triggerVerify.value = false;
    }

    defineExpose({createVerify, deleteVerify});
</script>