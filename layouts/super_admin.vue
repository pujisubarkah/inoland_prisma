<template>
  <div class="flex h-screen">
    <aside :class="[ 'bg-gray-900 text-white p-4 transition-all', isOpen ? 'w-64' : 'w-16' ]">
      <button @click="toggle" class="w-full mb-4 bg-gray-800 rounded py-2">{{ isOpen ? '<<' : '>>' }}</button>
      <nav class="space-y-2">
        <NuxtLink v-for="item in menu" :key="item.name" :to="item.path" class="block rounded px-3 py-2 hover:bg-gray-800">
          <span v-if="isOpen">{{ item.name }}</span>
          <span v-else>{{ item.icon }}</span>
        </NuxtLink>
      </nav>
    </aside>

    <main class="flex-1 p-6 overflow-auto">
      <slot />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(true)
function toggle() { isOpen.value = !isOpen.value }

const menu = [
  { name: 'Dashboard', path: '/super_admin/dashboard', icon: '🏠' },
  { name: 'Manajemen Users', path: '/super_admin/users', icon: '👥' },
  { name: 'Roles & Permission', path: '/super_admin/roles', icon: '🔐' },
  { name: 'Manajemen Instansi', path: '/super_admin/instansi', icon: '🏛️' },
  { name: 'Manajemen UPP', path: '/super_admin/upp', icon: '🏢' },
  { name: 'Konten (Berita & Artikel)', path: '/super_admin/content', icon: '📰' },
  { name: 'Survey & Respon', path: '/super_admin/survey', icon: '📊' },
  { name: 'Inovasi / Pengajuan', path: '/super_admin/inovasi', icon: '📝' },
  { name: 'Laporan & Analytics', path: '/super_admin/reports', icon: '📈' },
  { name: 'Pengaturan Sistem', path: '/super_admin/settings', icon: '⚙️' },
  { name: 'Audit Log & Security', path: '/super_admin/audit', icon: '🔎' },
  { name: 'Notifikasi & Broadcast', path: '/super_admin/notifications', icon: '📣' }
]
</script>

<style scoped>
/* basic layout styling */
</style>
