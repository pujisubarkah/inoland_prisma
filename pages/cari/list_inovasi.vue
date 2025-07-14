<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Page Header -->
    <div class="bg-white px-8 py-8 border-b border-gray-200 shadow-sm">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-4xl font-bold mb-2 bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent">
            Daftar Inovasi
          </h1>
          <p class="text-slate-600 text-lg font-normal">
            Daftar lengkap inovasi daerah dengan fitur pencarian dan filter
          </p>
        </div>
        
        <!-- Navigation Links -->
        <div class="flex space-x-4">
          <NuxtLink 
            to="/cari/maps_inovasi"
            class="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
          >
            SEBARAN INOVASI
          </NuxtLink>
          <NuxtLink 
            to="/cari/dashboard_inovasi"
            class="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
          >
            DASHBOARD
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Search and Filter Section -->
    <div class="p-8 pb-4">
      <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex-1">
            <input 
              type="text" 
              placeholder="Cari inovasi..." 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
          </div>
          <div class="flex gap-4">
            <select class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Semua Kategori</option>
              <option value="pelayanan">Pelayanan Publik</option>
              <option value="ekonomi">Ekonomi</option>
              <option value="sosial">Sosial</option>
            </select>
            <button class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Filter
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="px-8 pb-8">
      <div class="bg-white rounded-lg shadow-sm p-6">
        <ListInovasi />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

// Define page meta
definePageMeta({
  title: 'Daftar Inovasi',
  description: 'Daftar lengkap inovasi daerah dengan fitur pencarian dan filter'
})

// Components
const ListInovasi = defineAsyncComponent(() => import('~/components/Listinovasi.vue'))
</script>

<style scoped>
/* Custom styles jika diperlukan */
</style>
