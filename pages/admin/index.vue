<template>
  <div class="flex">
    <!-- Sidebar -->
    <div
      :class="[
        'transition-all duration-300 overflow-hidden bg-gray-800 text-white p-4',
        isSidebarOpen ? 'w-64' : 'w-16'
      ]"
    >
      <!-- Toggle Button -->
      <button
        @click="toggleSidebar"
        class="bg-gray-700 w-full py-2 mb-4 rounded flex justify-center"
      >
        <span v-if="isSidebarOpen">&laquo;</span>
        <span v-else>&raquo;</span>
      </button>

      <!-- Sidebar Menu -->
      <ul class="space-y-2">
        <li>
          <button
            @click="setActive('Dashboard')"
            class="bg-gray-700 w-full py-2 rounded flex items-center justify-start px-2"
          >
            <span v-if="isSidebarOpen" class="ml-2">Dashboard</span>
            <span v-else>📊</span>
          </button>
        </li>
        <li>
          <button
            @click="setActive('Berita')"
            class="bg-gray-700 w-full py-2 rounded flex items-center justify-start px-2"
          >
            <span v-if="isSidebarOpen" class="ml-2">Tambah Berita</span>
            <span v-else>📰</span>
          </button>
        </li>
        <li>
          <button
            @click="setActive('Inovasi')"
            class="bg-gray-700 w-full py-2 rounded flex items-center justify-start px-2"
          >
            <span v-if="isSidebarOpen" class="ml-2">Tambah Inovasi</span>
            <span v-else>💡</span>
          </button>
        </li>
        <li>
          <button
            @click="setActive('Pendampingan')"
            class="bg-gray-700 w-full py-2 rounded flex items-center justify-start px-2"
          >
            <span v-if="isSidebarOpen" class="ml-2 text-left">Pengajuan Pendampingan</span>
            <span v-else>📝</span>
          </button>
        </li>
        <li>
          <button
            @click="setActive('Artikel')"
            class="bg-gray-700 w-full py-2 rounded flex items-center justify-start px-2"
          >
            <span v-if="isSidebarOpen" class="ml-2">Tambah Artikel</span>
            <span v-else>📝</span>
          </button>
        </li>
        <li>
          <button
            @click="setActive('SuccessStory')"
            class="bg-gray-700 w-full py-2 rounded flex items-center justify-start px-2"
          >
            <span v-if="isSidebarOpen" class="ml-2">Tambah Cerita Sukses</span>
            <span v-else>🏆</span>
          </button>
        </li>
        <li>
          <button
            @click="setActive('Role')"
            class="bg-gray-700 w-full py-2 rounded flex items-center justify-start px-2"
          >
            <span v-if="isSidebarOpen" class="ml-2">User List</span>
            <span v-else>👤</span>
          </button>
        </li>
      </ul>
    </div>

    <!-- Main Content -->
    <div class="flex-1">
      <Dashboardinovasi v-if="activeComponent === 'Dashboard'" />
      <TambahBerita v-if="activeComponent === 'Berita'" />
      <TambahInovasi v-if="activeComponent === 'Inovasi'" />
      <PengajuanPendampingan v-if="activeComponent === 'Pendampingan'" />
      <TambahArtikel v-if="activeComponent === 'Artikel'" />
      <AturRole v-if="activeComponent === 'Role'" />
      <TambahSuccessStory v-if="activeComponent === 'SuccessStory'" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TambahBerita from './TambahBerita.vue'
import TambahInovasi from './TambahInovasi.vue'
import AturRole from './AturRole.vue'
import TambahArtikel from './TambahArtikel.vue'
import Dashboardinovasi from './Dashboardinovasi.vue'
import PengajuanPendampingan from './PengajuanPendampingan.vue'
import TambahSuccessStory from './TambahSuccessStory.vue'

const isSidebarOpen = ref(false)
const activeComponent = ref('Dashboard')

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}

function setActive(component) {
  activeComponent.value = component
}
</script>

<style scoped>
/* Tambahan jika butuh animasi smooth */
</style>
