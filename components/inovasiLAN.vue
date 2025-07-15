<!-- components/inovasiLAN.vue -->
<template>
  <div class="app">
    <h1 class="font-poppins font-bold text-3xl text-center my-5">
      LIST INOVASI
    </h1>
    <hr class="w-24 h-0.5 bg-gradient-to-r from-blue-700 via-black to-blue-700 mx-auto mb-5 border-none" />
    
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-20">
      <p class="text-red-600 mb-4">{{ error }}</p>
      <button 
        @click="fetchBeritaFromAPI"
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Coba Lagi
      </button>
    </div>

    <!-- Empty State -->
    <div v-else-if="newsItems.length === 0" class="text-center py-20">
      <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
      </svg>
      <h3 class="text-xl font-medium text-gray-600 mb-2">Belum ada inovasi</h3>
      <p class="text-gray-500">Inovasi akan segera ditambahkan</p>
    </div>

    <!-- News Grid -->
    <div v-else class="news-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4">
      <div 
        v-for="item in sortedItems" 
        :key="item.id" 
        @click="handleItemClick(item.id)"
        class="news-item bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 group"
      >
        <div class="relative overflow-hidden">
          <img 
            :src="item.image" 
            :alt="item.title" 
            class="news-image w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            @error="handleImageError"
          />
          <!-- Date Badge -->
          <div class="absolute top-2 right-2">
            <span class="bg-blue-700 text-white text-xs px-2 py-1 rounded-full">
              {{ formatDate(item.date) }}
            </span>
          </div>
        </div>
        
        <div class="news-content p-4">
          <h3 class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-700 transition-colors">
            {{ item.title }}
          </h3>
          <div class="flex items-center text-blue-700 text-sm">
            <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-6a1 1 0 00-1-1H9a1 1 0 00-1 1v6a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clip-rule="evenodd"/>
            </svg>
            {{ item.pemda }}
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div 
      v-if="totalPages > 1 && !loading" 
      class="mt-10 flex justify-center items-center space-x-2"
    >
      <!-- Previous Button -->
      <button
        v-if="currentPage > 1"
        @click="handlePageChange(currentPage - 1)"
        class="px-3 py-2 border-none rounded bg-gray-100 text-black cursor-pointer shadow-sm hover:bg-gray-200 transition-colors"
      >
        Prev
      </button>

      <!-- Page Numbers -->
      <button
        v-for="pageNumber in visiblePages"
        :key="pageNumber"
        @click="handlePageChange(pageNumber)"
        class="px-3 py-2 border-none rounded cursor-pointer shadow-sm transition-colors"
        :class="{
          'bg-gray-800 text-white': currentPage === pageNumber,
          'bg-gray-100 text-black hover:bg-gray-200': currentPage !== pageNumber
        }"
      >
        {{ pageNumber }}
      </button>

      <!-- Next Button -->
      <button
        v-if="currentPage < totalPages"
        @click="handlePageChange(currentPage + 1)"
        class="px-3 py-2 border-none rounded bg-gray-100 text-black cursor-pointer shadow-sm hover:bg-gray-200 transition-colors"
      >
        Next
      </button>
    </div>

    <!-- Page Info -->
    <div v-if="!loading && newsItems.length > 0" class="text-center mt-4 text-gray-600 text-sm">
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
  navigateTo(`/inovasi/${id}`)
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

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-item:hover {
  transform: translateY(-2px);
}

/* Custom scrollbar */
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
</style>