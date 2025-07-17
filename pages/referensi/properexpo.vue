<!-- pages/referensi/properexpo.vue -->
<template>
  <div>
    <ProperExpo />
  </div>
</template>

<script setup>
import ProperExpo from '~/components/Properexpo.vue'

// Use the referensi layout
definePageMeta({
  layout: 'referensi'
})

// Meta
useHead({
  title: 'Proyek Perubahan | INOLAND',
  meta: [
    {
      name: 'description',
      content: 'Dokumentasi proyek perubahan inovatif di seluruh Indonesia'
    },
    {
      property: 'og:title',
      content: 'Proyek Perubahan | INOLAND'
    },
    {
      property: 'og:description',
      content: 'Dokumentasi proyek perubahan inovatif di seluruh Indonesia'
    }
  ]
})
</script>
