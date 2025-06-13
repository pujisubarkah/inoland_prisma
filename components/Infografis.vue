<!-- components/Infografis.vue -->
<template>
  <div class="carousel-container">
    <h1 class="font-poppins font-bold text-3xl text-center my-5">
      INFOGRAFIS INOVASI
    </h1>
    <hr class="w-24 h-0.5 bg-gradient-to-r from-blue-700 via-black to-blue-700 mx-auto mb-5 border-none" />
    
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      <span class="ml-3 text-gray-600">Memuat infografis...</span>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-20">
      <div class="bg-red-100 p-4 rounded-lg mb-4 max-w-md mx-auto">
        <p class="text-red-600 mb-4">{{ error }}</p>
        <div class="text-xs text-gray-600">{{ errorDetails }}</div>
      </div>
      <button 
        @click="fetchImages"
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Coba Lagi
      </button>
    </div>

    <!-- Empty State -->
    <div v-else-if="images.length === 0" class="text-center py-20">
      <div class="bg-orange-100 p-4 rounded-lg mb-4 max-w-md mx-auto">
        <svg class="w-16 h-16 text-orange-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
        </svg>
        <p class="text-orange-600">Tidak ada infografis tersedia</p>
      </div>
    </div>

    <!-- Image Gallery -->
    <div v-else class="max-w-6xl mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="(image, index) in images" 
          :key="image.id"
          class="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-1"
          @click="openModal(image)"
        >
          <!-- Image Container -->
          <div class="relative h-64 bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
            <!-- Decorative Background Pattern -->
            <div class="absolute inset-0 opacity-10">
              <div class="w-full h-full" style="background-image: radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.3) 1px, transparent 0); background-size: 20px 20px;"></div>
            </div>
            
            <!-- Image -->
            <img 
              :src="image.link" 
              :alt="image.nama || `Infografis ${index + 1}`"
              class="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
              :class="{
                'opacity-0': !imageStates[image.id]?.loaded && !imageStates[image.id]?.error,
                'opacity-100': imageStates[image.id]?.loaded
              }"
              @load="() => handleImageLoad(image.id)"
              @error="() => handleImageError(image.id)"
              loading="lazy"
            />
            
            <!-- Loading State dengan design menarik -->
            <div 
              v-if="!imageStates[image.id]?.loaded && !imageStates[image.id]?.error"
              class="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center"
            >
              <div class="text-center text-white">
                <!-- Icon Infografis -->
                <div class="w-16 h-16 mx-auto mb-4 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm1 0v12h12V4H4z"/>
                    <path d="M6 8a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zM6 12a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z"/>
                  </svg>
                </div>
                <h4 class="font-semibold text-lg mb-2">{{ image.nama || 'Infografis' }}</h4>
                <p class="text-sm opacity-90 mb-4">{{ image.jenis_dokumen || 'Infografis' }}</p>
                
                <!-- Loading Animation -->
                <div class="flex justify-center items-center">
                  <div class="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent mr-2"></div>
                  <span class="text-sm">Memuat gambar...</span>
                </div>
              </div>
            </div>

            <!-- Error State dengan design menarik -->
            <div 
              v-if="imageStates[image.id]?.error"
              class="absolute inset-0 bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center"
            >
              <div class="text-center text-white p-4">
                <!-- Icon Error -->
                <div class="w-16 h-16 mx-auto mb-4 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"/>
                  </svg>
                </div>
                <h4 class="font-semibold text-lg mb-2">{{ image.nama || 'Infografis' }}</h4>
                <p class="text-sm opacity-90 mb-3">{{ image.jenis_dokumen || 'Infografis' }}</p>
                <div class="text-xs bg-white bg-opacity-20 rounded-lg p-2 backdrop-blur-sm">
                  Gambar tidak dapat dimuat
                </div>
              </div>
            </div>

            <!-- Hover Overlay dengan Preview -->
            <div 
              v-if="imageStates[image.id]?.loaded"
              class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center"
            >
              <div class="opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-50 group-hover:scale-100">
                <div class="bg-white bg-opacity-20 backdrop-blur-md rounded-full p-4">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                </div>
                <p class="text-white text-sm mt-2 text-center font-medium">Lihat Detail</p>
              </div>
            </div>

            <!-- Badge untuk kategori -->
            <div class="absolute top-3 left-3">
              <span class="bg-emerald-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
                📊 {{ image.jenis_dokumen || 'Infografis' }}
              </span>
            </div>

            <!-- Badge untuk tanggal -->
            <div class="absolute top-3 right-3">
              <span class="bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
                📅 {{ formatDate(image.created_at) }}
              </span>
            </div>
          </div>
          
          <!-- Image Info Card -->
          <div class="p-5 bg-white">
            <h3 class="font-bold text-gray-800 mb-3 line-clamp-2 text-lg leading-tight">
              {{ image.nama || 'Infografis' }}
            </h3>
            
            <!-- Features Badges -->
            <div class="flex flex-wrap gap-2 mb-3">
              <span class="inline-flex items-center bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-md font-medium">
                <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                HD Quality
              </span>
              <span class="inline-flex items-center bg-emerald-50 text-emerald-700 text-xs px-2 py-1 rounded-md font-medium">
                <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 011 1v1a1 1 0 01-1 1H4a1 1 0 01-1-1v-1zM3 7a1 1 0 011-1h12a1 1 0 011 1v1a1 1 0 01-1 1H4a1 1 0 01-1-1V7zM3 12a1 1 0 011-1h12a1 1 0 011 1v1a1 1 0 01-1 1H4a1 1 0 01-1-1v-1z"/>
                </svg>
                Infografis
              </span>
            </div>

            <!-- Action Button -->
            <div class="flex items-center justify-between">
              <div class="text-sm text-gray-500">
                Klik untuk memperbesar
              </div>
              <div class="flex items-center text-blue-600">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
                <span class="text-sm font-medium">Lihat</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal for enlarged view dengan scroll -->
    <div 
      v-if="showModal" 
      class="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
      @click="closeModal"
    >
      <!-- Toolbar -->
      <div class="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
        <div class="bg-black bg-opacity-60 backdrop-blur-sm rounded-full px-6 py-3 flex items-center space-x-4">
          <!-- Close Button -->
          <button 
            @click="closeModal"
            class="text-white hover:text-gray-300 transition-colors p-2 rounded-full hover:bg-white hover:bg-opacity-10"
            title="Tutup (ESC)"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
          
          <!-- Zoom Controls -->
          <div class="flex items-center space-x-2">
            <button 
              @click="zoomOut"
              :disabled="zoomLevel <= 0.5"
              class="text-white hover:text-gray-300 disabled:text-gray-500 transition-colors p-2 rounded-full hover:bg-white hover:bg-opacity-10 disabled:cursor-not-allowed"
              title="Perkecil"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12H9"/>
              </svg>
            </button>
            
            <span class="text-white text-sm font-medium min-w-16 text-center">
              {{ Math.round(zoomLevel * 100) }}%
            </span>
            
            <button 
              @click="zoomIn"
              :disabled="zoomLevel >= 3"
              class="text-white hover:text-gray-300 disabled:text-gray-500 transition-colors p-2 rounded-full hover:bg-white hover:bg-opacity-10 disabled:cursor-not-allowed"
              title="Perbesar"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v6m3-3H9"/>
              </svg>
            </button>
            
            <button 
              @click="resetZoom"
              class="text-white hover:text-gray-300 transition-colors p-2 rounded-full hover:bg-white hover:bg-opacity-10"
              title="Reset Zoom"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
            </button>
          </div>
          
          <!-- Download Button -->
          <button 
            @click="downloadImage"
            class="text-white hover:text-gray-300 transition-colors p-2 rounded-full hover:bg-white hover:bg-opacity-10"
            title="Download"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Scrollable Image Container -->
      <div 
        ref="modalContainer"
        class="w-full h-full overflow-auto p-4 flex items-center justify-center"
        @click.stop
        @wheel="handleWheel"
      >
        <div 
          class="relative inline-block"
          :style="{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }"
        >
          <img 
            ref="modalImage"
            :src="selectedImage?.link" 
            :alt="selectedImage?.nama"
            class="max-w-none h-auto rounded-lg shadow-2xl cursor-move"
            :class="{ 'cursor-grab': !isDragging, 'cursor-grabbing': isDragging }"
            @mousedown="startDrag"
            @mousemove="onDrag"
            @mouseup="endDrag"
            @mouseleave="endDrag"
            @click.stop
            @dragstart.prevent
          />
          
          <!-- Loading overlay for modal image -->
          <div 
            v-if="modalImageLoading"
            class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg"
          >
            <div class="text-white text-center">
              <div class="animate-spin rounded-full h-12 w-12 border-2 border-white border-t-transparent mx-auto mb-3"></div>
              <p>Memuat gambar...</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Image Info Overlay -->
      <div v-if="selectedImage?.nama" class="absolute bottom-4 left-4 right-4 z-20">
        <div class="bg-black bg-opacity-60 backdrop-blur-sm text-white p-4 rounded-lg max-w-2xl mx-auto">
          <h3 class="text-xl font-bold mb-2">{{ selectedImage.nama }}</h3>
          <div class="flex items-center justify-between text-sm">
            <span class="opacity-90">{{ selectedImage.jenis_dokumen }}</span>
            <span class="opacity-90">{{ formatDate(selectedImage.created_at) }}</span>
          </div>
        </div>
      </div>

      <!-- Scroll Hint -->
      <div v-if="zoomLevel > 1" class="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10">
        <div class="bg-blue-600 bg-opacity-80 text-white text-xs px-3 py-2 rounded-full">
          💡 Scroll untuk navigasi • Drag untuk menggeser
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, nextTick } from 'vue'

// Reactive state
const images = ref([])
const loading = ref(false)
const error = ref('')
const errorDetails = ref('')
const showModal = ref(false)
const selectedImage = ref(null)
const modalImageLoading = ref(false)

// Zoom and Pan states
const zoomLevel = ref(1)
const isDragging = ref(false)
const dragStart = ref({ x: 0, y: 0 })
const dragOffset = ref({ x: 0, y: 0 })

// Refs
const modalContainer = ref(null)
const modalImage = ref(null)

// Track individual image states
const imageStates = reactive({})

// Initialize image state
const initImageState = (imageId) => {
  imageStates[imageId] = {
    loaded: false,
    error: false
  }
}

// Methods
const fetchImages = async () => {
  loading.value = true
  error.value = ''
  errorDetails.value = ''
  
  try {
    console.log('[Infografis] Fetching data from /api/infografis')
    
    const response = await $fetch('/api/infografis', {
      timeout: 15000,
      retry: 1
    })
    
    console.log('[Infografis] API Response received')
    
    // Validasi response
    if (!response) {
      throw new Error('Response kosong dari server')
    }
    
    if (response.success !== true) {
      throw new Error(`API error: ${response.message || 'Unknown error'}`)
    }
    
    if (!response.data || !Array.isArray(response.data)) {
      throw new Error('Data tidak ditemukan atau format tidak valid')
    }
    
    // Filter item yang valid
    const validItems = response.data.filter(item => {
      const isValid = item && 
                     item.id && 
                     item.link && 
                     typeof item.link === 'string' && 
                     item.link.trim().length > 0
      
      if (!isValid) {
        console.warn('[Infografis] Invalid item:', item)
      }
      
      return isValid
    })
    
    console.log(`[Infografis] Loaded ${validItems.length} valid images`)
    
    images.value = validItems
    
    // Initialize image states
    validItems.forEach(image => {
      initImageState(image.id)
    })
    
    if (validItems.length === 0) {
      error.value = 'Tidak ada item valid ditemukan'
      errorDetails.value = `Total items: ${response.data.length}, Valid: 0`
    }
    
  } catch (err) {
    console.error('[Infografis] Fetch error:', err)
    
    error.value = 'Gagal memuat infografis'
    errorDetails.value = `Error: ${err.message}\nStatus: ${err.status || 'unknown'}`
    
    // Specific error handling
    if (err.status === 404) {
      error.value = 'API endpoint tidak ditemukan'
    } else if (err.status === 500) {
      error.value = 'Server error'
    } else if (err.name === 'FetchError') {
      error.value = 'Gagal terhubung ke server'
    }
  } finally {
    loading.value = false
  }
}

const handleImageLoad = (imageId) => {
  console.log('[Infografis] ✅ Image loaded:', imageId)
  
  if (imageStates[imageId]) {
    imageStates[imageId].loaded = true
    imageStates[imageId].error = false
  }
}

const handleImageError = (imageId) => {
  console.error('[Infografis] ❌ Image failed to load:', imageId)
  
  if (imageStates[imageId]) {
    imageStates[imageId].loaded = false
    imageStates[imageId].error = true
  }
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  } catch {
    return ''
  }
}

// Modal methods
const openModal = (image) => {
  selectedImage.value = image
  showModal.value = true
  modalImageLoading.value = true
  zoomLevel.value = 1
  dragOffset.value = { x: 0, y: 0 }
  
  document.body.style.overflow = 'hidden'
  
  // Wait for next tick to ensure modal is rendered
  nextTick(() => {
    if (modalImage.value) {
      modalImage.value.onload = () => {
        modalImageLoading.value = false
      }
      modalImage.value.onerror = () => {
        modalImageLoading.value = false
      }
    }
  })
}

const closeModal = () => {
  showModal.value = false
  selectedImage.value = null
  modalImageLoading.value = false
  zoomLevel.value = 1
  dragOffset.value = { x: 0, y: 0 }
  isDragging.value = false
  document.body.style.overflow = 'auto'
}

// Zoom methods
const zoomIn = () => {
  if (zoomLevel.value < 3) {
    zoomLevel.value = Math.min(3, zoomLevel.value + 0.25)
  }
}

const zoomOut = () => {
  if (zoomLevel.value > 0.5) {
    zoomLevel.value = Math.max(0.5, zoomLevel.value - 0.25)
  }
}

const resetZoom = () => {
  zoomLevel.value = 1
  dragOffset.value = { x: 0, y: 0 }
  if (modalContainer.value) {
    modalContainer.value.scrollTop = 0
    modalContainer.value.scrollLeft = 0
  }
}

// Wheel zoom
const handleWheel = (event) => {
  event.preventDefault()
  const delta = event.deltaY > 0 ? -0.1 : 0.1
  const newZoom = Math.max(0.5, Math.min(3, zoomLevel.value + delta))
  zoomLevel.value = newZoom
}

// Drag methods
const startDrag = (event) => {
  if (zoomLevel.value > 1) {
    isDragging.value = true
    dragStart.value = {
      x: event.clientX - dragOffset.value.x,
      y: event.clientY - dragOffset.value.y
    }
  }
}

const onDrag = (event) => {
  if (isDragging.value && zoomLevel.value > 1) {
    dragOffset.value = {
      x: event.clientX - dragStart.value.x,
      y: event.clientY - dragStart.value.y
    }
  }
}

const endDrag = () => {
  isDragging.value = false
}

// Download method
const downloadImage = () => {
  if (selectedImage.value?.link) {
    const link = document.createElement('a')
    link.href = selectedImage.value.link
    link.download = `${selectedImage.value.nama || 'infografis'}.png`
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

// Keyboard shortcuts
const handleKeydown = (event) => {
  if (!showModal.value) return
  
  switch (event.key) {
    case 'Escape':
      closeModal()
      break
    case '+':
    case '=':
      event.preventDefault()
      zoomIn()
      break
    case '-':
      event.preventDefault()
      zoomOut()
      break
    case '0':
      event.preventDefault()
      resetZoom()
      break
  }
}

// Lifecycle
onMounted(() => {
  console.log('[Infografis] Component mounted')
  fetchImages()
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.body.style.overflow = 'auto'
  document.removeEventListener('keydown', handleKeydown)
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

/* Smooth transitions */
img {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

/* Card hover effects */
.group:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Modal scrollbar styling */
.overflow-auto::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.overflow-auto::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
}

.overflow-auto::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.5);
  border-radius: 4px;
}

.overflow-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.7);
}

/* Custom scrollbar for main content */
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

/* Prevent text selection while dragging */
.cursor-grabbing {
  user-select: none;
}
</style>