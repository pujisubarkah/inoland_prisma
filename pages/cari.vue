<!-- pages/cari.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header Section -->
    <section class="bg-gradient-to-r from-emerald-600 to-teal-700 text-white py-16">
      <div class="container mx-auto px-6 text-center">
        <h1 class="text-4xl font-bold mb-4">Cari Inovasi</h1>
        <p class="text-xl mb-8">Temukan inovasi terbaik dari berbagai daerah di Indonesia</p>
        
        <!-- Search Bar -->
        <div class="max-w-2xl mx-auto">
          <div class="relative">
            <input
              v-model="searchQuery"
              @keyup.enter="handleSearch"
              type="text"
              placeholder="Cari berdasarkan nama inovasi, instansi, atau daerah..."
              class="w-full px-6 py-4 pr-16 rounded-full text-gray-800 text-lg focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-30"
            />
            <button 
              @click="handleSearch"
              class="absolute right-2 top-2 bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-full transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Filter Section -->
    <section class="bg-white shadow-sm border-b">
      <div class="container mx-auto px-6 py-4">
        <div class="flex flex-wrap items-center gap-4">
          <!-- Category Filter -->
          <div class="flex items-center space-x-2">
            <label class="text-sm font-medium text-gray-700">Kategori:</label>
            <select 
              v-model="selectedCategory"
              @change="handleSearch"
              class="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">Semua Kategori</option>
              <option value="digitalisasi">Digitalisasi</option>
              <option value="pelayanan">Pelayanan Publik</option>
              <option value="tata_kelola">Tata Kelola</option>
              <option value="ekonomi">Ekonomi</option>
              <option value="lingkungan">Lingkungan</option>
            </select>
          </div>

          <!-- Province Filter -->
          <div class="flex items-center space-x-2">
            <label class="text-sm font-medium text-gray-700">Provinsi:</label>
            <select 
              v-model="selectedProvince"
              @change="handleSearch"
              class="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">Semua Provinsi</option>
              <option value="jawa-barat">Jawa Barat</option>
              <option value="jawa-tengah">Jawa Tengah</option>
              <option value="jawa-timur">Jawa Timur</option>
              <option value="dki-jakarta">DKI Jakarta</option>
              <option value="banten">Banten</option>
            </select>
          </div>

          <!-- Year Filter -->
          <div class="flex items-center space-x-2">
            <label class="text-sm font-medium text-gray-700">Tahun:</label>
            <select 
              v-model="selectedYear"
              @change="handleSearch"
              class="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">Semua Tahun</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
            </select>
          </div>

          <!-- Reset Filter -->
          <button 
            @click="resetFilters"
            class="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
          >
            Reset Filter
          </button>
        </div>
      </div>
    </section>

    <!-- Results Section -->
    <section class="container mx-auto px-6 py-8">
      <!-- Search Info -->
      <div class="flex justify-between items-center mb-6">
        <div>
          <p class="text-gray-600">
            <span v-if="searchQuery">Hasil pencarian untuk "<strong>{{ searchQuery }}</strong>"</span>
            <span v-else>Menampilkan semua inovasi</span>
          </p>
          <p class="text-sm text-gray-500">Ditemukan {{ totalResults }} inovasi</p>
        </div>
        
        <!-- Sort Options -->
        <div class="flex items-center space-x-2">
          <label class="text-sm text-gray-700">Urutkan:</label>
          <select 
            v-model="sortBy"
            @change="handleSearch"
            class="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="newest">Terbaru</option>
            <option value="oldest">Terlama</option>
            <option value="name">Nama A-Z</option>
            <option value="popular">Terpopuler</option>
          </select>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>

      <!-- No Results -->
      <div v-else-if="innovations.length === 0" class="text-center py-20">
        <svg class="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.5-.9-6.122-2.377M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
        <h3 class="text-xl font-medium text-gray-600 mb-2">Tidak ada inovasi ditemukan</h3>
        <p class="text-gray-500">Coba ubah kata kunci pencarian atau filter yang digunakan</p>
      </div>

      <!-- Innovation Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="innovation in innovations" 
          :key="innovation.id"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
          @click="navigateToDetail(innovation.id)"
        >
          <!-- Innovation Image -->
          <div class="h-48 bg-gradient-to-br from-emerald-400 to-teal-500 relative">
            <img 
              v-if="innovation.image"
              :src="innovation.image" 
              :alt="innovation.title"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
              <div class="text-white text-center">
                <svg class="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clip-rule="evenodd"/>
                </svg>
              </div>
            </div>
          </div>
          
          <!-- Innovation Content -->
          <div class="p-6">
            <div class="flex items-start justify-between mb-3">
              <span class="inline-block bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full">
                {{ innovation.category }}
              </span>
              <span class="text-xs text-gray-500">{{ innovation.year }}</span>
            </div>
            
            <h3 class="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
              {{ innovation.title }}
            </h3>
            
            <p class="text-sm text-gray-600 mb-3 line-clamp-2">
              {{ innovation.description }}
            </p>
            
            <div class="flex items-center justify-between text-sm">
              <div class="flex items-center text-gray-500">
                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                </svg>
                {{ innovation.location }}
              </div>
              <div class="flex items-center text-gray-500">
                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                {{ innovation.agency }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="mt-12 flex justify-center">
        <nav class="flex items-center space-x-2">
          <button
            v-if="currentPage > 1"
            @click="goToPage(currentPage - 1)"
            class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Previous
          </button>
          
          <button
            v-for="page in visiblePages"
            :key="page"
            @click="goToPage(page)"
            class="px-3 py-2 text-sm font-medium rounded-md"
            :class="{
              'text-white bg-emerald-600 border border-emerald-600': page === currentPage,
              'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50': page !== currentPage
            }"
          >
            {{ page }}
          </button>
          
          <button
            v-if="currentPage < totalPages"
            @click="goToPage(currentPage + 1)"
            class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Next
          </button>
        </nav>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

// Meta
useHead({
  title: 'Cari Inovasi - Inolands',
  meta: [
    { name: 'description', content: 'Cari dan temukan inovasi terbaik dari berbagai daerah di Indonesia' }
  ]
})

// Reactive state
const searchQuery = ref('')
const selectedCategory = ref('')
const selectedProvince = ref('')
const selectedYear = ref('')
const sortBy = ref('newest')
const loading = ref(false)
const innovations = ref([])
const currentPage = ref(1)
const totalResults = ref(0)
const itemsPerPage = 12

// Mock data for demonstration
const mockInnovations = [
  {
    id: 1,
    title: "Sistem Pelayanan Digital Terpadu",
    description: "Platform digital untuk mempermudah pelayanan publik dengan sistem terintegrasi satu pintu.",
    category: "Digitalisasi",
    location: "Jakarta",
    agency: "Pemprov DKI",
    year: "2024",
    image: null
  },
  {
    id: 2,
    title: "Smart Waste Management",
    description: "Sistem pengelolaan sampah pintar dengan teknologi IoT dan machine learning.",
    category: "Lingkungan",
    location: "Surabaya",
    agency: "Pemkot Surabaya",
    year: "2023",
    image: null
  },
  {
    id: 3,
    title: "E-Government Terintegrasi",
    description: "Portal pemerintahan elektronik yang mengintegrasikan seluruh layanan pemerintah daerah.",
    category: "Tata Kelola",
    location: "Bandung",
    agency: "Pemkot Bandung",
    year: "2024",
    image: null
  },
  {
    id: 4,
    title: "Aplikasi UMKM Digital",
    description: "Platform untuk memberdayakan UMKM melalui digitalisasi dan pemasaran online.",
    category: "Ekonomi",
    location: "Yogyakarta",
    agency: "Pemkot Yogyakarta",
    year: "2023",
    image: null
  },
  {
    id: 5,
    title: "Telemedicine Rural",
    description: "Layanan kesehatan jarak jauh untuk daerah terpencil menggunakan teknologi digital.",
    category: "Pelayanan",
    location: "Lombok",
    agency: "Pemkab Lombok",
    year: "2024",
    image: null
  },
  {
    id: 6,
    title: "Blockchain Land Certificate",
    description: "Sistem sertifikat tanah menggunakan teknologi blockchain untuk keamanan data.",
    category: "Tata Kelola",
    location: "Bali",
    agency: "Pemprov Bali",
    year: "2023",
    image: null
  }
]

// Computed
const totalPages = computed(() => Math.ceil(totalResults.value / itemsPerPage))

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
const handleSearch = async () => {
  loading.value = true
  currentPage.value = 1
  
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Filter mock data based on search criteria
    let filteredData = [...mockInnovations]
    
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      filteredData = filteredData.filter(item => 
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query) ||
        item.agency.toLowerCase().includes(query)
      )
    }
    
    if (selectedCategory.value) {
      filteredData = filteredData.filter(item => 
        item.category.toLowerCase() === selectedCategory.value.toLowerCase()
      )
    }
    
    if (selectedYear.value) {
      filteredData = filteredData.filter(item => item.year === selectedYear.value)
    }
    
    // Sort data
    if (sortBy.value === 'name') {
      filteredData.sort((a, b) => a.title.localeCompare(b.title))
    } else if (sortBy.value === 'oldest') {
      filteredData.sort((a, b) => a.year.localeCompare(b.year))
    } else {
      filteredData.sort((a, b) => b.year.localeCompare(a.year))
    }
    
    totalResults.value = filteredData.length
    
    // Pagination
    const startIndex = (currentPage.value - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    innovations.value = filteredData.slice(startIndex, endIndex)
    
  } catch (error) {
    console.error('Error searching innovations:', error)
  } finally {
    loading.value = false
  }
}

const resetFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
  selectedProvince.value = ''
  selectedYear.value = ''
  sortBy.value = 'newest'
  handleSearch()
}

const goToPage = (page) => {
  currentPage.value = page
  handleSearch()
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const navigateToDetail = (id) => {
  // Navigate to detail page (placeholder)
  console.log('Navigate to innovation detail:', id)
  // navigateTo(`/inovasi/${id}`)
}

// Lifecycle
onMounted(() => {
  handleSearch()
})

// Watch for page changes
watch(currentPage, () => {
  handleSearch()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Custom transitions */
.transition-shadow {
  transition: box-shadow 0.3s ease;
}
</style>