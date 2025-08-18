<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Page Header -->
    <div class="bg-white px-8 py-8 border-b border-gray-200 shadow-sm">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-4xl font-bold mb-2 bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent">
            Daftar Inovasi
          </h1>
          <p class="text-slate-600 text-lg font-normal">
            Daftar lengkap inovasi daerah dengan fitur pencarian dan filter
          </p>
        </div>
        
        <!-- Navigation Links -->
        <div class="flex space-x-4">
          <NuxtLink 
            to="/cari/maps_inovasi"
            class="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
          >
            SEBARAN INOVASI
          </NuxtLink>
          <NuxtLink 
            to="/cari/dashboard_inovasi"
            class="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
          >
            DASHBOARD
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Search and Filter Section -->
    <div class="p-8 pb-4">
      <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div class="flex flex-col md:flex-row gap-4">          <div class="flex-1">
            <input 
              type="text" 
              placeholder="Cari judul inovasi, deskripsi, instansi, kategori instansi, inovator, atau alamat..." 
              v-model="searchTerm"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
          </div>
          <div class="flex gap-4">
            <select 
              v-model="selectedYear"
              class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Semua Tahun</option>
              <option v-for="year in availableYears" :key="year" :value="year">{{ year }}</option>
            </select>
            <select 
              v-model="selectedSDGS"
              class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Semua SDGS</option>
              <option v-for="sdgs in availableSDGS" :key="sdgs" :value="sdgs">{{ sdgs }}</option>
            </select>
            <button 
              @click="resetFilters"
              class="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>    <!-- Main Content -->
    <div class="px-8 pb-8">
      <div class="bg-white rounded-lg shadow-sm p-6">
        <!-- Download Section -->
        <div v-if="filteredInovasi.length > 0 && !loading" class="mb-6 flex items-center justify-between download-section">
          <div class="flex items-center gap-4">
            <h3 class="text-lg font-semibold text-gray-900">
              {{ filteredInovasi.length }} inovasi ditemukan
            </h3>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-sm text-gray-600">Export data:</span>            <select 
              v-model="selectedExportFormat"
              class="export-select"
            >
              <option value="xlsx">Excel (.xlsx)</option>
              <option value="csv">CSV (.csv)</option>
              <option value="pdf">PDF (.pdf)</option>
            </select>            <button 
              @click="downloadData"
              :disabled="isDownloading"
              class="download-btn"
            >
              <i v-if="!isDownloading" class="fas fa-download"></i>
              <i v-else class="fas fa-spinner fa-spin"></i>
              <span v-if="!isDownloading">Download</span>
              <span v-else>Mengunduh...</span>
            </button>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="loading">
          <div class="spinner"></div>
          <p>Memuat data...</p>
        </div>

        <!-- Table -->
        <div v-else-if="currentInovasi.length" class="overflow-x-auto">          <table class="modern-table">
            <thead>
              <tr>
                <th @click="handleSort('judul_inovasi')" class="sortable w-1/4">
                  <div class="header-content">
                    <span>Judul Inovasi</span>
                    <i :class="getSortIcon('judul_inovasi')" class="sort-icon"></i>
                  </div>
                </th>
                <th @click="handleSort('sdgs')" class="sortable w-20">
                  <div class="header-content">
                    <span>SDGS</span>
                    <i :class="getSortIcon('sdgs')" class="sort-icon"></i>
                  </div>
                </th>
                <th @click="handleSort('tahun')" class="sortable w-16">
                  <div class="header-content">
                    <span>Tahun</span>
                    <i :class="getSortIcon('tahun')" class="sort-icon"></i>
                  </div>
                </th>                <th @click="handleSort('instansi')" class="sortable w-1/6">
                  <div class="header-content">
                    <span>Instansi</span>
                    <i :class="getSortIcon('instansi')" class="sort-icon"></i>
                  </div>
                </th>
                <th @click="handleSort('inovator')" class="sortable w-1/6">
                  <div class="header-content">
                    <span>Inovator/Unit Kerja</span>
                    <i :class="getSortIcon('inovator')" class="sort-icon"></i>
                  </div>
                </th>
                <th @click="handleSort('deskripsi')" class="sortable w-1/3">
                  <div class="header-content">
                    <span>Deskripsi</span>
                    <i :class="getSortIcon('deskripsi')" class="sort-icon"></i>
                  </div>
                </th>
              </tr>
            </thead>            <tbody>              <tr v-for="inovasi in currentInovasi" :key="inovasi.id">
                <td class="font-medium text-gray-900" data-label="Judul Inovasi">
                  <div class="max-w-sm">
                    {{ inovasi.judul_inovasi }}
                  </div>
                </td>
                <td class="text-center" data-label="SDGS">
                  <div class="flex flex-col items-center gap-2">
                    <img v-if="inovasi.sdgs?.image" :src="inovasi.sdgs.image" width="50" class="rounded" />
                    <span class="text-xs text-gray-700 font-medium">{{ inovasi.sdgs?.nama || 'N/A' }}</span>
                  </div>
                </td>
                <td class="text-center" data-label="Tahun">
                  <span class="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {{ inovasi.tahun }}
                  </span>
                </td>                <td class="text-gray-700" data-label="Instansi">
                  <div class="max-w-32">
                    <div class="font-medium text-gray-900">
                      {{ inovasi.instansi?.agency_name || inovasi.kld || 'N/A' }}
                    </div>
                    <div v-if="inovasi.instansi?.kat_instansi" class="text-xs text-gray-500 mt-1">
                      {{ inovasi.instansi.kat_instansi }}
                    </div>
                  </div>
                </td>                <td class="text-gray-700" data-label="Inovator">
                  <div class="max-w-32">
                    <div class="font-medium text-gray-900 mb-1 flex items-center gap-1">
                      <span>{{ inovasi.inovator || 'N/A' }}</span>
                      <span class="text-xs text-gray-500">({{ inovasi.inovator_detail?.inovator || 'N/A' }})</span>
                      <button 
                        @click="showAddressInfo(inovasi, $event)"
                        class="inline-flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                        title="Lihat alamat"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                      </button>
                    </div>
                    
                    <!-- Google Maps Link -->
                    <div v-if="inovasi.inovator_detail?.longlat" class="mt-0.5">
                      <a 
                        :href="getGoogleMapsUrl(inovasi.inovator_detail.longlat)"
                        target="_blank"
                        class="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 transition-colors font-medium maps-link"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" class="flex-shrink-0">
                          <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM10 5.47l4 1.4v11.66l-4-1.4V5.47zm-5 .99l3-1.01v11.7l-3 1.01V6.46zm14 11.08l-3 1.01V6.86l3-1.01v11.69z"/>
                        </svg>
                        <span>Lihat Lokasi</span>
                      </a>
                    </div>
                    <div v-else class="mt-0.5">
                      <span class="text-xs text-gray-400 italic">Maps belum tersedia</span>
                    </div>
                  </div>
                </td>
                <td class="text-gray-600 text-sm" data-label="Deskripsi">
                  <div class="max-w-md">
                    <div v-if="!inovasi.deskripsi" class="text-gray-400 italic">
                      Tidak ada deskripsi
                    </div>
                    <div v-else>
                      <div v-if="!expandedDescriptions.has(inovasi.id) && inovasi.deskripsi.length > 200">
                        {{ inovasi.deskripsi.substring(0, 200) }}...
                        <button 
                          @click="toggleDescription(inovasi.id)"
                          class="text-blue-600 hover:text-blue-800 font-medium ml-1 underline text-xs"
                        >
                          Baca Selengkapnya
                        </button>
                      </div>
                      <div v-else>
                        {{ inovasi.deskripsi }}
                        <button 
                          v-if="inovasi.deskripsi.length > 200"
                          @click="toggleDescription(inovasi.id)"
                          class="text-blue-600 hover:text-blue-800 font-medium ml-1 underline text-xs"
                        >
                          Sembunyikan
                        </button>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- No Results -->
        <div v-else-if="!loading" class="no-result">
          <div class="text-center py-12">
            <i class="fas fa-search text-gray-400 text-4xl mb-4"></i>
            <p class="text-gray-500 text-lg">Tidak ada inovasi yang ditemukan.</p>
            <p class="text-gray-400 text-sm mt-2">Coba gunakan kata kunci yang berbeda atau reset filter.</p>
          </div>
        </div>

        <!-- Error State -->
        <div v-if="error" class="error-message">
          <div class="text-center py-12">
            <i class="fas fa-exclamation-triangle text-red-400 text-4xl mb-4"></i>
            <p class="text-red-600 text-lg mb-4">{{ error }}</p>
            <button @click="loadInovasi" class="retry-btn">
              <i class="fas fa-redo mr-2"></i>
              Coba Lagi
            </button>
          </div>
        </div>        <!-- Pagination -->
        <div v-if="filteredInovasi.length > 0 && !loading" class="pagination-modern">
          <div class="flex items-center justify-between flex-wrap gap-4">
            <div class="flex items-center gap-4">
              <div class="text-sm text-gray-700">
                Menampilkan {{ (currentPage - 1) * itemsPerPage + 1 }} - {{ Math.min(currentPage * itemsPerPage, filteredInovasi.length) }} 
                dari {{ filteredInovasi.length }} hasil
              </div>
              <div class="flex items-center gap-2">
                <span class="text-sm text-gray-600">Tampilkan:</span>
                <select 
                  v-model="itemsPerPage" 
                  @change="changeItemsPerPage(Number(($event.target as HTMLSelectElement)?.value || itemsPerPage))"
                  class="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option :value="25">25</option>
                  <option :value="50">50</option>
                  <option :value="100">100</option>
                </select>
                <span class="text-sm text-gray-600">per halaman</span>
              </div>
            </div>
            <div v-if="totalPages > 1" class="flex gap-2">
              <button 
                v-if="currentPage > 1" 
                @click="changePage(currentPage - 1)"
                class="pagination-btn"
              >
                <i class="fas fa-chevron-left"></i>
                Prev
              </button>

              <button
                v-for="page in pagesToShow"
                :key="page"
                :class="['pagination-btn', { 'active': page === currentPage }]"
                @click="changePage(page)"
              >
                {{ page }}
              </button>

              <button 
                v-if="currentPage < totalPages" 
                @click="changePage(currentPage + 1)"
                class="pagination-btn"
              >
                Next
                <i class="fas fa-chevron-right"></i>
              </button>            </div>
          </div>
        </div>
      </div>
    </div>      <!-- Address Info Tooltip -->
    <div v-if="showAddressPopup" class="address-tooltip" :data-position="tooltipSide" :style="tooltipPosition" @click.stop="closeAddressPopup">
      <div class="address-tooltip-content">
        <div class="text-xs font-medium text-gray-200 mb-1">Alamat:</div>
        <div class="text-xs text-gray-100 leading-relaxed">{{ selectedInovatorAddress }}</div>
      </div>
      <div class="address-tooltip-arrow"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

interface Inovasi {
  id: number
  judul_inovasi: string
  sdgs?: {
    id: number
    tujuan_ke: number
    nama: string  // This matches the API response
    image: string
  }
  tahun: number
  kld: string // Keep this for backward compatibility but will use instansi.agency_name
  inovator: string // Keep this for backward compatibility but will use inovator_detail.inovator
  deskripsi: string
  instansi?: {
    id: number
    agency_id: string
    agency_name: string
    agency_category_id: number
    kat_instansi: string
  }
  inovator_detail?: {
    id: number
    inovator: string
    alamat: string
    longlat: string
  }
  showFullDescription?: boolean  // Add this for tracking expanded state
}

useHead({
  title: 'List Inovasi | INOLAND',
  meta: [
    {
      name: 'description',
      content: 'Daftar list lengkap idéinovasi daerah dengan fitur pencarian dan filter'
    },
    {
      property: 'og:title',
      content: 'List Inovasi | INOLAND'
    },
    {
      property: 'og:description',
      content: 'Daftar list lengkap ide inovasi daerah dengan fitur pencarian dan filter'
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
      content: 'List Inovasi | INOLAND'
    },
    {
      name: 'twitter:description',
      content: 'Daftar list lengkap ide inovasi daerah dengan fitur pencarian dan filter'
    }
  ]
})

// Reactive State
const inovasiData = ref<Inovasi[]>([])
const currentPage = ref(1)
const itemsPerPage = ref(25)  // Changed to reactive ref with default 25
const searchTerm = ref('')
const selectedYear = ref('')
const selectedSDGS = ref('')
const loading = ref(false)
const error = ref('')
const sortField = ref<keyof Inovasi | ''>('tahun')
const sortDirection = ref<'asc' | 'desc'>('desc')
const expandedDescriptions = ref<Set<number>>(new Set())
const selectedExportFormat = ref<'xlsx' | 'csv' | 'pdf'>('xlsx')
const isDownloading = ref(false)
const showAddressPopup = ref(false)
const selectedInovatorAddress = ref<string>('')
const selectedInovatorName = ref<string>('')
const tooltipPosition = ref({top: '0px', left: '0px'})
const tooltipSide = ref<'right' | 'left'>('right')

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
const availableYears = computed(() => {
  const years = [...new Set(inovasiData.value.map(item => item.tahun))].filter(Boolean)
  return years.sort((a, b) => b - a) // Sort descending
})

const availableSDGS = computed(() => {
  const sdgs = [...new Set(inovasiData.value.map(item => item.sdgs?.nama).filter(Boolean))]
  return sdgs.sort()
})

const filteredInovasi = computed(() => {
  let filtered = inovasiData.value
  // Text search filter
  if (searchTerm.value) {
    const term = searchTerm.value.toLowerCase()
    filtered = filtered.filter((inovasi) => {
      return (
        inovasi.judul_inovasi?.toLowerCase().includes(term) ||
        inovasi.kld?.toLowerCase().includes(term) ||
        inovasi.instansi?.agency_name?.toLowerCase().includes(term) ||
        inovasi.instansi?.kat_instansi?.toLowerCase().includes(term) ||
        inovasi.inovator?.toLowerCase().includes(term) ||
        inovasi.inovator_detail?.inovator?.toLowerCase().includes(term) ||
        inovasi.inovator_detail?.alamat?.toLowerCase().includes(term) ||
        inovasi.deskripsi?.toLowerCase().includes(term) ||
        inovasi.sdgs?.nama?.toLowerCase().includes(term)
      )
    })
  }

  // Year filter
  if (selectedYear.value) {
    filtered = filtered.filter(inovasi => inovasi.tahun?.toString() === selectedYear.value)
  }
  // SDGS filter
  if (selectedSDGS.value) {
    filtered = filtered.filter(inovasi => inovasi.sdgs?.nama === selectedSDGS.value)
  }

  // Apply sorting
  if (sortField.value) {
    filtered = [...filtered].sort((a, b) => {
      const aValue = a[sortField.value as keyof Inovasi]
      const bValue = b[sortField.value as keyof Inovasi]
      
      if (aValue === undefined || aValue === null) return 1
      if (bValue === undefined || bValue === null) return -1
      
      let comparison = 0
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        comparison = aValue.toLowerCase().localeCompare(bValue.toLowerCase())
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        comparison = aValue - bValue
      } else {
        comparison = String(aValue).localeCompare(String(bValue))
      }
      
      return sortDirection.value === 'asc' ? comparison : -comparison
    })
  }

  return filtered
})

const totalPages = computed(() => Math.ceil(filteredInovasi.value.length / itemsPerPage.value))

const currentInovasi = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
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
  if (sortField.value === field) {
    // Toggle direction if same field
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    // Set new field and default to ascending
    sortField.value = field
    sortDirection.value = 'asc'
  }
}

const getSortIcon = (field: keyof Inovasi) => {
  if (sortField.value !== field) {
    return 'fas fa-sort text-gray-400'
  }
  return sortDirection.value === 'asc' 
    ? 'fas fa-sort-up text-blue-600' 
    : 'fas fa-sort-down text-blue-600'
}

const resetFilters = () => {
  searchTerm.value = ''
  selectedYear.value = ''
  selectedSDGS.value = ''
  sortField.value = 'tahun'  // Reset to default sort by year
  sortDirection.value = 'desc'  // Reset to default descending
  currentPage.value = 1
}

const toggleDescription = (inovasiId: number) => {
  if (expandedDescriptions.value.has(inovasiId)) {
    expandedDescriptions.value.delete(inovasiId)
  } else {
    expandedDescriptions.value.add(inovasiId)
  }
}

const changeItemsPerPage = (newItemsPerPage: number) => {
  itemsPerPage.value = newItemsPerPage
  currentPage.value = 1  // Reset to first page when changing items per page
  expandedDescriptions.value.clear()  // Reset expanded descriptions
}

// Google Maps URL generator
const getGoogleMapsUrl = (longlat: string): string => {
  // Assuming longlat is in format "longitude,latitude" or "latitude,longitude"
  // You might need to adjust this based on your actual data format
  const coords = longlat.split(',').map(coord => coord.trim())
  if (coords.length === 2) {
    // Google Maps expects latitude,longitude format
    return `https://maps.google.com/maps?q=${coords[0]},${coords[1]}&z=15`
  }
  return `https://maps.google.com/maps?q=${longlat}`
}

// Show address info tooltip
const showAddressInfo = (inovasi: Inovasi, event: MouseEvent) => {
  event.stopPropagation() // Prevent event bubbling
  selectedInovatorAddress.value = inovasi.inovator_detail?.alamat || 'Alamat belum tersedia'
  
  // Get the button element (parent of SVG) to ensure consistent positioning
  const target = event.target as HTMLElement
  const button = target.closest('button') || target
  const rect = button.getBoundingClientRect()
  
  // Calculate tooltip position using viewport coordinates (fixed positioning)
  // This ensures the tooltip stays aligned with the SVG icon even when scrolling
  const tooltipTop = rect.top + (rect.height / 2) - 20 // Center vertically with icon
  const tooltipLeft = rect.right + 8 // Position to the right of the button with small gap
  
  // Check if tooltip would go off-screen and adjust if necessary
  const tooltipWidth = 200 // max-width from CSS
  const viewportWidth = window.innerWidth
  
  let adjustedLeft = tooltipLeft
  if (tooltipLeft + tooltipWidth > viewportWidth) {
    // Position to the left of the icon instead
    adjustedLeft = rect.left - tooltipWidth - 8
    tooltipSide.value = 'left'
  } else {
    tooltipSide.value = 'right'
  }
  
  tooltipPosition.value = {
    top: tooltipTop + 'px',
    left: adjustedLeft + 'px'
  }
  
  showAddressPopup.value = true
}

// Close address tooltip
const closeAddressPopup = () => {
  showAddressPopup.value = false
  selectedInovatorAddress.value = ''
}

// Download functionality
const downloadData = async () => {
  if (isDownloading.value) return
  
  try {
    isDownloading.value = true
      // Prepare data for export (use filteredInovasi to include current filters)
    const dataToExport = filteredInovasi.value.map(item => ({
      'Judul Inovasi': item.judul_inovasi || '',
      'SDGS': item.sdgs?.nama || '',
      'Tahun': item.tahun || '',
      'Instansi': item.instansi?.agency_name || item.kld || '',
      'Kategori Instansi': item.instansi?.kat_instansi || '',
      'Nama Inovator': item.inovator || '',
      'Unit Inovator': item.inovator_detail?.inovator || '',
      'Alamat Inovator': item.inovator_detail?.alamat || 'Alamat belum tersedia',
      'Koordinat': item.inovator_detail?.longlat || 'Koordinat belum tersedia',
      'Deskripsi': item.deskripsi || 'Tidak ada deskripsi'
    }))

    if (selectedExportFormat.value === 'csv') {
      downloadCSV(dataToExport)
    } else if (selectedExportFormat.value === 'xlsx') {
      await downloadExcel(dataToExport)
    } else if (selectedExportFormat.value === 'pdf') {
      await downloadPDF(dataToExport)
    }
    
  } catch (error) {
    console.error('Error downloading data:', error)
    alert('Terjadi kesalahan saat mengunduh data. Silakan coba lagi.')
  } finally {
    isDownloading.value = false
  }
}

const downloadCSV = (data: any[]) => {
  if (data.length === 0) return
  
  const headers = Object.keys(data[0])
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header] || ''
        // Escape quotes and wrap in quotes if contains comma
        return value.includes(',') || value.includes('"') 
          ? `"${value.replace(/"/g, '""')}"` 
          : value
      }).join(',')
    )
  ].join('\n')
  
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `daftar_inovasi_${new Date().toISOString().split('T')[0]}.csv`
  link.click()
}

const downloadExcel = async (data: any[]) => {
  // Import xlsx library dynamically
  const XLSX = await import('xlsx')
  
  const worksheet = XLSX.utils.json_to_sheet(data)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Daftar Inovasi')
  
  // Auto-width columns
  const maxWidth = 50
  const colWidths = Object.keys(data[0] || {}).map(key => {
    const maxLength = Math.max(
      key.length,
      ...data.map(row => String(row[key] || '').length)
    )
    return { width: Math.min(maxLength + 2, maxWidth) }
  })
  worksheet['!cols'] = colWidths
  
  XLSX.writeFile(workbook, `daftar_inovasi_${new Date().toISOString().split('T')[0]}.xlsx`)
}

const downloadPDF = async (data: any[]) => {
  // Import jsPDF library dynamically
  const { jsPDF } = await import('jspdf')
  const autoTable = (await import('jspdf-autotable')).default
  
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  })
  
  // Add title
  doc.setFontSize(16)
  doc.text('Daftar Ide Inovasi Laboratorium Inovasi LAN | INOLAND', 14, 20)
  
  // Add date
  doc.setFontSize(10)
  doc.text(`Tanggal: ${new Date().toLocaleDateString('id-ID')}`, 14, 30)
  doc.text(`Total Data: ${data.length} inovasi`, 14, 35)
  doc.text(`Sumber: https://inoland.lan.go.id`, 14, 35)
  
  // Prepare table data
  const headers = Object.keys(data[0] || {})
  const rows = data.map(item => headers.map(header => item[header] || ''))
  
  // Add table
  autoTable(doc, {
    head: [headers],
    body: rows,
    startY: 45,    styles: { 
      fontSize: 8,
      cellPadding: 3,
      overflow: 'linebreak'
    },
    headStyles: { 
      fillColor: [102, 126, 234],
      textColor: 255,
      fontSize: 9,
      fontStyle: 'bold'
    },
    columnStyles: {
      0: { cellWidth: 50 }, // Judul Inovasi
      1: { cellWidth: 25 }, // SDGS
      2: { cellWidth: 20 }, // Tahun
      3: { cellWidth: 40 }, // Pemda
      4: { cellWidth: 40 }, // Inovator
      5: { cellWidth: 60 }  // Deskripsi
    },
    margin: { top: 45, right: 14, bottom: 20, left: 14 },
  })
    doc.save(`daftar_inovasi_${new Date().toISOString().split('T')[0]}.pdf`)
}

// Watchers
watch([searchTerm, selectedYear, selectedSDGS], () => {
  currentPage.value = 1 // Reset to first page when filtering
  expandedDescriptions.value.clear() // Reset expanded descriptions when filtering
})

// Add escape key listener for popup
const handleEscapeKey = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && showAddressPopup.value) {
    closeAddressPopup()
  }
}

// Add click outside listener for tooltip
const handleClickOutside = () => {
  if (showAddressPopup.value) {
    closeAddressPopup()
  }
}

onMounted(() => {
  loadInovasi()
  document.addEventListener('keydown', handleEscapeKey)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscapeKey)
})

watch(currentPage, () => {
  expandedDescriptions.value.clear() // Reset expanded descriptions when changing pages
})

watch(itemsPerPage, () => {
  currentPage.value = 1 // Reset to first page when changing items per page
  expandedDescriptions.value.clear() // Reset expanded descriptions
})

// Lifecycle
onMounted(() => {
  loadInovasi()
  document.addEventListener('keydown', handleEscapeKey)
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscapeKey)
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* Modern Table Styles */
.modern-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  table-layout: fixed; /* Fixed layout for better column control */
}

.modern-table th {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: 600;
  padding: 16px 20px;
  text-align: left;
  font-size: 14px;
  letter-spacing: 0.05em;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
  position: relative;
}

/* Column Width Controls */
.modern-table th:nth-child(1) { width: 25%; } /* Judul Inovasi */
.modern-table th:nth-child(2) { width: 10%; } /* SDGS */
.modern-table th:nth-child(3) { width: 8%; }  /* Tahun */
.modern-table th:nth-child(4) { width: 15%; } /* Pemda */
.modern-table th:nth-child(5) { width: 15%; } /* Inovator */
.modern-table th:nth-child(6) { width: 27%; } /* Deskripsi */

.modern-table th.sortable {
  cursor: pointer;
  user-select: none;
  transition: all 0.2s ease;
}

.modern-table th.sortable:hover {
  background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
  transform: translateY(-1px);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.sort-icon {
  font-size: 12px;
  opacity: 0.7;
  transition: all 0.2s ease;
}

.modern-table th.sortable:hover .sort-icon {
  opacity: 1;
}

.modern-table td {
  padding: 16px 20px;
  border-bottom: 1px solid #e5e7eb;
  vertical-align: top;
  line-height: 1.5;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

/* Better text handling for different columns */
.modern-table td:nth-child(1) { /* Judul Inovasi */
  word-break: break-word;
}

.modern-table td:nth-child(6) { /* Deskripsi */
  line-height: 1.6;
  word-break: break-word;
  hyphens: auto;
}

.modern-table tbody tr {
  transition: all 0.2s ease;
}

.modern-table tbody tr:hover {
  background-color: #f8fafc;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.modern-table tbody tr:last-child td {
  border-bottom: none;
}

/* Loading Styles */
.loading {
  text-align: center;
  padding: 60px 20px;
}

.spinner {
  border: 4px solid #f3f4f6;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  animation: spin 1s linear infinite;
  margin: 0 auto 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Error Styles */
.error-message {
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
  border: 1px solid #f87171;
  border-radius: 12px;
  margin: 20px 0;
  box-shadow: 0 4px 6px -1px rgba(248, 113, 113, 0.1);
}

.retry-btn {
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.retry-btn:hover {
  background: linear-gradient(135deg, #b91c1c 0%, #991b1b 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(248, 113, 113, 0.3);
}

/* Modern Pagination */
.pagination-modern {
  margin-top: 24px;
  padding: 20px 0;
  border-top: 1px solid #e5e7eb;
}

.pagination-btn {
  padding: 10px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: white;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-width: 44px;
  justify-content: center;
}

.pagination-btn:hover {
  background: #f9fafb;
  border-color: #9ca3af;
  transform: translateY(-1px);
}

.pagination-btn.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-color: #667eea;
  box-shadow: 0 2px 4px rgba(102, 126, 234, 0.3);
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

/* Download Section Styles */
.download-section {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 16px 20px;
  margin-bottom: 24px;
}

.download-section h3 {
  margin: 0;
  color: #1e293b;
}

.download-section select {
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 14px;
  color: #374151;
  min-width: 140px;
  transition: all 0.2s ease;
}

.export-select {
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 14px;
  color: #374151;
  min-width: 140px;
  transition: all 0.2s ease;
}

.download-section select:hover,
.export-select:hover {
  border-color: #9ca3af;
}

.download-section select:focus,
.export-select:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  outline: none;
}

.download-btn {
  background: linear-gradient(135deg, #059669 0%, #047857 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-width: 120px;
  justify-content: center;
}

.download-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #047857 0%, #065f46 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(5, 150, 105, 0.3);
}

.download-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.download-btn i {
  font-size: 13px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .modern-table {
    font-size: 14px;
    table-layout: auto; /* Auto layout on mobile */
  }
  
  .modern-table th,
  .modern-table td {
    padding: 12px 16px;
  }
  
  /* Adjust column widths for mobile */
  .modern-table th:nth-child(1) { width: 30%; } /* Judul Inovasi */
  .modern-table th:nth-child(2) { width: 12%; } /* SDGS */
  .modern-table th:nth-child(3) { width: 10%; } /* Tahun */
  .modern-table th:nth-child(4) { width: 16%; } /* Pemda */
  .modern-table th:nth-child(5) { width: 16%; } /* Inovator */
  .modern-table th:nth-child(6) { width: 16%; } /* Deskripsi - smaller on mobile */
  
  .header-content {
    flex-direction: column;
    gap: 4px;
    align-items: flex-start;
  }
  
  .sort-icon {
    align-self: flex-end;
  }
  
  .pagination-modern {
    overflow-x: auto;
  }
  
  .pagination-modern .flex:first-child {
    flex-direction: column;
    align-items: flex-start;
    gap: 2;
  }
  
  .pagination-btn {
    padding: 8px 12px;
    font-size: 14px;
    min-width: 40px;
  }
}

@media (max-width: 640px) {
  .modern-table th,
  .modern-table td {
    padding: 10px 12px;
    font-size: 13px;
  }
  
  .modern-table th {
    font-size: 12px;
  }
  
  .pagination-btn {
    padding: 6px 10px;
    font-size: 13px;
    min-width: 36px;
  }
  
  /* Stack table on very small screens */
  .modern-table thead {
    display: none;
  }
  
  .modern-table tbody tr {
    display: block;
    margin-bottom: 16px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 16px;
    background: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }
  
  .modern-table tbody td {
    display: block;
    padding: 8px 0;
    border: none;
    border-bottom: 1px solid #f3f4f6;
    position: relative;
    padding-left: 120px;
  }
  
  .modern-table tbody td:before {
    content: attr(data-label);
    position: absolute;
    left: 0;
    top: 8px;
    font-weight: 600;
    color: #374151;
    width: 110px;
    font-size: 12px;
  }
    .modern-table tbody td:last-child {
    border-bottom: none;
  }
}

/* Address Tooltip Styles */
.address-tooltip {
  position: fixed;
  background: #1f2937;
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 12px;
  z-index: 1000;
  max-width: 200px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  pointer-events: auto;
  cursor: pointer;
}

.address-tooltip-content {
  line-height: 1.4;
}

.address-tooltip-arrow {
  position: absolute;
  top: 50%;
  left: -4px;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-right: 5px solid #1f2937;
}

/* Arrow positioning for right-side tooltip */
.address-tooltip[data-position="right"] .address-tooltip-arrow {
  left: -4px;
  border-right: 5px solid #1f2937;
  border-left: none;
}

/* Arrow positioning for left-side tooltip */
.address-tooltip[data-position="left"] .address-tooltip-arrow {
  left: auto;
  right: -4px;
  border-left: 5px solid #1f2937;
  border-right: none;
}

/* Animation for tooltip */
@keyframes tooltipFadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.address-tooltip {
  animation: tooltipFadeIn 0.2s ease-out;
}

/* Maps Link Styles */
.maps-link {
  text-decoration: none;
  border-radius: 4px;
  padding: 2px 4px;
  transition: all 0.2s ease;
}

.maps-link:hover {
  background-color: rgba(37, 99, 235, 0.1);
  transform: translateX(2px);
}

.maps-link svg {
  transition: transform 0.2s ease;
}

.maps-link:hover svg {
  transform: scale(1.1);
}
</style>
