<!-- pages/referensi/index.vue -->
<template>
  <!-- Welcome Message -->
  <div class="text-center py-20">
    <h1 class="text-4xl font-bold text-gray-800 mb-4">
      Referensi Inovasi
    </h1>
    <p class="text-lg text-gray-600 mb-8">
      Kumpulan referensi dan sumber daya inovasi terlengkap dari berbagai daerah di Indonesia
    </p>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
      <div 
        v-for="item in menuItems" 
        :key="item.route"
        class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
      >
        <div class="flex items-center mb-4">
          <component :is="item.icon" class="w-8 h-8 text-emerald-600 mr-3" />
          <h3 class="text-lg font-semibold text-gray-800">{{ item.label }}</h3>
        </div>
        <p class="text-gray-600 mb-4">{{ item.description }}</p>
        <NuxtLink 
          :to="item.route"
          class="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium"
        >
          Lihat {{ item.label }}
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
// Define layout
definePageMeta({
  layout: 'referensi'
})

// Icon Components
const TableIcon = {
  template: `
    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M5 4a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001-1V5a1 1 0 00-1-1H5zM4 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V5a3 3 0 00-3-3H4zm2 4a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm0 3a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm0 3a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z" clip-rule="evenodd"/>
    </svg>
  `
}

const NewsIcon = {
  template: `
    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clip-rule="evenodd"/>
      <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"/>
    </svg>
  `
}

const ChartIcon = {
  template: `
    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"/>
      <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"/>
    </svg>
  `
}

const VideoIcon = {
  template: `
    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v9a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-9zm4 0a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v9a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-9z" clip-rule="evenodd"/>
    </svg>
  `
}

const TuxedovationIcon = {
  template: `
    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM6.5 7a1.5 1.5 0 113 0v1.5h1V7a2.5 2.5 0 00-5 0v1.5h1V7zm3.5 6a1.5 1.5 0 11-3 0v-1h3v1z"/>
    </svg>
  `
}

// Meta
useHead({
  title: 'Referensi Inovasi | INOLAND',
  meta: [
    {
      name: 'description',
      content: 'Kumpulan referensi dan sumber daya inovasi terlengkap dari berbagai daerah di Indonesia'
    },
    {
      property: 'og:title',
      content: 'Referensi Inovasi | INOLAND'
    },
    {
      property: 'og:description',
      content: 'Kumpulan referensi dan sumber daya inovasi terlengkap dari berbagai daerah di Indonesia'
    },
    {
      property: 'og:type',
      content: 'website'
    }
  ]
})

// Menu items configuration
const menuItems = [
  { 
    label: 'Artikel', 
    icon: NewsIcon, 
    route: '/referensi/artikel',
    description: 'Artikel terkait Lab Inovasi dan pengembangan inovasi daerah'
  },
  { 
    label: 'List Inovasi', 
    icon: TableIcon, 
    route: '/referensi/inovasi',
    description: 'Daftar lengkap inovasi dari seluruh Indonesia'
  },
  { 
    label: 'Berita Inovasi', 
    icon: NewsIcon, 
    route: '/referensi/berita',
    description: 'Berita terkini seputar inovasi daerah'
  },
  { 
    label: 'Infografis Inovasi', 
    icon: ChartIcon, 
    route: '/referensi/infografis',
    description: 'Visualisasi data dan informasi inovasi'
  },
  { 
    label: 'Proyek Perubahan', 
    icon: VideoIcon, 
    route: '/referensi/properexpo',
    description: 'Dokumentasi proyek perubahan inovatif'
  },
  { 
    label: 'Tuxedovation', 
    icon: TuxedovationIcon, 
    route: '/referensi/tuxedovation',
    description: 'Platform inovasi Kementerian Dalam Negeri'
  },  { 
    label: 'Direktori Inovasi', 
    icon: TableIcon, 
    route: '/referensi/direktori',
    description: 'Kumpulan dokumen dan direktori inovasi daerah'
  }
]
</script>
