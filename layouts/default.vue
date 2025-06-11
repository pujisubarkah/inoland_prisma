<template>
  <div class="font-poppins min-h-screen flex flex-col">
    <!-- Navbar Component -->
    <Navbar />

    <!-- Main Content -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Footer Component -->
    <Footer />
  </div>
</template>

<script setup>
// Components akan auto-import di Nuxt 3
</script>

<style scoped>
.font-poppins {
  font-family: 'Poppins', sans-serif;
}
</style>