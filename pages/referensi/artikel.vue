<!-- pages/referensi/artikel.vue -->
<template>
  <div>
    <Artikel />
  </div>
</template>

<script setup>
import Artikel from '~/components/Artikel.vue'

// Use the referensi layout
definePageMeta({
  layout: 'referensi'
})

// Meta
useHead({
  title: 'Artikel Lab Inovasi | INOLAND',
  meta: [
    {
      name: 'description',
      content: 'Artikel terkait Lab Inovasi dan pengembangan inovasi daerah'
    },
    {
      property: 'og:title',
      content: 'Artikel Lab Inovasi | INOLAND'
    },
    {
      property: 'og:description',
      content: 'Artikel terkait Lab Inovasi dan pengembangan inovasi daerah'
    }
  ]
})
</script>
