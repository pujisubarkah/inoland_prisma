<!-- layouts/referensi.vue -->
<template>
  <div class="font-poppins min-h-screen flex flex-col">
    <!-- Navbar Component -->
    <Navbar />    <!-- Main Content with top padding to account for fixed navbar -->
    <div class="flex flex-1 bg-gray-50 pt-[52px] sm:pt-[56px]">
      <!-- Sidebar -->
      <div 
        class="transition-all duration-300 bg-gray-800 text-white"
        :class="{
          'w-64': isSidebarOpen,
          'w-16': !isSidebarOpen
        }"
      >
        <div class="p-3 h-full overflow-y-auto">
          <!-- Toggle Button -->
          <button
            @click="toggleSidebar"
            class="bg-gray-700 hover:bg-gray-600 text-white border-none p-3 cursor-pointer rounded-md w-full mb-3 flex justify-center items-center transition-colors touch-manipulation"
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
              <NuxtLink
                :to="item.route"
                class="bg-gray-700 hover:bg-gray-600 text-white border-none p-3 cursor-pointer rounded-md w-full flex items-center transition-all duration-300 no-underline touch-manipulation min-h-[44px]"
                :class="{
                  'justify-center': !isSidebarOpen,
                  'justify-start': isSidebarOpen,
                  'bg-emerald-600 hover:bg-emerald-700': $route.path === item.route
                }"
                :title="!isSidebarOpen ? item.label : ''"
              >
              <!-- Icon -->
              <svg v-if="item.icon === NewsIcon" class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clip-rule="evenodd"/>
                <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"/>
              </svg>
              <svg v-else-if="item.icon === TableIcon" class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5 4a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001-1V5a1 1 0 00-1-1H5zM4 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V5a3 3 0 00-3-3H4zm2 4a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm0 3a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm0 3a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z" clip-rule="evenodd"/>
              </svg>
              <svg v-else-if="item.icon === ChartIcon" class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"/>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"/>
              </svg>
              <svg v-else-if="item.icon === VideoIcon" class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v9a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-9zm4 0a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v9a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-9z" clip-rule="evenodd"/>
              </svg>
              <svg v-else-if="item.icon === TuxedovationIcon" class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM6.5 7a1.5 1.5 0 113 0v1.5h1V7a2.5 2.5 0 00-5 0v1.5h1V7zm3.5 6a1.5 1.5 0 11-3 0v-1h3v1z"/>
              </svg>
              <svg v-else class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
              </svg>              <span 
                v-if="isSidebarOpen" 
                class="ml-3 transition-all duration-300 whitespace-nowrap"
              >
                {{ item.label }}
              </span>
            </NuxtLink>
          </li>
        </ul>
        </div>
      </div>

      <!-- Main Content Area -->
      <div class="flex-1 overflow-y-auto p-4">
        <slot />
      </div>
    </div>

    <!-- Footer Component -->
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

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

// Reactive state
const isSidebarOpen = ref(true)
const windowWidth = ref(0)

// Menu items configuration
const menuItems = [
  { 
    label: 'Artikel Inovasi', 
    icon: NewsIcon, 
    route: '/referensi/artikel'
  },
  { 
    label: 'List Inovasi', 
    icon: TableIcon, 
    route: '/referensi/inovasi'
  },
  { 
    label: 'Berita Inovasi', 
    icon: NewsIcon, 
    route: '/referensi/berita'
  },
  { 
    label: 'Infografis Inovasi', 
    icon: ChartIcon, 
    route: '/referensi/infografis'
  },
  { 
    label: 'Proyek Perubahan', 
    icon: VideoIcon, 
    route: '/referensi/properexpo'
  },
  { 
    label: 'Tuxedovation', 
    icon: TuxedovationIcon, 
    route: '/referensi/tuxedovation'
  },
  { 
    label: 'Direktori Inovasi', 
    icon: TableIcon, 
    route: '/referensi/direktori'
  }
]

// Methods
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const handleResize = () => {
  windowWidth.value = window.innerWidth
  
  // On mobile, start with collapsed sidebar for more space
  if (windowWidth.value < 768 && isSidebarOpen.value) {
    isSidebarOpen.value = false
  }
  
  // On desktop, expand sidebar by default
  if (windowWidth.value >= 1024 && !isSidebarOpen.value) {
    isSidebarOpen.value = true
  }
}

// Lifecycle
onMounted(() => {
  if (typeof window !== 'undefined') {
    windowWidth.value = window.innerWidth
    window.addEventListener('resize', handleResize)
    
    // Set initial sidebar state based on screen size
    // Desktop: expanded, Mobile: collapsed for better UX
    isSidebarOpen.value = windowWidth.value >= 768
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', handleResize)
  }
})
</script>

<style scoped>
.font-poppins {
  font-family: 'Poppins', sans-serif;
}
</style>
