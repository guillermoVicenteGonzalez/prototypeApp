<style>
    .myContainer{
        display: flex;
        align-items: center;
        justify-content: center;
        justify-items: center;
        height: 100%;
    }

    #notFound{
        font-size: 100px;
        color: #df6b6b;
    }
</style>

<template>
    <div class="myContainer">
        <div>
            <h1 id="notFound">Not found</h1>
            <h2>The resource you requested does not exist. 
            <br> Click the button to go back to the home page</h2>
            <v-divider
            color="error"></v-divider>
            <br>
            <v-btn
            variant="outlined" 
            color="primary"
            @click="this.$router.push('/')"
            >Home</v-btn>
        </div>
    </div>



</template>