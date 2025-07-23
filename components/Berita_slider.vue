<!-- components/Berita.vue -->
<template>  <div class="w-full px-2 sm:px-0 py-6 sm:py-8 bg-gradient-to-b from-blue-50/30 to-white">
    <div v-if="loading" class="flex justify-center items-center py-12 sm:py-16">
      <div class="relative">
        <div class="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-4 border-blue-200 border-t-blue-600"></div>
        <div class="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-400 animate-ping"></div>
      </div>
    </div>

    <div v-else-if="error" class="text-center py-12 sm:py-16 bg-red-50 rounded-xl mx-2 sm:mx-4">
      <div class="text-red-500 text-4xl sm:text-6xl mb-3 sm:mb-4">⚠️</div>
      <p class="text-red-700 mb-4 sm:mb-6 text-base sm:text-lg font-medium px-4">{{ error }}</p>
      <button 
        @click="fetchBerita"
        class="px-4 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base touch-manipulation"
      >
        🔄 Coba Lagi
      </button>
    </div>    <div v-else>
      <section v-if="newsItems.length > 0" class="mb-6 sm:mb-8">
        <div class="relative w-full rounded-xl sm:rounded-2xl overflow-hidden bg-white shadow-xl sm:shadow-2xl border border-gray-100">
          <!-- Left Arrow Button -->
          <button
            @click="prevSlide"
            class="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 hover:bg-white shadow-lg hover:shadow-xl rounded-full flex items-center justify-center text-gray-600 hover:text-blue-600 transition-all duration-300 group touch-manipulation"
          >
            <svg class="w-5 h-5 sm:w-6 sm:h-6 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>

          <!-- Right Arrow Button -->
          <button
            @click="nextSlide"
            class="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 hover:bg-white shadow-lg hover:shadow-xl rounded-full flex items-center justify-center text-gray-600 hover:text-blue-600 transition-all duration-300 group touch-manipulation"
          >
            <svg class="w-5 h-5 sm:w-6 sm:h-6 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>          <!-- Mobile View: Single Card -->
          <div 
            class="block sm:hidden"
            @touchstart="handleTouchStart"
            @touchend="handleTouchEnd"
          >            <div
              v-if="currentNewsItem"
              class="w-full rounded-xl overflow-hidden shadow-lg group cursor-pointer transition-all duration-500 hover:shadow-xl no-select"
              @click="navigateToBerita(currentNewsItem.id)"
            >
              <div class="relative w-full h-48 overflow-hidden">
                <img 
                  :src="currentNewsItem.image" 
                  :alt="currentNewsItem.title" 
                  class="mobile-news-image w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  @error="handleImageError"
                  draggable="false"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div class="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                  Terbaru
                </div>
                <!-- Click indicator -->
                <div class="absolute inset-0 bg-blue-600/0 active:bg-blue-600/10 transition-colors duration-300 flex items-center justify-center">
                  <div class="opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-2">
                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div class="p-4 bg-white">
                <h2 class="text-gray-800 text-base font-semibold leading-tight line-clamp-3 group-hover:text-blue-700 transition-colors duration-300 mb-2">
                  {{ currentNewsItem.title }}
                </h2>
                <div class="flex items-center text-gray-500 text-xs">
                  <svg class="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>
                  </svg>
                  {{ formatDate(currentNewsItem.date) }}
                </div>
              </div>
            </div>
             
          </div>

          <!-- Desktop/Tablet View: Multiple Cards -->
          <div class="hidden sm:flex gap-1 p-2 h-80 md:h-96">
            <div
              v-for="(item, idx) in visibleItems"
              :key="item.id"
              class="flex-1 rounded-xl overflow-hidden shadow-lg group cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-xl"
              :class="idx === 2 ? 'ring-2 ring-blue-400 ring-opacity-50' : ''"
              @click="navigateToBerita(item.id)"
            >
              <div class="relative w-full h-48 md:h-56 overflow-hidden">
                <img 
                  :src="item.image" 
                  :alt="item.title" 
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  @error="handleImageError"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div class="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                  Terbaru
                </div>
                <!-- Click indicator -->
                <div class="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors duration-300 flex items-center justify-center">
                  <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3">
                    <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div class="p-4 bg-white">
                <h2 class="text-gray-800 text-sm md:text-base font-semibold leading-tight line-clamp-3 group-hover:text-blue-700 transition-colors duration-300 mb-2">
                  {{ item.title }}
                </h2>
                <div class="flex items-center text-gray-500 text-xs">
                  <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>
                  </svg>
                  {{ formatDate(item.date) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Slider from '@/components/ui/slider/Slider.vue'

const newsItems = ref([])
const loading = ref(false)
const error = ref('')
const currentIndex = ref(0)
let intervalId = null

// Touch/swipe functionality for mobile
const touchStartX = ref(0)
const touchEndX = ref(0)
const minSwipeDistance = 50

const handleTouchStart = (e) => {
  touchStartX.value = e.changedTouches[0].screenX
}

const handleTouchEnd = (e) => {
  touchEndX.value = e.changedTouches[0].screenX
  handleSwipe()
}

const handleSwipe = () => {
  const swipeDistance = touchStartX.value - touchEndX.value
  
  if (Math.abs(swipeDistance) > minSwipeDistance) {
    if (swipeDistance > 0) {
      // Swipe left - next slide
      nextSlide()
    } else {
      // Swipe right - previous slide
      prevSlide()
    }
  }
}

const currentDate = computed(() => {
  return new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

// Current news item for mobile view
const currentNewsItem = computed(() => {
  if (newsItems.value.length === 0) return null
  return newsItems.value[currentIndex.value % newsItems.value.length]
})

const fetchBerita = async () => {
  loading.value = true
  error.value = ''
  try {
    const response = await $fetch('/api/berita')
    let dataArray = []
    if (Array.isArray(response)) {
      dataArray = response
    } else if (response && Array.isArray(response.data)) {
      dataArray = response.data
    }    if (Array.isArray(dataArray) && dataArray.length > 0) {
      newsItems.value = dataArray
        .map((item, idx) => ({
          id: item.id || idx,
          title: item.title || 'Tanpa Judul',
          image: item.imageUrl || item.image_url || '',
          date: item.date || item.createdAt || item.created_at || new Date().toISOString(),
        }))
        .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date descending
      currentIndex.value = 0
    } else {
      newsItems.value = []
      error.value = 'Tidak ada data berita yang valid.'
    }
  } catch (err) {
    error.value = `Gagal memuat berita: ${err.message || 'Unknown error'}`
    newsItems.value = []
  } finally {
    loading.value = false
  }
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
  event.target.src = 'https://via.placeholder.com/800x600/gray/white?text=Image+Not+Found'
}

// Tampilkan 5 item mulai dari currentIndex, looping jika di akhir (untuk desktop/tablet)
const visibleItems = computed(() => {
  if (newsItems.value.length === 0) return []
  const items = []
  for (let i = 0; i < 5; i++) { // ubah dari 7 ke 5
    items.push(newsItems.value[(currentIndex.value + i) % newsItems.value.length])
  }
  return items
})

// Autoplay logic - slower transition with pause on interaction
const startAutoplay = () => {
  if (intervalId) clearInterval(intervalId)
  intervalId = setInterval(() => {
    if (newsItems.value.length > 0) {
      currentIndex.value = (currentIndex.value + 1) % newsItems.value.length
    }
  }, 8000) // 8 seconds
}

const pauseAutoplay = () => {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
}

const resumeAutoplay = () => {
  setTimeout(() => {
    startAutoplay()
  }, 3000) // Resume after 3 seconds
}

// Enhanced navigation functions with autoplay handling
const nextSlide = () => {
  if (newsItems.value.length > 0) {
    currentIndex.value = (currentIndex.value + 1) % newsItems.value.length
    pauseAutoplay()
    resumeAutoplay()
  }
}

const prevSlide = () => {
  if (newsItems.value.length > 0) {
    currentIndex.value = currentIndex.value === 0 ? newsItems.value.length - 1 : currentIndex.value - 1
    pauseAutoplay()
    resumeAutoplay()
  }
}

// Navigate to news detail page
const navigateToBerita = (id) => {
  if (id) {
    pauseAutoplay() // Pause when navigating away
    navigateTo(`/referensi/berita/${id}`)
  }
}

// Lifecycle management
onMounted(() => {
  fetchBerita()
  startAutoplay()
})

onUnmounted(() => {
  pauseAutoplay()
})
</script>

<style scoped>
.font-poppins {
  font-family: 'Poppins', sans-serif;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.bg-clip-text {
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

/* Mobile-specific improvements */
@media (max-width: 639px) {
  /* Smooth slide transition for mobile */
  .mobile-slide-container {
    transition: transform 0.3s ease-in-out;
  }
  
  /* Better touch targets for mobile */
  .touch-target {
    min-height: 44px;
    min-width: 44px;
  }
  
  /* Prevent text selection during swipe */
  .no-select {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  
  /* Better image aspect ratio on mobile */
  .mobile-news-image {
    aspect-ratio: 16/9;
    object-fit: cover;
  }
}

/* Animation for navigation dots */
.nav-dot {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-dot:hover {
  transform: scale(1.2);
}

/* Improve button accessibility on mobile */
@media (hover: none) and (pointer: coarse) {
  .group:hover .group-hover\:scale-110 {
    transform: none;
  }
  
  .hover\:scale-\[1\.02\]:hover {
    transform: none;
  }
}
</style>