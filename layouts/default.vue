
<template>
  <div class="font-poppins min-h-screen flex flex-col">
    <Maintenance />
  </div>
</template>

<script setup>
import Maintenance from '~/components/Maintenance.vue'
// Components akan auto-import di Nuxt 3
</script>

<style scoped>
.font-poppins {
  font-family: 'Poppins', sans-serif;
}
</style>