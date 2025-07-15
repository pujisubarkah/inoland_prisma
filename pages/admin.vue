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
            @click="setActive('Artikel')"
            class="bg-gray-700 w-full py-2 rounded flex items-center justify-start px-2"
          >
            <span v-if="isSidebarOpen" class="ml-2">Tambah Artikel</span>
            <span v-else>📝</span>
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
      <TambahBerita v-if="activeComponent === 'Berita'" />
      <TambahInovasi v-if="activeComponent === 'Inovasi'" />
      <TambahArtikel v-if="activeComponent === 'Artikel'" />
      <AturRole v-if="activeComponent === 'Role'" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TambahBerita from '@/components/TambahBerita.vue'
import TambahInovasi from '@/components/TambahInovasi.vue'
import AturRole from '@/components/AturRole.vue'
import TambahArtikel from '@/components/TambahArtikel.vue'

const isSidebarOpen = ref(false)
const activeComponent = ref('Berita')

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
