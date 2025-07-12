<template>
  <div class="flex">
    <!-- Sidebar -->
    <div
      :style="{
        width: isSidebarOpen ? '250px' : '50px',
        transition: 'width 0.3s',
        overflow: 'hidden',
        backgroundColor: '#333',
        color: '#fff',
        padding: '10px'
      }"
    >
      <!-- Toggle Sidebar Button -->
      <button
        @click="toggleSidebar"
        :style="{
          backgroundColor: '#444',
          color: '#fff',
          border: 'none',
          padding: '10px 20px',
          cursor: 'pointer',
          borderRadius: '5px',
          width: '100%',
          marginBottom: '10px',
          display: 'flex',
          justifyContent: 'center'
        }"
      >
        <span>{{ isSidebarOpen ? '<' : '>' }}</span>
      </button>

      <!-- Sidebar Menu -->
      <ul style="list-style-type: none; padding: 0;">
        <li style="margin-bottom: 10px;">
          <button
            @click="activeComponent = 'IdeInovasi'"
            :style="sidebarButtonStyle"
          >
            <span>📋</span>
            <span v-if="isSidebarOpen" style="margin-left: 10px;">Ide Inovasi</span>
          </button>
        </li>
        <li style="margin-bottom: 10px;">
          <button
            @click="activeComponent = 'RencanaAksi'"
            :style="sidebarButtonStyle"
          >
            <span>🗂️</span>
            <span v-if="isSidebarOpen" style="margin-left: 10px;">Rencana Aksi Inovasi</span>
          </button>
        </li>
      </ul>
    </div>

    <!-- Content -->
    <div style="flex: 1; padding: 10px;">
      <IdeInovasi v-if="activeComponent === 'IdeInovasi'" />
      <RencanaAksi v-if="activeComponent === 'RencanaAksi'" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import IdeInovasi from '@/components/Ide.vue';
import RencanaAksi from '@/components/Rencana.vue';

const isSidebarOpen = ref(false);
const activeComponent = ref('IdeInovasi');

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const sidebarButtonStyle = computed(() => ({
  backgroundColor: '#444',
  color: '#fff',
  border: 'none',
  padding: '10px 20px',
  cursor: 'pointer',
  borderRadius: '5px',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: isSidebarOpen.value ? 'flex-start' : 'center'
}));
</script>
