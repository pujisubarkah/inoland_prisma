<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Sidebar -->
    <div class="w-64 bg-gray-800 text-white min-h-screen">
      <div class="p-6">
        <h2 class="text-xl font-bold mb-6">Cari Inovasi</h2>
        <nav class="space-y-2">
          <NuxtLink
            to="/cari/maps_inovasi"
            class="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors"
            :class="{ 'bg-gray-700 text-white': $route.path === '/cari/maps_inovasi' }"
          >
            <svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
            </svg>
            Sebaran Inovasi
          </NuxtLink>
          <NuxtLink
            to="/cari/list_inovasi"
            class="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors"
            :class="{ 'bg-gray-700 text-white': $route.path === '/cari/list_inovasi' }"
          >
            <svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 16a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"/>
            </svg>
            Daftar Inovasi
          </NuxtLink>
        </nav>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 p-8">
      <!-- Hero Section -->
      <div class="bg-gradient-to-br from-blue-600 to-purple-700 text-white rounded-lg p-8 mb-8">
        <div class="text-center">
          <h1 class="text-4xl font-bold mb-4">
            Cari Inovasi Daerah
          </h1>
          <p class="text-xl text-blue-100 max-w-2xl mx-auto">
            Temukan dan jelajahi berbagai inovasi daerah di seluruh Indonesia melalui peta interaktif,
            daftar lengkap, dan dashboard analitik yang komprehensif.
          </p>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
              <svg class="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900">Sebaran Inovasi</h3>
              <p class="text-gray-600 text-sm">Lihat peta interaktif sebaran inovasi</p>
            </div>
          </div>
          <NuxtLink
            to="/cari/maps_inovasi"
            class="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium"
          >
            Jelajahi Peta
            <svg class="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"/>
            </svg>
          </NuxtLink>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 16a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"/>
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900">Daftar Inovasi</h3>
              <p class="text-gray-600 text-sm">Telusuri daftar lengkap inovasi</p>
            </div>
          </div>
          <NuxtLink
            to="/cari/list_inovasi"
            class="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            Lihat Daftar
            <svg class="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"/>
            </svg>
          </NuxtLink>
        </div>
      </div>

      <!-- Features Section -->
      <div class="bg-white rounded-lg shadow-md p-8">
        <div class="text-center mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Fitur Unggulan</h2>
          <p class="text-gray-600">
            Platform ini menyediakan berbagai fitur untuk membantu Anda menemukan dan menganalisis inovasi daerah
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="text-center">
            <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 class="font-semibold text-gray-900 mb-1">Pencarian Cepat</h3>
            <p class="text-gray-600 text-sm">Temukan inovasi dengan pencarian yang cepat dan akurat</p>
          </div>

          <div class="text-center">
            <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 16a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"/>
              </svg>
            </div>
            <h3 class="font-semibold text-gray-900 mb-1">Filter Lanjutan</h3>
            <p class="text-gray-600 text-sm">Saring data berdasarkan kategori, wilayah, dan kriteria lainnya</p>
          </div>

          <div class="text-center">
            <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg class="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"/>
              </svg>
            </div>
            <h3 class="font-semibold text-gray-900 mb-1">Visualisasi Data</h3>
            <p class="text-gray-600 text-sm">Grafik dan chart interaktif untuk analisis yang mendalam</p>
          </div>

          <div class="text-center">
            <div class="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg class="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"/>
                <path d="M3 8a2 2 0 012-2v9a2 2 0 01-2-2V8zM18 8a2 2 0 00-2-2v9a2 2 0 002-2V8z"/>
              </svg>
            </div>
            <h3 class="font-semibold text-gray-900 mb-1">Export Data</h3>
            <p class="text-gray-600 text-sm">Unduh data dalam berbagai format untuk keperluan analisis</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Redirect to maps_inovasi as default page
definePageMeta({
  redirect: '/cari/maps_inovasi'
})

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
