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
          <button class="bg-gray-700 w-full py-2 rounded flex items-center justify-start px-2">
            <span v-if="isSidebarOpen" class="ml-2">Manage OPD</span>
            <span v-else>🏠</span>
          </button>
        </li>
        <li>
          <button class="bg-gray-700 w-full py-2 rounded flex items-center justify-start px-2">
            <span v-if="isSidebarOpen" class="ml-2">Ide Inovasi</span>
            <span v-else>📄</span>
          </button>
        </li>
        <!-- Tambahkan menu lain sesuai kebutuhan -->
      </ul>
    </div>
    <!-- Main Content -->
    <div class="flex-1 page-content">
      <h1>Halaman Admin Instansi: {{ slug }}</h1>
      <!-- Konten khusus admin instansi bisa ditambahkan di sini -->
      <ManageUsers />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import ManageUsers from '@/components/instansi/ManageUsers.vue'
const route = useRoute()
const slug = route.params.slug
const isSidebarOpen = ref(false)
function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>

<style scoped>
.page-content {
  margin-top: 80px; /* Sesuaikan dengan tinggi navbar agar tidak tertutup */
}
</style>
