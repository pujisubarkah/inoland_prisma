<!-- app.vue -->
<template>
  <NuxtLayout>
    <NuxtPage />
      <Toaster position="top-center" richColors offset="80px" />
  </NuxtLayout>
</template>

<script setup>
import { Toaster, toast } from 'vue-sonner'
</script>
