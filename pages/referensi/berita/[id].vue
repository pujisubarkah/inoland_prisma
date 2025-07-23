<!-- pages/berita/[id].vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="max-w-4xl mx-auto px-6 py-20 text-center">
      <svg class="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/>
      </svg>
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Berita Tidak Ditemukan</h2>
      <p class="text-red-600 mb-6">{{ error }}</p>
      <div class="space-x-4">
        <button 
          @click="fetchNewsDetail"
          class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Coba Lagi
        </button>
        <NuxtLink 
          to="/referensi"
          class="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors inline-block"
        >
          Kembali ke Referensi
        </NuxtLink>
      </div>
    </div>

    <!-- News Detail Content -->
    <div v-else-if="newsDetail" class="max-w-4xl mx-auto px-6 py-8">
      <!-- Back Button -->
      <div class="mb-6">
        <NuxtLink 
          to="/referensi"
          class="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          Kembali ke Referensi
        </NuxtLink>
      </div>

      <!-- Article Header -->
      <article class="bg-white rounded-lg shadow-lg overflow-hidden">
        <!-- Featured Image - Only show if imageUrl exists -->
        <div v-if="newsDetail.imageUrl" class="relative h-64 md:h-96 overflow-hidden">
          <img 
            :src="newsDetail.imageUrl" 
            :alt="newsDetail.title"
            class="w-full h-full object-cover"
            @error="handleImageError"
          />
          <!-- Image Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          
          <!-- Like Counter (if available) -->
          <div v-if="newsDetail.likes && newsDetail.likes > 0" class="absolute top-4 right-4">
            <div class="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
              <svg class="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/>
              </svg>
              <span class="text-sm font-medium text-gray-700">{{ newsDetail.likes }}</span>
            </div>
          </div>
        </div>

        <!-- Article Content -->
        <div class="p-6 md:p-8">
          <!-- Title -->
          <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {{ newsDetail.title }}
          </h1>

          <!-- Meta Information -->
          <div class="flex items-center justify-between text-gray-600 mb-6 pb-4 border-b">
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              <time :datetime="newsDetail.date" class="text-sm">
                {{ formatDate(newsDetail.date) }}
              </time>
            </div>
            
            <!-- Created Date -->
            <div class="flex items-center text-xs text-gray-500">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Dibuat: {{ formatDate(newsDetail.createdAt) }}
            </div>
          </div>

          <!-- Article Content -->
          <div class="prose prose-lg max-w-none">
            <div 
              v-if="newsDetail.deskripsi"
              class="text-gray-700 leading-relaxed whitespace-pre-line"
              v-html="formatContent(newsDetail.deskripsi)"
            />
            <p v-else class="text-gray-500 italic">
              Tidak ada konten untuk berita ini.
            </p>
          </div>

          <!-- Embed Video (if available) -->
          <div v-if="newsDetail.embedUrl" class="mt-8">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Video Terkait</h3>
            <div class="aspect-video rounded-lg overflow-hidden">
              <iframe 
                :src="newsDetail.embedUrl"
                class="w-full h-full"
                frameborder="0"
                allowfullscreen
                title="Video Berita"
              ></iframe>
            </div>
          </div>
        </div>
      </article>

      <!-- Share Section -->
      <div class="mt-8 bg-white rounded-lg shadow-lg p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Bagikan Berita</h3>
        <div class="flex flex-wrap gap-4">
          <button 
            @click="shareToFacebook"
            class="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clip-rule="evenodd"/>
            </svg>
            Facebook
          </button>
          
          <button 
            @click="shareToTwitter"
            class="flex items-center px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"/>
            </svg>
            Twitter
          </button>
          
          <button 
            @click="shareToWhatsApp"
            class="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 0C4.477 0 0 4.477 0 10c0 1.89.525 3.66 1.438 5.168L0 20l4.832-1.438C6.34 19.475 8.11 20 10 20c5.523 0 10-4.477 10-10S15.523 0 10 0zm5.293 14.293l-.707.707c-.391.391-.902.586-1.414.586-.512 0-1.023-.195-1.414-.586L10 13.243 8.242 15c-.391.391-.902.586-1.414.586-.512 0-1.023-.195-1.414-.586l-.707-.707L6.464 12.536 4.707 10.779c-.391-.391-.586-.902-.586-1.414 0-.512.195-1.023.586-1.414l.707-.707L6.172 8.001 7.929 6.243c.391-.391.902-.586 1.414-.586.512 0 1.023.195 1.414.586L12.515 7.001l1.758-1.758c.391-.391.902-.586 1.414-.586.512 0 1.023.195 1.414.586l.707.707-1.757 1.758 1.757 1.757z"/>
            </svg>
            WhatsApp
          </button>
          
          <button 
            @click="copyLink"
            class="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
            </svg>
            Salin Link
          </button>
        </div>
      </div>

      <!-- Tags Section (if hashtags found) -->
      <div v-if="extractedTags.length > 0" class="mt-8 bg-white rounded-lg shadow-lg p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
        <div class="flex flex-wrap gap-2">
          <span 
            v-for="tag in extractedTags" 
            :key="tag"
            class="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="max-w-4xl mx-auto px-6 py-20 text-center">
      <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
      </svg>
      <h3 class="text-xl font-medium text-gray-600 mb-2">Berita tidak ditemukan</h3>
      <p class="text-gray-500 mb-6">Berita yang Anda cari mungkin telah dihapus atau tidak tersedia.</p>
      <NuxtLink 
        to="/referensi"
        class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-block"
      >
        Lihat Berita Lainnya
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// Types
interface NewsDetailType {
  id: number
  title: string
  date: string
  createdAt: string
  deskripsi: string
  imageUrl: string
  embedUrl: string | null
  likes: number | null
}

// Get route params
const route = useRoute()
const id = route.params.id as string

// Reactive state
const newsDetail = ref<NewsDetailType | null>(null)
const loading = ref<boolean>(true)
const error = ref<string | null>(null)

// Computed
const extractedTags = computed(() => {
  if (!newsDetail.value?.deskripsi) return []
  
  const hashtags = newsDetail.value.deskripsi.match(/#\w+/g) || []
  return hashtags.map(tag => tag.substring(1)) // Remove # symbol
})

// Meta
useHead({
  title: computed(() => newsDetail.value ? `${newsDetail.value.title} - Berita Inovasi | INOLAND` : 'Berita Tidak Ditemukan | INOLAND'),
  meta: [
    {
      name: 'description',
      content: computed(() => {
        if (newsDetail.value?.deskripsi) {
          return newsDetail.value.deskripsi
            .replace(/\r?\n/g, ' ')
            .replace(/#\w+/g, '')
            .trim()
            .substring(0, 160) + '...'
        }
        return 'Detail berita inovasi terbaru.'
      })
    },
    { property: 'og:title', content: computed(() => newsDetail.value?.title || 'Berita Inovasi | INOLAND') },
    { property: 'og:description', content: computed(() => {
      if (newsDetail.value?.deskripsi) {
        return newsDetail.value.deskripsi
          .replace(/\r?\n/g, ' ')
          .replace(/#\w+/g, '')
          .trim()
          .substring(0, 160)
      }
      return 'Berita inovasi daerah'
    }) },
    { property: 'og:image', content: computed(() => newsDetail.value?.imageUrl || '') },
    { property: 'og:type', content: 'article' }
  ]
})

// Methods
const fetchNewsDetail = async (): Promise<void> => {
  loading.value = true
  error.value = null
  
  try {
    console.log(`[Frontend] Fetching news detail for ID: ${id}`)
    
    const response = await $fetch(`/api/berita/${id}`, {
      method: 'GET',
      timeout: 10000, // 10 second timeout
      retry: 2 // Retry 2 times
    })

    console.log(`[Frontend] API Response:`, response)

    // Handle different response formats
    let dataItem = null
    
    if (Array.isArray(response)) {
      // Direct array response - shouldn't happen for [id] endpoint
      dataItem = response.length > 0 ? response[0] : null
      console.log('[Frontend] Direct array response detected (unexpected)')
    } else if (
      response &&
      typeof response === 'object' &&
      'success' in response &&
      (response as any).success &&
      'data' in response
    ) {
      // Wrapped response with success flag
      dataItem = (response as any).data
      console.log('[Frontend] Wrapped response detected')
    } else if (response && typeof response === 'object' && 'id' in response) {
      // Direct object response
      dataItem = response
      console.log('[Frontend] Direct object response detected')
    }

    if (dataItem && dataItem.id) {
      newsDetail.value = {
        id: dataItem.id,
        title: dataItem.title || 'Berita Tanpa Judul',
        date: dataItem.date || dataItem.createdAt || new Date().toISOString(),
        createdAt: dataItem.createdAt || dataItem.created_at || new Date().toISOString(),
        deskripsi: dataItem.deskripsi || '',
        imageUrl: dataItem.imageUrl || dataItem.image_url || '',
        embedUrl: dataItem.embedUrl || dataItem.embed_url || null,
        likes: dataItem.likes || null
      }
      console.log(`[Frontend] News detail loaded successfully:`, newsDetail.value.title)
    } else {
      // Handle API error response
      const errorMessage = (response as any)?.message || (response as any)?.error || 'Berita tidak ditemukan'
      console.error(`[Frontend] No valid data in response:`, response)
      error.value = errorMessage
    }
  } catch (err: any) {
    console.error('[Frontend] Fetch error:', err)
    
    // More detailed error handling
    if (err.status === 404 || err.statusCode === 404) {
      error.value = `Berita dengan ID ${id} tidak ditemukan`
    } else if (err.status === 400 || err.statusCode === 400) {
      error.value = 'ID berita tidak valid'
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
      weekday: 'long',
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
  
  // Convert hashtags to styled spans
  let formatted = content.replace(/#(\w+)/g, '<span class="text-blue-600 font-medium">#$1</span>')
  
  // Convert URLs to clickable links
  formatted = formatted.replace(
    /(https?:\/\/[^\s]+)/g, 
    '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline">$1</a>'
  )
  
  // Basic HTML formatting
  formatted = formatted
    .replace(/\r?\n\r?\n/g, '</p><p>')
    .replace(/\r?\n/g, '<br>')
    .replace(/^(.*)/, '<p>$1')
    .replace(/(.*?)$/, '$1</p>')
  
  return formatted
}

const handleImageError = (event: Event): void => {
  const target = event.target as HTMLImageElement
  const imageContainer = target.closest('.relative')
  if (imageContainer && imageContainer instanceof HTMLElement) {
    imageContainer.style.display = 'none'
  }
}

// Share functions
const shareToFacebook = (): void => {
  const url = encodeURIComponent(window.location.href)
  const title = encodeURIComponent(newsDetail.value?.title || '')
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${title}`, '_blank')
}

const shareToTwitter = (): void => {
  const url = encodeURIComponent(window.location.href)
  const title = encodeURIComponent(newsDetail.value?.title || '')
  window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank')
}

const shareToWhatsApp = (): void => {
  const url = encodeURIComponent(window.location.href)
  const title = encodeURIComponent(newsDetail.value?.title || '')
  window.open(`https://wa.me/?text=${title}%20${url}`, '_blank')
}

const copyLink = async (): Promise<void> => {
  try {
    await navigator.clipboard.writeText(window.location.href)
    alert('Link berhasil disalin!')
  } catch (err) {
    console.error('Failed to copy link:', err)
    const textArea = document.createElement('textarea')
    textArea.value = window.location.href
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    alert('Link berhasil disalin!')
  }
}

// Lifecycle
onMounted(() => {
  if (id) {
    fetchNewsDetail()
  } else {
    error.value = 'ID berita tidak valid'
    loading.value = false
  }
})
</script>