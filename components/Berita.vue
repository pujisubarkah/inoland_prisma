<!-- components/Berita.vue -->
<template>
  <div class="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
    <!-- Header -->
    <header class="mb-6 text-center">
      <h1 class="text-3xl font-bold font-poppins">
        🔥 Update Terkini untuk Sobat Inovasi! Simak Beritanya
      </h1>
      <p class="text-gray-500 mt-2">{{ currentDate }}</p>
    </header>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-20">
      <p class="text-red-600 mb-4">{{ error }}</p>
      <button 
        @click="fetchBerita"
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Coba Lagi
      </button>
    </div>

    <!-- Content -->
    <div v-else>
      <!-- Berita Utama -->
      <section v-if="newsItems.length > 0" class="mb-8">
        <div class="relative w-full h-96 rounded-lg overflow-hidden group cursor-pointer" @click="navigateToDetail(newsItems[0].id)">
          <img 
            :src="newsItems[0].image" 
            :alt="newsItems[0].title" 
            class="w-full h-full object-cover brightness-110 group-hover:scale-105 transition-transform duration-300"
            @error="handleImageError"
          />
          <div class="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-black via-transparent to-transparent">
            <h2 class="text-white text-2xl font-bold hover:underline transition-all duration-300">
              {{ newsItems[0].title }}
            </h2>
          </div>
          <!-- Featured Badge -->
          <div class="absolute top-4 left-4">
            <span class="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              Berita Utama
            </span>
          </div>
        </div>
      </section>

      <!-- Empty State -->
      <div v-else class="text-center py-20">
        <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
        </svg>
        <h3 class="text-xl font-medium text-gray-600 mb-2">Belum ada berita</h3>
        <p class="text-gray-500">Berita akan segera hadir untuk Anda</p>
      </div>

      <!-- Daftar Berita dengan Pagination -->
      <section v-if="newsItems.length > 1">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-2xl font-semibold font-poppins">Berita Lainnya</h2>
          <span class="text-sm text-gray-500">{{ newsItems.length }} berita tersedia</span>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6 mb-8">
          <div 
            v-for="news in currentItems" 
            :key="news.id" 
            class="flex items-center gap-4 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
            @click="navigateToDetail(news.id)"
          >
            <div class="relative w-32 h-20 flex-shrink-0">
              <img 
                :src="news.image" 
                :alt="news.title" 
                class="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                @error="handleImageError"
              />
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-bold hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                {{ news.title }}
              </h3>
              <p class="text-gray-600 text-sm mt-1 line-clamp-2">
                {{ news.description }}
              </p>
              <div class="flex items-center justify-between mt-2">
                <p class="text-gray-500 text-xs">{{ formatDate(news.date) }}</p>
                <svg class="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Custom Pagination -->
        <div v-if="totalPages > 1" class="flex justify-center items-center space-x-2">
          <!-- Previous Button -->
          <button
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          
          <!-- Page Numbers -->
          <button
            v-for="page in visiblePages"
            :key="page"
            @click="goToPage(page)"
            class="px-3 py-2 text-sm font-medium rounded-md transition-colors"
            :class="{
              'text-white bg-blue-600 border border-blue-600': page === currentPage,
              'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50': page !== currentPage
            }"
          >
            {{ page }}
          </button>
          
          <!-- Next Button -->
          <button
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>

        <!-- Page Info -->
        <div class="text-center mt-4 text-sm text-gray-500">
          Halaman {{ currentPage }} dari {{ totalPages }} | 
          Menampilkan {{ currentItems.length }} dari {{ newsItems.length }} berita
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Types
/**
 * @typedef {Object} NewsItem
 * @property {number} id
 * @property {string} title
 * @property {string} image
 * @property {string} description
 * @property {string} date
 */

// Reactive state
const newsItems = ref([])
const currentPage = ref(1)
const loading = ref(false)
const error = ref('')
const itemsPerPage = 8

// Computed
const currentDate = computed(() => {
  return new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

const totalPages = computed(() => {
  return Math.ceil(Math.max(0, newsItems.value.length - 1) / itemsPerPage)
})

const currentItems = computed(() => {
  // Skip first item (featured news) for pagination
  const itemsForPagination = newsItems.value.slice(1)
  const startIndex = (currentPage.value - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  return itemsForPagination.slice(startIndex, endIndex)
})

const visiblePages = computed(() => {
  const pages = []
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
const fetchBerita = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const response = await $fetch('/api/berita')
    
    if (response.success && response.data) {
      const formattedData = response.data.map((item) => ({
        id: item.id,
        title: item.title || item.nama || 'Berita Tanpa Judul',
        image: item.image_url || item.image || '/placeholder-news.jpg',
        description: item.deskripsi || item.description || 'Tidak ada deskripsi',
        date: item.date || item.created_at || new Date().toISOString(),
      }))
      
      newsItems.value = formattedData
    } else {
      newsItems.value = []
    }
  } catch (err) {
    console.error('Error fetching news:', err)
    error.value = 'Gagal memuat berita. Silakan coba lagi.'
    
    // Fallback with mock data for development
    if (process.dev) {
      newsItems.value = [
        {
          id: 1,
          title: "Inovasi Digital Transformasi Pelayanan Publik di Era Modern",
          image: "/placeholder-news.jpg",
          description: "Pemerintah daerah mengimplementasikan sistem digital untuk meningkatkan kualitas pelayanan kepada masyarakat.",
          date: new Date().toISOString()
        },
        {
          id: 2,
          title: "Workshop Laboratorium Inovasi untuk Aparatur Sipil Negara",
          image: "/placeholder-news.jpg", 
          description: "Pelatihan intensif untuk meningkatkan kapasitas inovasi ASN dalam melayani masyarakat.",
          date: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: 3,
          title: "Kolaborasi Antar Daerah dalam Pengembangan Inovasi Berkelanjutan",
          image: "/placeholder-news.jpg",
          description: "Sinergi lintas wilayah untuk menciptakan solusi inovatif yang dapat diadopsi secara nasional.",
          date: new Date(Date.now() - 172800000).toISOString()
        }
      ]
    }
  } finally {
    loading.value = false
  }
}

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value && page !== currentPage.value) {
    currentPage.value = page
    // Scroll to top of news section
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const navigateToDetail = (id) => {
  // Navigate to news detail page
  navigateTo(`/berita/${id}`)
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

const handleImageError = (event) => {
  const target = event.target
  target.src = '/placeholder-news.jpg'
}

// Lifecycle
onMounted(() => {
  fetchBerita()
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

/* Custom transitions */
.transition-all {
  transition: all 0.3s ease;
}

/* Hover effects */
.group:hover .group-hover\:scale-105 {
  transform: scale(1.05);
}

.group:hover .group-hover\:text-blue-600 {
  color: #2563eb;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>