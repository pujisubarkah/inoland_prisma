<!-- components/Berita.vue -->
<template>
  <div class="w-full px-0 py-6 bg-gradient-to-b from-gray-50 to-white">
    <header class="mb-2 text-center">
      <h1 class="text-3xl font-bold font-poppins text-green-700 drop-shadow">
        🌟 Jangan Lewatkan Berita Inovasi Terbaru, Sobat Kreatif!
      </h1>
      <p class="text-gray-500 mt-1 text-base">{{ currentDate }}</p>
    </header>

    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600"></div>
    </div>

    <div v-else-if="error" class="text-center py-12">
      <p class="text-red-600 mb-4">{{ error }}</p>
      <button 
        @click="fetchBerita"
        class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
      >
        Coba Lagi
      </button>
    </div>

    <div v-else>
      <section v-if="newsItems.length > 0" class="mb-2">
        <div class="relative w-full h-56 md:h-64 lg:h-72 rounded-xl overflow-hidden flex gap-2 justify-center items-center bg-white shadow-md">
          <div
            v-for="(item, idx) in visibleItems"
            :key="item.id"
            class="w-1/7 h-full rounded-lg overflow-hidden shadow group cursor-pointer flex flex-col justify-end bg-gradient-to-t from-green-50 via-white to-white hover:scale-105 transition-transform duration-300"
          >
            <div class="relative w-full h-32 md:h-40 lg:h-48 flex-shrink-0">
              <img 
                :src="item.image" 
                :alt="item.title" 
                class="w-full h-full object-cover rounded-lg border border-green-100 group-hover:border-green-400 transition-all duration-300"
                @error="handleImageError"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
            </div>
            <div class="p-2 flex-1 flex flex-col justify-end items-center">
              <h2 class="text-green-700 text-xs font-semibold text-center mt-1 line-clamp-2 group-hover:text-green-900 transition-colors">
                {{ item.title }}
              </h2>
              <div class="text-gray-400 text-xs text-center mt-1">
                {{ formatDate(item.date) }}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="my-4">
        <Slider
          v-model="currentIndex"
          :min="0"
          :max="newsItems.length - 1"
          step="1"
          class="w-full"
          thumb-label="Berita"
        />
        <div class="flex justify-center mt-2 gap-2">
          <button
            v-for="(item, idx) in newsItems"
            :key="idx"
            class="dot"
            :class="{ active: currentIndex === idx }"
            @click="currentIndex = idx"
          ></button>
        </div>
      </div>
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

const currentDate = computed(() => {
  return new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
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
    }
    if (Array.isArray(dataArray) && dataArray.length > 0) {
      newsItems.value = dataArray.map((item, idx) => ({
        id: item.id || idx,
        title: item.title || 'Tanpa Judul',
        image: item.imageUrl || item.image_url || '',
        date: item.date || item.createdAt || item.created_at || new Date().toISOString(),
      }))
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

// Tampilkan 7 item mulai dari currentIndex, looping jika di akhir
const visibleItems = computed(() => {
  if (newsItems.value.length === 0) return []
  const items = []
  for (let i = 0; i < 7; i++) {
    items.push(newsItems.value[(currentIndex.value + i) % newsItems.value.length])
  }
  return items
})

// Autoplay logic
onMounted(() => {
  fetchBerita()
  intervalId = setInterval(() => {
    if (newsItems.value.length > 0) {
      currentIndex.value = (currentIndex.value + 1) % newsItems.value.length
    }
  }, 4000)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<style scoped>
.font-poppins {
  font-family: 'Poppins', sans-serif;
}
.w-1\/7 {
  width: 14.2857143%;
}
.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: rgba(34,197,94,0.4);
  cursor: pointer;
  transition: all 0.3s ease;
}
.dot.active {
  background: #22c55e;
  transform: scale(1.2);
}
.dot:hover {
  background: #4ade80;
}
</style>