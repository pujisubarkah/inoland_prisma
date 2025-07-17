<!-- pages/referensi/inovasilan.vue -->
<template>
  <div>
    <InovasiLAN />
  </div>
</template>

<script setup>
import InovasiLAN from '~/components/inovasiLAN.vue'

// Use the referensi layout
definePageMeta({
  layout: 'referensi'
})

// Meta
useHead({
  title: 'List Inovasi LAN | INOLAND',
  meta: [
    {
      name: 'description',
      content: 'Daftar lengkap inovasi dari seluruh Indonesia yang terdaftar di LAN'
    },
    {
      property: 'og:title',
      content: 'List Inovasi LAN | INOLAND'
    },
    {
      property: 'og:description',
      content: 'Daftar lengkap inovasi dari seluruh Indonesia yang terdaftar di LAN'
    }
  ]
})
</script>
