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
            @click="setActive('Notifikasi')"
            class="bg-gray-700 w-full py-2 rounded flex items-center justify-start px-2 relative"
          >
            <span v-if="isSidebarOpen" class="ml-2">Notifikasi</span>
            <span v-else>🔔</span>
            <span v-if="unreadCount > 0" class="absolute right-2 top-2 bg-red-500 text-xs rounded-full px-2">
              {{ unreadCount }}
            </span>
          </button>
        </li>
        <li>
          <button
            @click="setActive('Profil')"
            class="bg-gray-700 w-full py-2 rounded flex items-center justify-start px-2"
          >
            <span v-if="isSidebarOpen" class="ml-2">Profil</span>
            <span v-else>👤</span>
          </button>
        </li>
        <li>
          <button
            @click="setActive('Ide')"
            class="bg-gray-700 w-full py-2 rounded flex items-center justify-start px-2"
          >
            <span v-if="isSidebarOpen" class="ml-2">Ide Inovasi</span>
            <span v-else>💡</span>
          </button>
        </li>
        <li>
          <button
            @click="setActive('TambahInovasiDaerah')"
            class="bg-gray-700 w-full py-2 rounded flex items-center justify-start px-2"
          >
            <span v-if="isSidebarOpen" class="ml-2">Tambah Inovasi Daerah</span>
            <span v-else>➕</span>
          </button>
        </li>
        <li>
          <button
            @click="setActive('Rencana')"
            class="bg-gray-700 w-full py-2 rounded flex items-center justify-start px-2"
          >
            <span v-if="isSidebarOpen" class="ml-2">Rencana Aksi</span>
            <span v-else>📋</span>
          </button>
        </li>
        <li>
          <button
            @click="setActive('SurveyKesiapan')"
            class="bg-gray-700 w-full py-2 rounded flex items-center justify-start px-2"
          >
            <span v-if="isSidebarOpen" class="ml-2">Survey Kesiapan Inovasi</span>
            <span v-else>📊</span>
          </button>
        </li>
        <li>
          <button
            @click="setActive('TambahUPP')"
            class="bg-gray-700 w-full py-2 rounded flex items-center justify-start px-2"
          >
            <span v-if="isSidebarOpen" class="ml-2">Tambah UPP</span>
            <span v-else>🏢</span>
          </button>
        </li>
      </ul>
    </div>

    <!-- Main Content -->
    <div class="flex-1">
      <!-- Tampilkan daftar notifikasi jika dipilih -->
      <div v-if="activeComponent === 'Notifikasi'" class="p-8">
        <h3 class="text-xl font-bold mb-4">Notifikasi</h3>
        <ul>
          <li v-for="notif in notifications" :key="notif.id" class="mb-2 p-3 bg-blue-50 rounded">
            {{ notif.message }}
          </li>
        </ul>
        <div v-if="notifications.length === 0" class="text-gray-500">Tidak ada notifikasi.</div>
      </div>
      <profil v-if="activeComponent === 'Profil'" />
      <InnovationIdeaForm v-if="activeComponent === 'Ide'" />
      <TambahInovasiDaerah v-if="activeComponent === 'TambahInovasiDaerah'" />
      <TambahUPP v-if="activeComponent === 'TambahUPP'" />
      <Rencana v-if="activeComponent === 'Rencana'" />
      <SurveyAdmin v-if="activeComponent === 'SurveyKesiapan'" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import InnovationIdeaForm from '@/pages/admin_instansi/InnovationIdeaForm.vue'
import TambahInovasiDaerah from '@/pages/admin_instansi/tambah_inovasi_daerah.vue'
import TambahUPP from '@/pages/admin_instansi/tambah_upp.vue'
import Rencana from '@/pages/admin_instansi/Rencana.vue'
import profil from '@/pages/admin_instansi/profil.vue'
import SurveyAdmin from '@/pages/admin_instansi/survey.vue'

const isSidebarOpen = ref(false)
const activeComponent = ref('Profil')

// Dummy data notifikasi, ganti dengan fetch API sesuai kebutuhan
const notifications = ref([
  // { id: 1, message: 'Pengumuman baru dari admin!' }
])
const unreadCount = ref(notifications.value.length)

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}

function setActive(component) {
  activeComponent.value = component
}

// Contoh: fetch notifikasi dari backend saat komponen dimount
onMounted(async () => {
  // const data = await $fetch('/api/admin/notifications')
  // notifications.value = data
  // unreadCount.value = data.length
})
</script>

<style scoped>
/* Tambahan jika butuh animasi smooth */
</style>