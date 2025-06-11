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
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-20">
      <p class="text-red-600 mb-4">{{ error }}</p>
      <button 
        @click="fetchImages"
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Coba Lagi
      </button>
    </div>

    <!-- Empty State -->
    <div v-else-if="images.length === 0" class="text-center py-20">
      <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
      </svg>
      <p class="text-gray-500">Tidak ada infografis tersedia</p>
    </div>

    <!-- Carousel -->
    <div v-else class="carousel relative max-w-6xl mx-auto">
      <!-- Previous Button -->
      <button 
        @click="prevSlide" 
        class="carousel-button-prev absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-blue-700 bg-opacity-80 hover:bg-opacity-100 text-white p-3 rounded-full transition-all duration-300 shadow-lg"
        :disabled="images.length <= 3"
      >
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
      </button>

      <!-- Images Container -->
      <div class="carousel-images grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-16 py-8">
        <div 
          v-for="(image, i) in visibleImages" 
          :key="`${currentIndex}-${i}`"
          class="carousel-image-wrapper relative group cursor-pointer"
          @click="openModal(image)"
        >
          <div class="relative overflow-hidden rounded-lg shadow-lg bg-white">
            <!-- Image -->
            <img 
              :src="image.link" 
              :alt="image.nama || `Infografis ${i + 1}`"
              class="carousel-image w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              @error="handleImageError"
            />
            
            <!-- Overlay -->
            <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
              <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>
            </div>
          </div>
          
          <!-- Image Info -->
          <div class="p-4">
            <h3 class="font-semibold text-gray-800 mb-2 line-clamp-2">
              {{ image.nama || 'Infografis' }}
            </h3>
            <span class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {{ image.jenis_dokumen || 'Infografis' }}
            </span>
          </div>
        </div>
      </div>

      <!-- Next Button -->
      <button 
        @click="nextSlide" 
        class="carousel-button-next absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-blue-700 bg-opacity-80 hover:bg-opacity-100 text-white p-3 rounded-full transition-all duration-300 shadow-lg"
        :disabled="images.length <= 3"
      >
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
        </svg>
      </button>

      <!-- Dots Indicator -->
      <div v-if="images.length > 3" class="flex justify-center mt-6 space-x-2">
        <button 
          v-for="(dot, index) in totalSlides" 
          :key="index"
          @click="goToSlide(index)"
          class="w-3 h-3 rounded-full transition-all duration-300"
          :class="{
            'bg-blue-700': currentSlideIndex === index,
            'bg-gray-300 hover:bg-gray-400': currentSlideIndex !== index
          }"
        />
      </div>
    </div>

    <!-- Modal for enlarged view -->
    <div 
      v-if="showModal" 
      class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      @click="closeModal"
    >
      <div class="relative max-w-4xl max-h-full">
        <button 
          @click="closeModal"
          class="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
        >
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
        <img 
          :src="selectedImage?.link" 
          :alt="selectedImage?.nama"
          class="max-w-full max-h-full object-contain rounded-lg"
          @click.stop
        />
        <div v-if="selectedImage?.nama" class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 rounded-b-lg">
          <h3 class="text-lg font-semibold">{{ selectedImage.nama }}</h3>
          <p class="text-sm opacity-75">{{ selectedImage.jenis_dokumen }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Types
/**
 * @typedef {Object} Image
 * @property {number} id
 * @property {string} nama
 * @property {string} link
 * @property {string} jenis_dokumen
 * @property {string} created_at
 */

// Reactive state
const images = ref([])
const currentIndex = ref(0)
const loading = ref(false)
const error = ref('')
const showModal = ref(false)
const selectedImage = ref(null)

// Computed
const visibleImages = computed(() => {
  if (images.value.length === 0) return []
  
  const result = []
  const itemsToShow = Math.min(3, images.value.length)
  
  for (let i = 0; i < itemsToShow; i++) {
    const index = (currentIndex.value + i) % images.value.length
    result.push(images.value[index])
  }
  
  return result
})

const totalSlides = computed(() => {
  return Math.ceil(images.value.length / 3)
})

const currentSlideIndex = computed(() => {
  return Math.floor(currentIndex.value / 3)
})

// Methods
const fetchImages = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const response = await $fetch('/api/infografis', {
      query: {
        jenis: 'infografis',
        limit: 50 // Get more items for carousel
      }
    })
    
    if (response.success && response.data) {
      // Filter hanya yang memiliki link gambar valid
      images.value = response.data.filter(item => 
        item.link && (
          item.link.includes('.jpg') || 
          item.link.includes('.jpeg') || 
          item.link.includes('.png') || 
          item.link.includes('.gif') ||
          item.link.includes('.webp')
        )
      )
    } else {
      images.value = []
    }
  } catch (err) {
    console.error('Error fetching images:', err)
    error.value = 'Gagal memuat infografis. Silakan coba lagi.'
  } finally {
    loading.value = false
  }
}

const nextSlide = () => {
  if (images.value.length <= 3) return
  currentIndex.value = (currentIndex.value + 3) % images.value.length
}

const prevSlide = () => {
  if (images.value.length <= 3) return
  currentIndex.value = (currentIndex.value - 3 + images.value.length) % images.value.length
}

const goToSlide = (slideIndex) => {
  currentIndex.value = slideIndex * 3
}

const openModal = (image) => {
  selectedImage.value = image
  showModal.value = true
  // Prevent body scroll when modal is open
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  showModal.value = false
  selectedImage.value = null
  // Restore body scroll
  document.body.style.overflow = 'auto'
}

const handleImageError = (event) => {
  const target = event.target
  target.src = '/placeholder-image.jpg'
}

// Lifecycle
onMounted(() => {
  fetchImages()
})

// Cleanup on unmount
onUnmounted(() => {
  document.body.style.overflow = 'auto'
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

.carousel-button-prev:disabled,
.carousel-button-next:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Smooth transitions */
.carousel-image {
  transition: transform 0.3s ease, filter 0.3s ease;
}

.carousel-image:hover {
  filter: brightness(1.1);
}

/* Modal animations */
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
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