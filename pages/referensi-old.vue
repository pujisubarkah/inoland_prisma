<!-- pages/referensi.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Main Content -->
    <div class="flex min-h-screen">
      <!-- Sidebar -->
      <div 
        class="transition-all duration-300 overflow-hidden bg-gray-800 text-white p-3"
        :class="{ 'w-64': isSidebarOpen, 'w-16': !isSidebarOpen }"
      >
        <!-- Toggle Button -->
        <button
          @click="toggleSidebar"
          class="bg-gray-700 hover:bg-gray-600 text-white border-none p-3 cursor-pointer rounded-md w-full mb-3 flex justify-center items-center transition-colors"
        >
          <svg 
            class="w-5 h-5 transition-transform duration-300" 
            :class="{ 'rotate-180': isSidebarOpen }"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>

        <!-- Menu Items -->
        <ul class="list-none p-0">
          <li 
            v-for="(item, index) in menuItems" 
            :key="index"
            class="mb-3"
          >
            <button
              @click="setActiveComponent(item.component)"
              class="bg-gray-700 hover:bg-gray-600 text-white border-none p-3 cursor-pointer rounded-md w-full flex items-center transition-all duration-300"
              :class="{
                'justify-center': !isSidebarOpen,
                'justify-start': isSidebarOpen,
                'bg-emerald-600 hover:bg-emerald-700': activeComponent === item.component
              }"
              :title="!isSidebarOpen ? item.label : ''"
            >
              <component 
                :is="item.icon" 
                class="w-5 h-5 flex-shrink-0"
              />
              <span 
                v-if="isSidebarOpen" 
                class="ml-3 transition-opacity duration-300"
              >
                {{ item.label }}
              </span>
            </button>
          </li>
        </ul>
      </div>

      <!-- Main Content Area -->
      <div class="flex-1 p-4 overflow-y-auto">
        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center items-center py-20">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        </div>

        <!-- Content Components -->
        <div v-else>
          <!-- List Inovasi -->
          <InovasiLAN v-if="activeComponent === 'List Inovasi'" />
          
          <!-- Berita -->
          <Berita v-else-if="activeComponent === 'Berita'" />
          
          <!-- Infografis -->
          <Infografis v-else-if="activeComponent === 'Infografis'" />
          
          <!-- Proyek Perubahan -->
          <ProperExpo v-else-if="activeComponent === 'Proyek Perubahan'" />
          
          <!-- Tuxedovation -->
          <Tuxedovation v-else-if="activeComponent === 'Tuxedovation'" />

          <!-- Direktori -->
          <Direktori v-else-if="activeComponent === 'Direktori'" />

          <!-- Artikel Lab Inovasi -->
          <Artikel v-else-if="activeComponent === 'Artikel'" />
        </div>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <div 
      v-if="isSidebarOpen && isMobile" 
      @click="closeSidebar"
      class="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Components
import InovasiLAN from '~/components/inovasiLAN.vue'
import Berita from '~/components/Berita.vue'
import Infografis from '~/components/Infografis.vue'
import ProperExpo from '~/components/Properexpo.vue'
import Tuxedovation from '~/components/Tuxedovation.vue'
import Direktori from '~/components/Direktori.vue'
import Artikel from '~/components/Artikel.vue'

// Icon Components
const TableIcon = {
  template: `
    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M5 4a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001-1V5a1 1 0 00-1-1H5zM4 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V5a3 3 0 00-3-3H4zm2 4a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm0 3a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm0 3a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z" clip-rule="evenodd"/>
    </svg>
  `
}

const NewsIcon = {
  template: `
    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clip-rule="evenodd"/>
      <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"/>
    </svg>
  `
}

const ChartIcon = {
  template: `
    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"/>
      <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"/>
    </svg>
  `
}

const VideoIcon = {
  template: `
    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v9a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-9zm4 0a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v9a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-9z" clip-rule="evenodd"/>
    </svg>
  `
}

const TuxedovationIcon = {
  template: `
    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM6.5 7a1.5 1.5 0 113 0v1.5h1V7a2.5 2.5 0 00-5 0v1.5h1V7zm3.5 6a1.5 1.5 0 11-3 0v-1h3v1z"/>
    </svg>
  `
} 

// Meta
useHead({
  title: 'Referensi Inovasi | INOLAND',
  meta: [
    {
      name: 'description',
      content: 'Kumpulan referensi dan sumber daya inovasi terlengkap dari berbagai daerah di Indonesia'
    },
    {
      property: 'og:title',
      content: 'Referensi Inovasi | INOLAND'
    },
    {
      property: 'og:description',
      content: 'Kumpulan referensi dan sumber daya inovasi terlengkap dari berbagai daerah di Indonesia'
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      name: 'twitter:title',
      content: 'Referensi Inovasi | INOLAND'
    },
    {
      name: 'twitter:description',
      content: 'Kumpulan referensi dan sumber daya inovasi terlengkap dari berbagai daerah di Indonesia'
    }
  ]
})

// Reactive state
const activeComponent = ref('List Inovasi')
const isSidebarOpen = ref(false)
const loading = ref(false)
const windowWidth = ref(0)

// Computed
const isMobile = computed(() => windowWidth.value < 768)

// Menu items configuration
const menuItems = [
  { 
    label: 'Artikel', 
    icon: NewsIcon, 
    component: 'Artikel',
    description: 'Artikel terkait Lab Inovasi dan pengembangan inovasi daerah'
  },
  { 
    label: 'List Inovasi', 
    icon: TableIcon, 
    component: 'List Inovasi',
    description: 'Daftar lengkap inovasi dari seluruh Indonesia'
  },
  { 
    label: 'Berita Inovasi', 
    icon: NewsIcon, 
    component: 'Berita',
    description: 'Berita terkini seputar inovasi daerah'
  },
  { 
    label: 'Infografis Inovasi', 
    icon: ChartIcon, 
    component: 'Infografis',
    description: 'Visualisasi data dan informasi inovasi'
  },
  { 
    label: 'Proyek Perubahan', 
    icon: VideoIcon, 
    component: 'Proyek Perubahan',
    description: 'Dokumentasi proyek perubahan inovatif'
  },
  { 
    label: 'Tuxedovation', 
    icon: TuxedovationIcon, 
    component: 'Tuxedovation',
    description: 'Platform inovasi Kementerian Dalam Negeri'
  },
  { 
    label: 'Direktori Inovasi', 
    icon: TableIcon, 
    component: 'Direktori',
    description: 'Kumpulan dokumen inovasi daerah'
  }
]

// Methods
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const closeSidebar = () => {
  isSidebarOpen.value = false
}

const setActiveComponent = (component) => {
  loading.value = true
  activeComponent.value = component
  
  // Close sidebar on mobile after selection
  if (isMobile.value) {
    closeSidebar()
  }
  
  // Simulate loading for smooth transition
  setTimeout(() => {
    loading.value = false
  }, 300)
}

const handleResize = () => {
  windowWidth.value = window.innerWidth
  
  // Auto-close sidebar on mobile
  if (isMobile.value && isSidebarOpen.value) {
    isSidebarOpen.value = false
  }
}

// Lifecycle
onMounted(() => {
  windowWidth.value = window.innerWidth
  window.addEventListener('resize', handleResize)
  
  // Set default sidebar state based on screen size
  isSidebarOpen.value = !isMobile.value
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
/* Custom scrollbar for content area */
.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Smooth transitions */
.transition-all {
  transition: all 0.3s ease;
}

/* Active state animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}

/* Mobile responsive adjustments */
@media (max-width: 768px) {
  .sidebar-mobile {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 50;
  }
}
</style>