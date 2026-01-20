<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Redirect Notice -->
    <div class="bg-blue-600 text-white text-center py-3">
      <p class="text-sm">
        🚀 Halaman telah dipindahkan! Anda akan dialihkan otomatis ke halaman baru...
      </p>
    </div>

    <!-- Navigation Cards for Manual Selection -->
    <div class="container mx-auto px-8 py-16">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold mb-4 bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent">
          Cari Inovasi Daerah
        </h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Pilih halaman yang ingin Anda kunjungi:
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <!-- Sebaran Inovasi Card -->
        <NuxtLink 
          to="/cari/maps_inovasi"
          class="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
        >
          <div class="p-6">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
              <svg class="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Sebaran Inovasi</h3>
            <p class="text-gray-600 text-sm mb-4">
              Peta interaktif sebaran inovasi di Indonesia
            </p>
            <div class="flex items-center text-purple-600 font-semibold group-hover:text-purple-700">
              Lihat Peta
              <svg class="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
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
          <div class="p-6">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
              <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 16a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Daftar Inovasi</h3>
            <p class="text-gray-600 text-sm mb-4">
              Daftar lengkap dengan pencarian dan filter
            </p>
            <div class="flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
              Lihat Daftar
              <svg class="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"/>
              </svg>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

// Define page meta
definePageMeta({
  title: 'Cari Inovasi',
  description: 'Temukan dan jelajahi inovasi daerah di seluruh Indonesia'
})

// Auto redirect to the new landing page after 3 seconds
onMounted(() => {
  setTimeout(() => {
    navigateTo('/cari/')
  }, 3000)
})
</script>

<style>
/* Custom scrollbar untuk sidebar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #374151;
}

::-webkit-scrollbar-thumb {
  background: #6B7280;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #9CA3AF;
}

/* Loading state untuk content area kosong */
.content-area:empty::before {
  content: 'Memuat...';
  display: flex;
  justify-content: center;
  align-items: center;
  height: 12rem;
  color: #64748b;
  font-size: 1.125rem;
}

/* Mobile responsive sidebar */
@media (max-width: 1024px) {
  .sidebar-mobile {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 50;
    transform: translateX(-100%);
  }
  
  .sidebar-mobile.open {
    transform: translateX(0);
  }
}
</style>
