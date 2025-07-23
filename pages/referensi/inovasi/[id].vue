<!-- pages/inovasi/[id].vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
    <!-- Loading State dengan animasi yang lebih menarik -->
    <div v-if="loading" class="flex flex-col justify-center items-center py-32">
      <div class="relative">
        <div class="w-20 h-20 border-4 border-blue-200 rounded-full animate-spin"></div>
        <div class="w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
      </div>
      <div class="mt-6 text-center">
        <h3 class="text-lg font-semibold text-gray-700 mb-2">Memuat Inovasi</h3>
        <p class="text-gray-500 animate-pulse">Mohon tunggu sebentar...</p>
      </div>
    </div>

    <!-- Error State dengan design yang lebih menarik -->
    <div v-else-if="error" class="max-w-4xl mx-auto px-6 py-20 text-center">
      <div class="bg-white rounded-3xl shadow-2xl p-12">
        <div class="w-24 h-24 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
          <svg class="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/>
          </svg>
        </div>
        <h2 class="text-3xl font-bold text-gray-800 mb-4">Ups! Inovasi Tidak Ditemukan</h2>
        <p class="text-red-600 mb-8 text-lg">{{ error }}</p>
        <div class="flex justify-center space-x-4">
          <button 
            @click="fetchInovasiDetail"
            class="group relative px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <span class="relative z-10">Coba Lagi</span>
            <div class="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          <NuxtLink 
            to="/referensi"
            class="px-8 py-3 bg-gray-100 text-gray-800 rounded-xl font-semibold hover:bg-gray-200 transform hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Kembali ke Referensi
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Main Content dengan design yang lebih menarik -->
    <div v-else-if="inovasiDetail" class="max-w-7xl mx-auto px-6 py-8">
      <!-- Floating Back Button -->
      <div class="fixed top-6 left-6 z-50">
        <NuxtLink 
          to="/referensi"
          class="group flex items-center px-4 py-2 bg-white/90 backdrop-blur-md text-gray-700 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-white/20"
        >
          <svg class="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          <span class="font-medium">Kembali</span>
        </NuxtLink>
      </div>

      <!-- Hero Section -->
      <div class="relative mb-12 mt-16">
        <div class="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <!-- Featured Image dengan parallax effect -->
          <div v-if="inovasiDetail.image_link" class="relative h-96 md:h-[500px] overflow-hidden">
            <img 
              :src="inovasiDetail.image_link" 
              :alt="inovasiDetail.nama_inovasi"
              class="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              @error="handleImageError"
            />
            <!-- Gradient Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            
            <!-- Floating Badges -->
            <div class="absolute top-6 left-6 flex flex-wrap gap-3">
              <span class="px-4 py-2 bg-emerald-500/90 backdrop-blur-md text-white rounded-full text-sm font-semibold shadow-lg">
                🚀 Inovasi Daerah
              </span>
              <span class="px-4 py-2 bg-blue-500/90 backdrop-blur-md text-white rounded-full text-sm font-semibold shadow-lg">
                💡 {{ inovasiDetail.produk_inovasi }}
              </span>
            </div>

            <!-- Title Overlay -->
            <div class="absolute bottom-0 left-0 right-0 p-8">
              <h1 class="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
                {{ inovasiDetail.nama_inovasi }}
              </h1>
              <div class="flex items-center space-x-6 text-white/90">
                <div class="flex items-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0h2M7 7h3m-3 4h3m-3 4h3"/>
                  </svg>
                  <span class="font-medium">{{ inovasiDetail.nama_instansi }}</span>
                </div>
                <div class="flex items-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                  </svg>
                  <span>{{ formatDate(inovasiDetail.created_at) }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Content untuk kasus tanpa image -->
          <div v-else class="relative h-96 md:h-[500px] bg-gradient-to-br from-emerald-500 via-blue-600 to-purple-700 flex items-center justify-center">
            <div class="text-center text-white">
              <div class="w-24 h-24 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
                <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                </svg>
              </div>
              <h1 class="text-4xl md:text-5xl font-bold mb-4 leading-tight drop-shadow-lg">
                {{ inovasiDetail.nama_inovasi }}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Info Card - Full Width di atas deskripsi -->
      <div class="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 mb-8">
        <div class="flex items-center mb-6">
          <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-800">Informasi Inovasi</h3>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
            <label class="text-xs font-semibold text-emerald-700 uppercase tracking-wide">Nama Inovasi</label>
            <p class="text-gray-800 font-medium mt-1 text-sm">{{ inovasiDetail.nama_inovasi }}</p>
          </div>
          
          <div class="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
            <label class="text-xs font-semibold text-blue-700 uppercase tracking-wide">Produk</label>
            <p class="text-gray-800 mt-1 text-sm">{{ inovasiDetail.produk_inovasi }}</p>
          </div>
          
          <div class="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
            <label class="text-xs font-semibold text-purple-700 uppercase tracking-wide">Instansi</label>
            <p class="text-gray-800 mt-1 text-sm">{{ inovasiDetail.nama_instansi }}</p>
          </div>
          
          <div class="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-100">
            <label class="text-xs font-semibold text-amber-700 uppercase tracking-wide">Tanggal</label>
            <p class="text-gray-800 mt-1 text-sm">{{ formatDate(inovasiDetail.created_at) }}</p>
          </div>
        </div>
      </div>

      <!-- Main Content Layout - Single Column for Description -->
      <div class="grid lg:grid-cols-4 gap-8">
        <!-- Description Card - Span 3 columns -->
        <div class="lg:col-span-3">
          <div class="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
            <div class="flex items-center mb-8">
              <div class="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mr-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
              <h2 class="text-2xl font-bold text-gray-800">Deskripsi Inovasi</h2>
            </div>
            
            <div class="prose prose-lg max-w-none">
              <div 
                v-if="inovasiDetail.deskripsi"
                class="text-gray-700 leading-relaxed formatted-content"
                v-html="formatContent(inovasiDetail.deskripsi)"
              />
              <div v-else class="text-center py-12">
                <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                <p class="text-gray-500 italic text-lg">Tidak ada deskripsi untuk inovasi ini.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Sidebar - Span 1 column -->
        <div class="lg:col-span-1 space-y-6">
          <!-- Call to Action Card -->
          <div class="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 rounded-2xl shadow-xl p-6 text-white">
            <div class="text-center">
              <div class="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h3 class="text-lg font-bold mb-3">Tentang Inovasi</h3>
              <p class="text-white/90 text-sm leading-relaxed mb-4">
                Inovasi ini merupakan wujud komitmen dalam menghadirkan pelayanan publik yang lebih efisien dan efektif.
              </p>
              <div class="flex items-center justify-center space-x-4 text-xs">
                <span class="flex items-center">
                  <span class="w-2 h-2 bg-emerald-300 rounded-full mr-2"></span>
                  Inovatif
                </span>
                <span class="flex items-center">
                  <span class="w-2 h-2 bg-teal-300 rounded-full mr-2"></span>
                  Berkelanjutan
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State dengan design menarik -->
    <div v-else class="max-w-4xl mx-auto px-6 py-20 text-center">
      <div class="bg-white rounded-3xl shadow-2xl p-16">
        <div class="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
          <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
          </svg>
        </div>
        <h3 class="text-3xl font-bold text-gray-700 mb-4">Inovasi Tidak Ditemukan</h3>
        <p class="text-gray-500 mb-8 text-lg">Maaf, inovasi yang Anda cari tidak tersedia atau mungkin telah dihapus.</p>
        <NuxtLink 
          to="/referensi"
          class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          Jelajahi Inovasi Lainnya
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// Types
interface InovasiDetailType {
  id: number
  nama_inovasi: string
  produk_inovasi: string
  nama_instansi: string
  deskripsi: string
  image_link: string
  created_at: string
}

// Get route params
const route = useRoute()
const id = route.params.id as string

// Reactive state
const inovasiDetail = ref<InovasiDetailType | null>(null)
const loading = ref<boolean>(true)
const error = ref<string | null>(null)

// Meta
useHead({
  title: computed(() => inovasiDetail.value ? `${inovasiDetail.value.nama_inovasi} - Inovasi Daerah` : 'Inovasi Tidak Ditemukan'),
  meta: [
    {
      name: 'description',
      content: computed(() => {
        if (inovasiDetail.value?.deskripsi) {
          const textContent = inovasiDetail.value.deskripsi
            .replace(/<[^>]*>/g, ' ')
            .replace(/\s+/g, ' ')
            .trim()
            .substring(0, 160) + '...'
          return textContent
        }
        return 'Detail inovasi daerah terbaru.'
      })
    },
    { property: 'og:title', content: computed(() => inovasiDetail.value?.nama_inovasi || 'Daftar Inovasi | INOLAND') },
    { property: 'og:description', content: computed(() => {
      if (inovasiDetail.value?.deskripsi) {
        return inovasiDetail.value.deskripsi
          .replace(/<[^>]*>/g, ' ')
          .replace(/\s+/g, ' ')
          .trim()
          .substring(0, 160)
      }
      return 'Inovasi daerah untuk pelayanan publik yang lebih baik'
    }) },
    { property: 'og:image', content: computed(() => inovasiDetail.value?.image_link || '') },
    { property: 'og:type', content: 'article' }
  ]
})

// Methods
const fetchInovasiDetail = async (): Promise<void> => {
  loading.value = true
  error.value = null
  
  try {
    console.log(`[Frontend] Fetching inovasi detail for ID: ${id}`)
    
    const response = await $fetch(`/api/inovasi_lan/${id}`, {
      method: 'GET',
      timeout: 10000,
      retry: 2
    })

    console.log(`[Frontend] API Response:`, response)

    // Handle response format
    if (response && response.success === true && 'data' in response && response.data) {
      const dataItem = response.data
      
      inovasiDetail.value = {
        id: dataItem.id,
        nama_inovasi: dataItem.nama_inovasi || 'Inovasi Tanpa Nama',
        produk_inovasi: dataItem.produk_inovasi || '',
        nama_instansi: dataItem.nama_instansi || '',
        deskripsi: dataItem.deskripsi || '',
        image_link: dataItem.image_link || '',
        created_at: dataItem.created_at || new Date().toISOString()
      }
      
      console.log(`[Frontend] Inovasi detail loaded successfully:`, inovasiDetail.value.nama_inovasi)
    } else {
      const errorMessage = (response && 'message' in response && response.message) 
        || (response && 'error' in response && response.error)
        || 'Inovasi tidak ditemukan'
      console.error(`[Frontend] No valid data in response:`, response)
      error.value = errorMessage
    }
  } catch (err: any) {
    console.error('[Frontend] Fetch error:', err)
    
    if (err.status === 404 || err.statusCode === 404) {
      error.value = `Inovasi dengan ID ${id} tidak ditemukan`
    } else if (err.status === 400 || err.statusCode === 400) {
      error.value = 'ID inovasi tidak valid'
    } else if (err.status === 500 || err.statusCode === 500) {
      error.value = 'Terjadi kesalahan server internal'
    } else if (err.name === 'TimeoutError') {
      error.value = 'Koneksi timeout. Silakan coba lagi.'
    } else if (err.name === 'FetchError' || err.message.includes('fetch')) {
      error.value = 'Gagal terhubung ke server. Periksa koneksi internet Anda.'
    } else if (err.data && err.data.message) {
      error.value = err.data.message
    } else {
      error.value = `Terjadi kesalahan: ${err.message || 'Unknown error'}`
    }
  } finally {
    loading.value = false
  }
}

const formatDate = (dateString: string): string => {
  if (!dateString) return ''
  
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch {
    return dateString
  }
}

const formatContent = (content: string): string => {
  if (!content) return ''
  
  // Clean up HTML content
  let formatted = content
    // Remove escaped HTML entities
    .replace(/\\u003C/g, '<')
    .replace(/\\u003E/g, '>')
    
  // Add custom styling to HTML elements
  formatted = formatted
    .replace(/<p/g, '<p class="mb-6 leading-relaxed"')
    .replace(/<div/g, '<div class="mb-6"')
    .replace(/<em>/g, '<em class="italic text-emerald-700 font-medium">')
    .replace(/<strong>/g, '<strong class="font-bold text-gray-900">')
    .replace(/<h[1-6]/g, '<h3 class="text-xl font-bold text-gray-800 mb-4 mt-8"')
  
  return formatted
}

const handleImageError = (event: Event): void => {
  const target = event.target as HTMLImageElement
  const imageContainer = target.closest('.relative')
  if (imageContainer && imageContainer instanceof HTMLElement) {
    imageContainer.style.display = 'none'
  }
}

// Lifecycle
onMounted(() => {
  if (id) {
    fetchInovasiDetail()
  } else {
    error.value = 'ID inovasi tidak valid'
    loading.value = false
  }
})
</script>

<style scoped>
/* Custom styling for formatted content */
:deep(.formatted-content) {
  line-height: 1.8;
}

:deep(.formatted-content p) {
  margin-bottom: 1.5rem;
  text-align: justify;
  color: #374151;
}

:deep(.formatted-content strong) {
  font-weight: 700;
  color: #1f2937;
}

:deep(.formatted-content em) {
  font-style: italic;
  color: #059669;
  font-weight: 500;
}

:deep(.formatted-content div) {
  margin-bottom: 1.5rem;
}

:deep(.formatted-content h1),
:deep(.formatted-content h2),
:deep(.formatted-content h3),
:deep(.formatted-content h4),
:deep(.formatted-content h5),
:deep(.formatted-content h6) {
  font-weight: 700;
  color: #1f2937;
  margin-top: 2rem;
  margin-bottom: 1rem;
  line-height: 1.2;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}
</style>