<template>
<v-navigation-drawer
      absolute
      bottom
      temporary>
        <v-list>
            <v-list-item>
              <v-btn
              block
              depressed
              @click="this.$router.push('/')"
              prepend-icon="mdi-home">Home</v-btn>
            </v-list-item>

            <v-list-item>
              <v-btn
              block
              depressed
              @click="this.$router.push('/showCollection')"
              prepend-icon="mdi-magnify"
              color>tvshows</v-btn>
            </v-list-item>

            <v-list-item>
              <v-btn
              block
              depressed
              @click="this.$router.push('/addshow')"
              prepend-icon="mdi-plus-box">Add tvshow</v-btn>
            </v-list-item>


            <v-list-item>
              <v-btn
              block
              depressed
              prepend-icon="mdi-delete">delete show</v-btn>
            </v-list-item>
        </v-list>
      </v-navigation-drawer>
</template>

<script setup>
      import router from "../router/index.js"
</script>