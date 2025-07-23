<!-- components/Tuxedovation.vue -->
<template>
  <div class="app p-3 md:p-4">
    <h1 class="font-bold text-2xl md:text-3xl text-center my-4 md:my-5 font-poppins px-4">
      TUXEDOVATION
    </h1>
    <hr class="w-20 md:w-[100px] h-[2px] mx-auto mb-4 md:mb-5 border-none bg-gradient-to-r from-blue-800 via-black to-blue-800" />
    
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-20">
      <p class="text-red-600">{{ error }}</p>
      <button 
        @click="fetchBeritaFromAPI"
        class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Coba Lagi
      </button>
    </div>

    <!-- News Grid -->
    <div v-else class="news-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4">
      <div 
        v-for="item in newsItems" 
        :key="item.id" 
        @click="handleItemClick(item.id)"
        class="news-item bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
      >
        <img 
          :src="item.image" 
          :alt="item.title" 
          class="news-image w-full h-48 object-cover"
          @error="handleImageError"
        />
        <div class="news-content p-4">
          <h3 class="font-bold text-lg mb-2 line-clamp-2">
            {{ item.title }}
          </h3>
          <p class="text-blue-700 text-sm">{{ item.pemda }}</p>
          <p class="text-gray-500 text-xs mt-1">{{ formatDate(item.date) }}</p>
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

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

// Types
/**
 * @typedef {Object} NewsItem
 * @property {number} id
 * @property {string} title
 * @property {string} image
 * @property {string} pemda
 * @property {string} date
 */

// Reactive state
const newsItems = ref([])
const currentPage = ref(1)
const loading = ref(false)
const error = ref('')
const totalItems = ref(0)

// Constants
const itemsPerPage = 20
const totalPages = 100

// Computed
const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  
  if (totalPages <= maxVisible) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
  } else {
    let start = Math.max(1, currentPage.value - 2)
    let end = Math.min(totalPages, start + maxVisible - 1)
    
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
const handlePageChange = (newPage) => {
  if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage.value) {
    currentPage.value = newPage
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const fetchBeritaFromAPI = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const offset = (currentPage.value - 1) * itemsPerPage
    const response = await $fetch(
      `https://api.indeks.inovasi.litbang.kemendagri.go.id/tuxe/new-release?offset=${offset}`
    )

    // Format data sesuai kebutuhan
    const formattedData = response.inovasi.map((item) => ({
      id: item.id,
      title: item.nama,
      image: item.indikator_video?.thumbnail_url || '/placeholder-image.jpg',
      pemda: item.pemda,
      date: item.waktu,
    }))

    newsItems.value = formattedData
    totalItems.value = response.total || formattedData.length

    console.log('API URL:', `https://api.indeks.inovasi.litbang.kemendagri.go.id/tuxe/new-release?offset=${offset}`)
  } catch (err) {
    console.error('Error fetching news from API:', err)
    error.value = 'Gagal memuat data. Silakan coba lagi.'
  } finally {
    loading.value = false
  }
}

const handleItemClick = (id) => {
  window.open(`https://tuxedovation.inovasi.litbang.kemendagri.go.id/detail_inovasi/${id}`, '_blank')
}

const handleImageError = (event) => {
  const target = event.target
  target.src = '/placeholder-image.jpg'
}

const formatDate = (dateString) => {
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
  transition: transform 0.2s ease-in-out;
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