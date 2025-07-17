<!-- pages/referensi/berita.vue -->
<template>
  <div>
    <Berita />
  </div>
</template>

<script setup>
import Berita from '~/components/Berita.vue'

// Use the referensi layout
definePageMeta({
  layout: 'referensi'
})

// Meta
useHead({
  title: 'Berita Inovasi | INOLAND',
  meta: [
    {
      name: 'description',
      content: 'Berita terkini seputar inovasi daerah di Indonesia'
    },
    {
      property: 'og:title',
      content: 'Berita Inovasi | INOLAND'
    },
    {
      property: 'og:description',
      content: 'Berita terkini seputar inovasi daerah di Indonesia'
    }
  ]
})
</script>
