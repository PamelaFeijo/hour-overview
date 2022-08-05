<template>
  <v-app>
    <v-app-bar app color="orange darken-3" dark>
      <v-img
        src="./assets/__footerlogo__Bolder┬« logo WHITE - Cropped - No text.png"
        position="left center"
        contain
        max-width="20%"
        height="70"
        class="p-2 ml-7"
      ></v-img>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',
});
</script>
