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
            @click="setActive('Rencana')"
            class="bg-gray-700 w-full py-2 rounded flex items-center justify-start px-2"
          >
            <span v-if="isSidebarOpen" class="ml-2">Rencana Aksi</span>
            <span v-else>📋</span>
          </button>
        </li>
      </ul>
    </div>

    <!-- Main Content -->
    <div class="flex-1">
      <profil v-if="activeComponent === 'Profil'" />
      <InnovationIdeaForm v-if="activeComponent === 'Ide'" />
      <Rencana v-if="activeComponent === 'Rencana'" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import InnovationIdeaForm from '@/components/InnovationIdeaForm.vue'
import Rencana from '@/components/Rencana.vue'
import profil from '@/components/profil.vue'

const isSidebarOpen = ref(false)
const activeComponent = ref('Profil')

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