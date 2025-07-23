<!-- components/inovasiLAN.vue -->
<template>
  <div class="app px-3 md:px-4 p-3 md:p-4">
    <h1 class="font-bold text-2xl md:text-3xl text-center my-4 md:my-5 font-poppins px-4">
      LIST INOVASI
    </h1>
    <hr class="w-20 md:w-[100px] h-[2px] mx-auto mb-4 md:mb-5 border-none bg-gradient-to-r from-blue-800 via-black to-blue-800" />
    
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-16 md:py-20">
      <div class="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-b-2 border-blue-700"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-16 md:py-20">
      <div class="max-w-md mx-auto">
        <div class="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
          <svg class="w-8 h-8 md:w-10 md:h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/>
          </svg>
        </div>
        <p class="text-red-600 mb-4 text-sm md:text-base">{{ error }}</p>
        <button 
          @click="fetchBeritaFromAPI"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm md:text-base touch-target"
        >
          Coba Lagi
        </button>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="newsItems.length === 0" class="text-center py-16 md:py-20">
      <div class="max-w-sm mx-auto">
        <svg class="w-12 h-12 md:w-16 md:h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
        </svg>
        <h3 class="text-lg md:text-xl font-medium text-gray-600 mb-2">Belum ada inovasi</h3>
        <p class="text-gray-500 text-sm md:text-base">Inovasi akan segera ditambahkan</p>
      </div>
    </div>

    <!-- News Grid -->
    <div v-else class="news-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
      <div 
        v-for="item in sortedItems" 
        :key="item.id" 
        @click="handleItemClick(item.id)"
        class="news-item bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 group touch-target"
      >
        <div class="relative overflow-hidden">
          <img 
            :src="item.image" 
            :alt="item.title" 
            class="news-image w-full h-28 sm:h-32 md:h-40 lg:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            @error="handleImageError"
          />
          <!-- Date Badge -->
          <div class="absolute top-1 right-1 md:top-2 md:right-2">
            <span class="bg-blue-700 text-white text-xs px-1.5 py-0.5 md:px-2 md:py-1 rounded-full">
              {{ formatDate(item.date) }}
            </span>
          </div>
        </div>
        
        <div class="news-content p-2 md:p-4">
          <h3 class="font-bold text-xs sm:text-sm md:text-lg mb-1 md:mb-2 line-clamp-2 group-hover:text-blue-700 transition-colors leading-tight">
            {{ item.title }}
          </h3>
          <div class="flex items-center text-blue-700 text-xs md:text-sm">
            <svg class="w-3 h-3 md:w-4 md:h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-6a1 1 0 00-1-1H9a1 1 0 00-1 1v6a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clip-rule="evenodd"/>
            </svg>
            <span class="line-clamp-1">{{ item.pemda }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div 
      v-if="totalPages > 1 && !loading" 
      class="mt-6 md:mt-10 flex justify-center items-center space-x-1 md:space-x-2"
    >
      <!-- Previous Button -->
      <button
        v-if="currentPage > 1"
        @click="handlePageChange(currentPage - 1)"
        class="px-2 md:px-3 py-1.5 md:py-2 border-none rounded bg-gray-100 text-black cursor-pointer shadow-sm hover:bg-gray-200 transition-colors text-xs md:text-sm touch-target"
      >
        <span class="hidden sm:inline">Prev</span>
        <span class="sm:hidden">‹</span>
      </button>

      <!-- Page Numbers (scrollable on mobile) -->
      <div class="flex space-x-1 md:space-x-2 max-w-xs overflow-x-auto">
        <button
          v-for="pageNumber in visiblePages"
          :key="pageNumber"
          @click="handlePageChange(pageNumber)"
          class="px-2 md:px-3 py-1.5 md:py-2 border-none rounded cursor-pointer shadow-sm transition-colors text-xs md:text-sm touch-target flex-shrink-0"
          :class="{
            'bg-gray-800 text-white': currentPage === pageNumber,
            'bg-gray-100 text-black hover:bg-gray-200': currentPage !== pageNumber
          }"
        >
          {{ pageNumber }}
        </button>
      </div>

      <!-- Next Button -->
      <button
        v-if="currentPage < totalPages"
        @click="handlePageChange(currentPage + 1)"
        class="px-2 md:px-3 py-1.5 md:py-2 border-none rounded bg-gray-100 text-black cursor-pointer shadow-sm hover:bg-gray-200 transition-colors text-xs md:text-sm touch-target"
      >
        <span class="hidden sm:inline">Next</span>
        <span class="sm:hidden">›</span>
      </button>
    </div>

    <!-- Page Info -->
    <div v-if="!loading && newsItems.length > 0" class="text-center mt-3 md:mt-4 text-gray-600 text-xs md:text-sm px-4">
      Halaman {{ currentPage }} dari {{ totalPages }} | Total: {{ totalItems }} inovasi
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'

// Types
interface NewsItem {
  id: number
  title: string
  image: string
  pemda: string
  date: string
}

// Reactive state
const newsItems = ref<NewsItem[]>([])
const currentPage = ref<number>(1)
const totalItems = ref<number>(0)
const loading = ref<boolean>(false)
const error = ref<string>('')

// Constants
const itemsPerPage = 12

// Computed
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage))

const currentItems = computed(() => {
  const indexOfFirstItem = (currentPage.value - 1) * itemsPerPage
  const indexOfLastItem = indexOfFirstItem + itemsPerPage
  return newsItems.value.slice(indexOfFirstItem, indexOfLastItem)
})

const sortedItems = computed(() => {
  return currentItems.value.sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return dateB - dateA // Sort descending (newest first)
  })
})

const visiblePages = computed(() => {
  const pages: number[] = []
  const maxVisible = 5
  
  if (totalPages.value <= maxVisible) {
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i)
    }
  } else {
    let start = Math.max(1, currentPage.value - 2)
    let end = Math.min(totalPages.value, start + maxVisible - 1)
    
    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1)
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
  }
  
  return pages
})

// Methods
const handlePageChange = (newPage: number): void => {
  if (newPage >= 1 && newPage <= totalPages.value && newPage !== currentPage.value) {
    currentPage.value = newPage
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const fetchBeritaFromAPI = async (): Promise<void> => {
  loading.value = true
  error.value = ''
  
  try {
    interface ApiResponse {
      success: boolean
      data: any[]
      pagination?: { total: number }
    }

    const response: any = await $fetch('/api/inovasi_lan', {
      query: {
        page: currentPage.value,
        limit: itemsPerPage * 10 // Get more items to handle client-side pagination
      }
    })

    if (response.success && Array.isArray(response.data)) {
      const formattedData: NewsItem[] = response.data.map((item: any) => ({
        id: item.id,
        title: item.nama_inovasi || 'Inovasi Tanpa Nama',
        pemda: item.nama_instansi || 'Instansi Tidak Diketahui',
        image: item.image_link || '/placeholder-image.jpg',
        date: item.created_at || new Date().toISOString(),
      }))

      newsItems.value = formattedData
      totalItems.value = (response as any).pagination?.total || formattedData.length

      console.log('API URL:', '/api/inovasi_lan')
    } else {
      newsItems.value = []
      totalItems.value = 0
    }
  } catch (err) {
    console.error('Error fetching news from API:', err)
    error.value = 'Gagal memuat data inovasi. Silakan coba lagi.'
    
    // Fallback with mock data for development
    if (process.dev) {
      newsItems.value = [
        {
          id: 1,
          title: "Sistem Pelayanan Digital Terpadu",
          pemda: "Pemerintah Kota Jakarta",
          image: "/placeholder-image.jpg",
          date: new Date().toISOString()
        },
        {
          id: 2,
          title: "Smart City Management System",
          pemda: "Pemerintah Kota Surabaya",
          image: "/placeholder-image.jpg",
          date: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: 3,
          title: "E-Government Platform",
          pemda: "Pemerintah Kota Bandung",
          image: "/placeholder-image.jpg",
          date: new Date(Date.now() - 172800000).toISOString()
        }
      ]
      totalItems.value = 3
    }
  } finally {
    loading.value = false
  }
}

const handleItemClick = (id: number): void => {
  navigateTo(`/referensi/inovasi/${id}`)
}

const handleImageError = (event: Event): void => {
  const target = event.target as HTMLImageElement
  target.src = '/placeholder-image.jpg'
}

const formatDate = (dateString: string): string => {
  if (!dateString) return ''
  
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  } catch {
    return dateString
  }
}

// Lifecycle
onMounted(() => {
  fetchBeritaFromAPI()
})

// Watch for page changes
watch(currentPage, () => {
  fetchBeritaFromAPI()
})
</script>

<style scoped>
.font-poppins {
  font-family: 'Poppins', sans-serif;
}

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.touch-target {
  min-height: 44px;
}

.news-item:hover {
  transform: translateY(-2px);
}

/* Custom scrollbar for pagination */
.overflow-x-auto::-webkit-scrollbar {
  height: 4px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 2px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 2px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}

/* Main scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .news-item:hover {
    transform: none; /* Disable hover transform on mobile */
  }
  
  .news-grid {
    gap: 0.75rem;
  }
  
  /* Ensure touch targets are adequate */
  button {
    min-height: 40px;
    min-width: 40px;
  }
}

@media (min-width: 640px) and (max-width: 1024px) {
  .news-grid {
    gap: 1rem;
  }
}
</style>