<!-- pages/referensi/direktori.vue -->
<template>
  <div>
    <Direktori />
  </div>
</template>

<script setup>
import Direktori from '~/components/Direktori.vue'

// Use the referensi layout
definePageMeta({
  layout: 'referensi'
})

// Meta
useHead({
  title: 'Direktori Inovasi | INOLAND',
  meta: [
    {
      name: 'description',
      content: 'Kumpulan dokumen dan direktori inovasi daerah di Indonesia'
    },
    {
      property: 'og:title',
      content: 'Direktori Inovasi | INOLAND'
    },
    {
      property: 'og:description',
      content: 'Kumpulan dokumen dan direktori inovasi daerah di Indonesia'
    }
  ]
})
</script>
