<!-- pages/referensi/infografis.vue -->
<template>
  <div>
    <Infografis />
  </div>
</template>

<script setup>
import Infografis from '~/components/Infografis.vue'

// Use the referensi layout
definePageMeta({
  layout: 'referensi'
})

// Meta
useHead({
  title: 'Infografis Inovasi | INOLAND',
  meta: [
    {
      name: 'description',
      content: 'Visualisasi data dan informasi inovasi daerah di Indonesia'
    },
    {
      property: 'og:title',
      content: 'Infografis Inovasi | INOLAND'
    },
    {
      property: 'og:description',
      content: 'Visualisasi data dan informasi inovasi daerah di Indonesia'
    }
  ]
})
</script>
