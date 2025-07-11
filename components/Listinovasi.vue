<template>
  <div class="app">
    <div class="container">
      <div class="box">
        <h1 class="title">TEMUKAN INOVASI</h1>
        <hr class="divider" />

        <div class="search-wrapper">
          <div class="search-box">
            <input
              type="text"
              placeholder="Cari Ide Inovasi/Pemda/Inovator"
              v-model="searchTerm"
            />
            <i class="fas fa-search search-icon"></i>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="loading">
          <div class="spinner"></div>
          <p>Memuat data...</p>
        </div>

        <!-- Table -->
        <table v-else-if="currentInovasi.length" class="table">
          <thead>
            <tr>
              <th @click="handleSort('judul_inovasi')">Judul Inovasi</th>
              <th @click="handleSort('sdgs')">SDGS</th>
              <th @click="handleSort('tahun')">Tahun</th>
              <th @click="handleSort('kld')">Pemda</th>
              <th @click="handleSort('inovator')">Inovator</th>
              <th @click="handleSort('deskripsi')">Deskripsi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="inovasi in currentInovasi" :key="inovasi.id">
              <td>{{ inovasi.judul_inovasi }}</td>
              <td>
                <img v-if="inovasi.sdgs" :src="inovasi.sdgs.image" width="75" />
                <div>{{ inovasi.sdgs?.sdgs || 'N/A' }}</div>
              </td>
              <td>{{ inovasi.tahun }}</td>
              <td>{{ inovasi.kld }}</td>
              <td>{{ inovasi.inovator }}</td>
              <td>{{ inovasi.deskripsi }}</td>
            </tr>
          </tbody>
        </table>
        
        <!-- No Results -->
        <div v-else-if="!loading" class="no-result">
          <p>Tidak ada inovasi yang ditemukan.</p>
        </div>

        <!-- Error State -->
        <div v-if="error" class="error-message">
          <p>{{ error }}</p>
          <button @click="loadInovasi" class="retry-btn">Coba Lagi</button>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1 && !loading" class="pagination">
          <button v-if="currentPage > 1" @click="changePage(currentPage - 1)">Prev</button>

          <button
            v-for="page in pagesToShow"
            :key="page"
            :class="{ active: page === currentPage }"
            @click="changePage(page)"
          >
            {{ page }}
          </button>

          <button v-if="currentPage < totalPages" @click="changePage(currentPage + 1)">Next</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'

interface Inovasi {
  id: number
  judul_inovasi: string
  sdgs?: {
    image: string
    sdgs: string
  }
  tahun: number
  kld: string
  inovator: string
  deskripsi: string
}

// Reactive State
const inovasiData = ref<Inovasi[]>([])
const currentPage = ref(1)
const itemsPerPage = 5
const searchTerm = ref('')
const loading = ref(false)
const error = ref('')

// Load Data Function
const loadInovasi = async () => {
  try {
    loading.value = true
    error.value = ''
    
    const response = await fetch('/api/inolands')
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    
    // Validate response data
    if (Array.isArray(data)) {
      inovasiData.value = data
    } else if (data && Array.isArray(data.data)) {
      // Handle case where data is wrapped in an object
      inovasiData.value = data.data
    } else {
      throw new Error('Invalid data format received from API')
    }
    
  } catch (err) {
    console.error('Error fetching inovasi:', err)
    error.value = err instanceof Error ? err.message : 'Terjadi kesalahan saat memuat data'
    inovasiData.value = []
  } finally {
    loading.value = false
  }
}

// Computed Properties
const filteredInovasi = computed(() => {
  if (!searchTerm.value) return inovasiData.value
  
  const term = searchTerm.value.toLowerCase()
  return inovasiData.value.filter((inovasi) => {
    return (
      inovasi.judul_inovasi?.toLowerCase().includes(term) ||
      inovasi.tahun?.toString().includes(term) ||
      inovasi.kld?.toLowerCase().includes(term) ||
      inovasi.inovator?.toLowerCase().includes(term) ||
      inovasi.deskripsi?.toLowerCase().includes(term) ||
      inovasi.sdgs?.sdgs?.toLowerCase().includes(term)
    )
  })
})

const totalPages = computed(() => Math.ceil(filteredInovasi.value.length / itemsPerPage))

const currentInovasi = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredInovasi.value.slice(start, end)
})

const pagesToShow = computed(() => {
  const pages = []
  const maxPages = 5
  const start = Math.max(1, currentPage.value - 2)
  
  for (let i = 0; i < maxPages && start + i <= totalPages.value; i++) {
    pages.push(start + i)
  }
  
  return pages
})

// Methods
const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const handleSort = (field: keyof Inovasi) => {
  const sortedData = [...inovasiData.value].sort((a, b) => {
    const aValue = a[field]
    const bValue = b[field]
    
    if (aValue === undefined || aValue === null) return 1
    if (bValue === undefined || bValue === null) return -1
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return aValue.toLowerCase().localeCompare(bValue.toLowerCase())
    }
    
    if (aValue < bValue) return -1
    if (aValue > bValue) return 1
    return 0
  })
  
  inovasiData.value = sortedData
}

// Watchers
watch(searchTerm, () => {
  currentPage.value = 1 // Reset to first page when searching
})

// Lifecycle
onMounted(() => {
  loadInovasi()
})
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.box {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 5px;
  width: 100%;
  max-width: 1200px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.title {
  font-family: 'Poppins', sans-serif;
  font-weight: bold;
  font-size: 2rem;
  text-align: center;
  margin: 20px 0 10px;
}

.divider {
  width: 100px;
  height: 2px;
  background: linear-gradient(to right, #16578d, black, #16578d);
  margin: 0 auto 20px;
  border: none;
}

.search-wrapper {
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

.search-box {
  position: relative;
}

.search-box input {
  padding: 10px 10px 10px 30px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 350px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.search-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #ccc;
}

.table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
}

.table th,
.table td {
  padding: 15px;
  border-bottom: 1px solid #ddd;
  text-align: left;
}

.table thead tr {
  background-color: #444;
  color: white;
  cursor: pointer;
}

.table th:hover {
  background-color: #555;
}

.table tbody tr:hover {
  background-color: #f5f5f5;
}

.no-result {
  text-align: center;
  padding: 40px 20px;
  color: #666;
}

.pagination {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  gap: 5px;
}

.pagination button {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
  color: #000;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pagination button:hover {
  background-color: #e9e9e9;
}

.pagination button.active {
  background-color: #444;
  color: #fff;
  border-color: #444;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Loading Styles */
.loading {
  text-align: center;
  padding: 40px 20px;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #444;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto 10px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Error Styles */
.error-message {
  text-align: center;
  padding: 20px;
  background-color: #fee;
  border: 1px solid #fcc;
  border-radius: 5px;
  margin: 20px 0;
}

.error-message p {
  color: #c33;
  margin-bottom: 10px;
}

.retry-btn {
  background-color: #444;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.retry-btn:hover {
  background-color: #555;
}

/* Responsive Design */
@media (max-width: 768px) {
  .search-box input {
    width: 100%;
    max-width: 300px;
  }
  
  .table {
    font-size: 14px;
  }
  
  .table th,
  .table td {
    padding: 10px 8px;
  }
}

@media (max-width: 480px) {
  .box {
    padding: 15px;
  }
  
  .title {
    font-size: 1.5rem;
  }
  
  .search-box input {
    width: 250px;
  }
  
  .pagination {
    flex-wrap: wrap;
  }
  
  .pagination button {
    padding: 6px 10px;
    font-size: 14px;
  }
}
</style>
