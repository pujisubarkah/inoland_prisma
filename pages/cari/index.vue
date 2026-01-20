<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <div class="bg-gradient-to-br from-blue-600 to-purple-700 text-white">
      <div class="container mx-auto px-8 py-16">
        <div class="text-center">
          <h1 class="text-5xl font-bold mb-6">
            Cari Inovasi Daerah
          </h1>
          <p class="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Temukan dan jelajahi berbagai inovasi daerah di seluruh Indonesia melalui peta interaktif, 
            daftar lengkap, dan dashboard analitik yang komprehensif.
          </p>
        </div>
      </div>
    </div>

    <!-- Navigation Cards -->
    <div class="container mx-auto px-8 py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Sebaran Inovasi Card -->
        <NuxtLink 
          to="/cari/maps_inovasi"
          class="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
        >
          <div class="p-8">
            <div class="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-purple-200 transition-colors">
              <svg class="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-3">Sebaran Inovasi</h3>
            <p class="text-gray-600 mb-4">
              Lihat peta interaktif sebaran inovasi di seluruh Indonesia dengan visualisasi yang menarik.
            </p>
            <div class="flex items-center text-purple-600 font-semibold group-hover:text-purple-700">
              Jelajahi Peta
              <svg class="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"/>
              </svg>
            </div>
          </div>
        </NuxtLink>

        <!-- Daftar Inovasi Card -->
        <NuxtLink 
          to="/cari/list_inovasi"
          class="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
        >
          <div class="p-8">
            <div class="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
              <svg class="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 16a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"/>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-3">Daftar Inovasi</h3>
            <p class="text-gray-600 mb-4">
              Telusuri daftar lengkap inovasi dengan fitur pencarian dan filter yang canggih.
            </p>
            <div class="flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
              Lihat Daftar
              <svg class="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"/>
              </svg>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>

    <!-- Features Section -->
    <div class="bg-white py-16">
      <div class="container mx-auto px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Fitur Unggulan</h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Platform ini menyediakan berbagai fitur untuk membantu Anda menemukan dan menganalisis inovasi daerah
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">Pencarian Cepat</h3>
            <p class="text-gray-600 text-sm">Temukan inovasi dengan pencarian yang cepat dan akurat</p>
          </div>

          <div class="text-center">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 16a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"/>
              </svg>
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">Filter Lanjutan</h3>
            <p class="text-gray-600 text-sm">Saring data berdasarkan kategori, wilayah, dan kriteria lainnya</p>
          </div>

          <div class="text-center">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"/>
              </svg>
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">Visualisasi Data</h3>
            <p class="text-gray-600 text-sm">Grafik dan chart interaktif untuk analisis yang mendalam</p>
          </div>

          <div class="text-center">
            <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"/>
                <path d="M3 8a2 2 0 012-2v9a2 2 0 01-2-2V8zM18 8a2 2 0 00-2-2v9a2 2 0 002-2V8z"/>
              </svg>
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">Export Data</h3>
            <p class="text-gray-600 text-sm">Unduh data dalam berbagai format untuk keperluan analisis</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Set page title and meta description
useHead({
  title: 'Temukan Inovasi | INOLAND',
  meta: [
    {
      name: 'description',
      content: 'Temukan dan jelajahi berbagai inovasi daerah di seluruh Indonesia melalui peta interaktif, daftar lengkap, dan dashboard analitik yang komprehensif.'
    },
    {
      property: 'og:title',
      content: 'Temukan Inovasi | INOLAND'
    },
    {
      property: 'og:description',
      content: 'Temukan dan jelajahi berbagai inovasi daerah di seluruh Indonesia melalui peta interaktif, daftar lengkap, dan dashboard analitik yang komprehensif.'
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      name: 'twitter:title',
      content: 'Temukan Inovasi | INOLAND'
    },
    {
      name: 'twitter:description',
      content: 'Temukan dan jelajahi berbagai inovasi daerah di seluruh Indonesia melalui peta interaktif, daftar lengkap, dan dashboard analitik yang komprehensif.'
    }
  ]
})
</script>

<style scoped>
/* Custom styles jika diperlukan */
</style>
