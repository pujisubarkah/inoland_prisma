<!-- pages/referensi/index.vue -->
<template>
  <!-- Welcome Message -->
  <div class="text-center py-8 sm:py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
    <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
      Referensi Inovasi
    </h1>
    <p class="text-sm sm:text-base lg:text-lg text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
      Kumpulan referensi dan sumber daya inovasi terlengkap dari berbagai daerah di Indonesia
    </p>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
      <div 
        v-for="item in menuItems" 
        :key="item.route"
        class="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105 border border-gray-100"
      >        <div class="flex items-center mb-3 sm:mb-4">
          <div class="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-emerald-50 rounded-lg flex items-center justify-center mr-3 sm:mr-4">
            <!-- Table Icon -->
            <svg v-if="item.icon === 'table'" class="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5 4a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001-1V5a1 1 0 00-1-1H5zM4 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V5a3 3 0 00-3-3H4zm2 4a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm0 3a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm0 3a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z" clip-rule="evenodd"/>
            </svg>
            <!-- News Icon -->
            <svg v-else-if="item.icon === 'news'" class="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clip-rule="evenodd"/>
              <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"/>
            </svg>
            <!-- Chart Icon -->
            <svg v-else-if="item.icon === 'chart'" class="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"/>
              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"/>
            </svg>
            <!-- Video Icon -->
            <svg v-else-if="item.icon === 'video'" class="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v9a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-9zm4 0a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v9a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-9z" clip-rule="evenodd"/>
            </svg>
            <!-- Tuxedovation Icon -->
            <svg v-else-if="item.icon === 'tuxedovation'" class="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM6.5 7a1.5 1.5 0 113 0v1.5h1V7a2.5 2.5 0 00-5 0v1.5h1V7zm3.5 6a1.5 1.5 0 11-3 0v-1h3v1z"/>
            </svg>
            <!-- Default Icon -->
            <svg v-else class="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
            </svg>
          </div>
          <h3 class="text-base sm:text-lg font-semibold text-gray-800 leading-tight">{{ item.label }}</h3>
        </div>
        <p class="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed line-clamp-3">{{ item.description }}</p>
        <NuxtLink 
          :to="item.route"
          class="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium text-sm sm:text-base transition-colors duration-200 min-h-[44px] sm:min-h-0"
        >          Lihat {{ item.label }}
          <svg class="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    icon: 'news', 
    route: '/referensi/artikel',
    description: 'Artikel terkait Lab Inovasi dan pengembangan inovasi daerah'
  },
  { 
    label: 'List Inovasi', 
    icon: 'table', 
    route: '/referensi/inovasi',
    description: 'Daftar lengkap inovasi dari seluruh Indonesia'
  },
  { 
    label: 'Berita Inovasi', 
    icon: 'news', 
    route: '/referensi/berita',
    description: 'Berita terkini seputar inovasi daerah'
  },
  { 
    label: 'Infografis Inovasi', 
    icon: 'chart', 
    route: '/referensi/infografis',
    description: 'Visualisasi data dan informasi inovasi'
  },
  { 
    label: 'Proyek Perubahan', 
    icon: 'video', 
    route: '/referensi/properexpo',
    description: 'Dokumentasi proyek perubahan inovatif'
  },
  { 
    label: 'Tuxedovation', 
    icon: 'tuxedovation', 
    route: '/referensi/tuxedovation',
    description: 'Platform inovasi Kementerian Dalam Negeri'
  },
  { 
    label: 'Direktori Inovasi', 
    icon: 'table', 
    route: '/referensi/direktori',
    description: 'Kumpulan dokumen dan direktori inovasi daerah'
  }
]
</script>

<style scoped>
/* Line clamp utility for description text */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Touch targets for mobile */
@media (max-width: 767px) {
  .min-h-\[44px\] {
    min-height: 44px;
    display: flex;
    align-items: center;
    touch-action: manipulation;
  }
}

/* Card hover effects */
.hover\:transform:hover {
  transform: translateY(-2px);
}

/* Smooth transitions */
* {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
