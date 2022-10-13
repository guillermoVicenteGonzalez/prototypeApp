<template>
        <v-menu>
      <template v-slot:activaor="{on,attrs}">
        <v-btn
        v-bind="attrs"
        v-on="on">
          dropdown
        </v-btn>
      </template>
      <v-list>
        <v-list-item>hola</v-list-item>
      </v-list>
    </v-menu>
</template>

<script>
    export default {
      data: () => ({
        items: [
          { title: 'Click Me' },
          { title: 'Click Me' },
          { title: 'Click Me' },
          { title: 'Click Me 2' },
        ],
      }),
    }
  </script>