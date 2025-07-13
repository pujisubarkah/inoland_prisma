<!-- app.vue -->
<template>
  <NuxtLayout>
    <NuxtPage />
    <Toaster position="top-center" richColors />
  </NuxtLayout>
</template>

<script setup>
import { Toaster, toast } from 'vue-sonner'
</script>
