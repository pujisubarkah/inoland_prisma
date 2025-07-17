<!-- pages/referensi/tuxedovation.vue -->
<template>
  <div>
    <Tuxedovation />
  </div>
</template>

<script setup>
import Tuxedovation from '~/components/Tuxedovation.vue'

// Use the referensi layout
definePageMeta({
  layout: 'referensi'
})

// Meta
useHead({
  title: 'Tuxedovation | INOLAND',
  meta: [
    {
      name: 'description',
      content: 'Platform inovasi Kementerian Dalam Negeri'
    },
    {
      property: 'og:title',
      content: 'Tuxedovation | INOLAND'
    },
    {
      property: 'og:description',
      content: 'Platform inovasi Kementerian Dalam Negeri'
    }
  ]
})
</script>
