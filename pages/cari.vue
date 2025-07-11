<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <div 
      class="transition-all duration-300 overflow-hidden bg-gray-800 text-white p-3"
      :class="{ 'w-64': isSidebarOpen, 'w-16': !isSidebarOpen }"
    >
      <!-- Toggle Button -->
      <button 
        @click="toggleSidebar"
        class="bg-gray-700 text-white border-none p-3 cursor-pointer rounded-md w-full mb-3 flex justify-center hover:bg-gray-600 transition-colors"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path v-if="isSidebarOpen" fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
          <path v-else fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
        </svg>
      </button>

      <!-- Navigation Menu -->
      <ul class="list-none p-0">
        <li v-for="item in navItems" :key="item.key" class="mb-3">
          <button 
            @click="setActiveComponent(item.key)"
            class="bg-gray-700 text-white border-none p-3 cursor-pointer rounded-md w-full flex items-center hover:bg-gray-600 transition-colors"
            :class="{ 
              'justify-center': !isSidebarOpen, 
              'justify-start': isSidebarOpen,
              'bg-blue-600': activeComponent === item.key
            }"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path v-if="item.key === 'SebaranInovasi'" d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
              <path v-else-if="item.key === 'ListInovasi'" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 16a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"/>
              <path v-else-if="item.key === 'DashboardInovasi'" d="M3 4a1 1 0 000 2v9a2 2 0 002 2h6a2 2 0 002-2V6a1 1 0 100-2H3zM8 8a1 1 0 011-1h.01a1 1 0 110 2H9a1 1 0 01-1-1zM8 12a1 1 0 011-1h.01a1 1 0 110 2H9a1 1 0 01-1-1zM15 4a1 1 0 100 2v9a2 2 0 01-2 2H7v-2h6V6a1 1 0 01-1-1h2z"/>
            </svg>
            <span v-if="isSidebarOpen" class="ml-3 flex items-center text-sm">
              {{ item.label }}
            </span>
          </button>
        </li>
      </ul>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Page Header -->
      <div class="bg-white px-8 py-8 border-b border-gray-200 shadow-sm">
        <h1 class="text-4xl font-bold mb-2 bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent">
          {{ getPageTitle() }}
        </h1>
        <p class="text-slate-600 text-lg font-normal">
          {{ getPageSubtitle() }}
        </p>
      </div>

      <!-- Dynamic Components -->
      <div class="flex-1 p-8 overflow-y-auto bg-gray-50">
        <Transition 
          name="fade" 
          mode="out-in"
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 translate-y-5"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-5"
        >
          <InteractiveMap v-if="activeComponent === 'SebaranInovasi'" key="sebaran" />
          <ListInovasi v-else-if="activeComponent === 'ListInovasi'" key="list" />
          <DashboardInovasi v-else-if="activeComponent === 'DashboardInovasi'" key="dashboard" />
        </Transition>
      </div>
    </div>

    <!-- Mobile Overlay -->
    <div 
      v-if="isSidebarOpen" 
      class="fixed inset-0 bg-black/50 z-40 lg:hidden"
      @click="isSidebarOpen = false"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent, onMounted, onUnmounted } from 'vue'

// Define page meta
definePageMeta({
  title: 'Cari Inovasi',
  description: 'Temukan dan jelajahi inovasi daerah di seluruh Indonesia'
})

// Components
const InteractiveMap = defineAsyncComponent(() => import('~/components/Interactive_maps.vue'))
const ListInovasi = defineAsyncComponent(() => import('~/components/Listinovasi.vue'))
const DashboardInovasi = defineAsyncComponent(() => import('~/components/Dashboardinovasi.vue'))

// Navigation items
const navItems = [
  {
    key: 'SebaranInovasi',
    label: 'Sebaran Inovasi'
  },
  {
    key: 'ListInovasi',
    label: 'Daftar Inovasi'
  },
  {
    key: 'DashboardInovasi',
    label: 'Dashboard Inovasi'
  }
] as const

type ComponentKey = typeof navItems[number]['key']

// Reactive state
const activeComponent = ref<ComponentKey>('SebaranInovasi')
const isSidebarOpen = ref(false)

// Methods
const setActiveComponent = (component: ComponentKey) => {
  activeComponent.value = component
  // Auto-close sidebar on mobile after selection
  if (window.innerWidth <= 1024) {
    isSidebarOpen.value = false
  }
}

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

// Computed properties for dynamic content
const getPageTitle = () => {
  const titles = {
    'SebaranInovasi': 'Sebaran Inovasi',
    'ListInovasi': 'Daftar Inovasi',
    'DashboardInovasi': 'Dashboard Inovasi'
  }
  return titles[activeComponent.value]
}

const getPageSubtitle = () => {
  const subtitles = {
    'SebaranInovasi': 'Peta interaktif sebaran inovasi di seluruh Indonesia',
    'ListInovasi': 'Daftar lengkap inovasi daerah dengan fitur pencarian dan filter',
    'DashboardInovasi': 'Analisis dan visualisasi data inovasi daerah'
  }
  return subtitles[activeComponent.value]
}

// Auto-close sidebar on mobile
const checkScreenSize = () => {
  if (window.innerWidth <= 1024) {
    isSidebarOpen.value = false
  }
}

// Lifecycle
onMounted(() => {
  window.addEventListener('resize', checkScreenSize)
  checkScreenSize()
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
})
</script>

<style>
/* Custom scrollbar untuk sidebar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #374151;
}

::-webkit-scrollbar-thumb {
  background: #6B7280;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #9CA3AF;
}

/* Loading state untuk content area kosong */
.content-area:empty::before {
  content: 'Memuat...';
  display: flex;
  justify-content: center;
  align-items: center;
  height: 12rem;
  color: #64748b;
  font-size: 1.125rem;
}

/* Mobile responsive sidebar */
@media (max-width: 1024px) {
  .sidebar-mobile {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 50;
    transform: translateX(-100%);
  }
  
  .sidebar-mobile.open {
    transform: translateX(0);
  }
}
</style>
