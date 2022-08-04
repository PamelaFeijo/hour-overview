<template>
  <HourOverview />
</template>

<script lang="ts">
  import Vue from 'vue'
  import HourOverview from '../views/HourOverview.vue'

  export default Vue.extend({
    name: 'Home',

    components: {
      HourOverview,
    },
  })
</script>
