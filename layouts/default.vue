
<template>
  <div class="font-poppins min-h-screen flex flex-col">
    <!-- <Maintenance /> -->
    <!-- Maintenance mode disabled -->
    <Navbar />
    <main class="flex-1">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from '~/components/Navbar.vue'
import Footer from '~/components/Footer.vue'
// import Maintenance from '~/components/Maintenance.vue'
// Maintenance mode disabled
</script>

<style scoped>
.font-poppins {
  font-family: 'Poppins', sans-serif;
}
</style>