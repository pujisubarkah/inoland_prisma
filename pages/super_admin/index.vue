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
            @click="setActive('Users')"
            class="bg-gray-700 w-full py-2 rounded flex items-center justify-start px-2"
          >
            <span v-if="isSidebarOpen" class="ml-2">Manajemen Users</span>
            <span v-else>👥</span>
          </button>
        </li>
        <li>
          <button
            @click="setActive('Roles')"
            class="bg-gray-700 w-full py-2 rounded flex items-center justify-start px-2"
          >
            <span v-if="isSidebarOpen" class="ml-2">Roles & Permission</span>
            <span v-else>🔐</span>
          </button>
        </li>
        <li>
          <button
            @click="setActive('Instansi')"
            class="bg-gray-700 w-full py-2 rounded flex items-center justify-start px-2"
          >
            <span v-if="isSidebarOpen" class="ml-2">Manajemen Instansi</span>
            <span v-else>🏛️</span>
          </button>
        </li>
        <li>
          <button
            @click="setActive('UPP')"
            class="bg-gray-700 w-full py-2 rounded flex items-center justify-start px-2"
          >
            <span v-if="isSidebarOpen" class="ml-2">Manajemen UPP</span>
            <span v-else>🏢</span>
          </button>
        </li>
        <li>
          <button
            @click="setActive('Content')"
            class="bg-gray-700 w-full py-2 rounded flex items-center justify-start px-2"
          >
            <span v-if="isSidebarOpen" class="ml-2">Konten (Berita & Artikel)</span>
            <span v-else>📰</span>
          </button>
        </li>
        <li>
          <button
            @click="setActive('Survey')"
            class="bg-gray-700 w-full py-2 rounded flex items-center justify-start px-2"
          >
            <span v-if="isSidebarOpen" class="ml-2">Survey & Respon</span>
            <span v-else>📊</span>
          </button>
        </li>
        <li>
          <button
            @click="setActive('Inovasi')"
            class="bg-gray-700 w-full py-2 rounded flex items-center justify-start px-2"
          >
            <span v-if="isSidebarOpen" class="ml-2">Inovasi / Pengajuan</span>
            <span v-else>📝</span>
          </button>
        </li>
        <li>
          <button
            @click="setActive('Reports')"
            class="bg-gray-700 w-full py-2 rounded flex items-center justify-start px-2"
          >
            <span v-if="isSidebarOpen" class="ml-2">Laporan & Analytics</span>
            <span v-else>📈</span>
          </button>
        </li>
        <li>
          <button
            @click="setActive('Settings')"
            class="bg-gray-700 w-full py-2 rounded flex items-center justify-start px-2"
          >
            <span v-if="isSidebarOpen" class="ml-2">Pengaturan Sistem</span>
            <span v-else>⚙️</span>
          </button>
        </li>
        <li>
          <button
            @click="setActive('Audit')"
            class="bg-gray-700 w-full py-2 rounded flex items-center justify-start px-2"
          >
            <span v-if="isSidebarOpen" class="ml-2">Audit Log & Security</span>
            <span v-else>🔎</span>
          </button>
        </li>
        <li>
          <button
            @click="setActive('Notifications')"
            class="bg-gray-700 w-full py-2 rounded flex items-center justify-start px-2"
          >
            <span v-if="isSidebarOpen" class="ml-2">Notifikasi & Broadcast</span>
            <span v-else>📣</span>
          </button>
        </li>
      </ul>
    </div>

    <!-- Main Content -->
    <div class="flex-1">
      <Dashboard v-if="activeComponent === 'Dashboard'" />
      <Users v-if="activeComponent === 'Users'" />
      <Roles v-if="activeComponent === 'Roles'" />
      <Instansi v-if="activeComponent === 'Instansi'" />
      <UPP v-if="activeComponent === 'UPP'" />
      <Content v-if="activeComponent === 'Content'" />
      <Survey v-if="activeComponent === 'Survey'" />
      <Inovasi v-if="activeComponent === 'Inovasi'" />
      <Reports v-if="activeComponent === 'Reports'" />
      <Settings v-if="activeComponent === 'Settings'" />
      <Audit v-if="activeComponent === 'Audit'" />
      <Notifications v-if="activeComponent === 'Notifications'" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Dashboard from './dashboard/index.vue'
import Users from './users/index.vue'
import Roles from './roles/index.vue'
import Instansi from './instansi/index.vue'
import UPP from './upp/index.vue'
import Content from './content/index.vue'
import Survey from './survey/index.vue'
import Inovasi from './inovasi/index.vue'
import Reports from './reports/index.vue'
import Settings from './settings/index.vue'
import Audit from './audit/index.vue'
import Notifications from './notifications/index.vue'

definePageMeta({ middleware: 'super-admin' })

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
/* simple layout styles */
</style>
