<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-6xl mx-auto">
      <!-- Header Section -->
      <div class="text-center mb-8">
        <h1 class="text-3xl sm:text-4xl font-bold text-blue-800 mb-3">
          Cerita Keberhasilan
        </h1>
        <p class="text-lg sm:text-xl text-blue-600 font-medium mb-4">
          Kisah Inspiratif Inovasi Daerah yang Berhasil
        </p>
        <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg shadow-sm max-w-3xl mx-auto">
          <p class="text-gray-700 text-sm sm:text-base leading-relaxed">
            Koleksi cerita sukses inovasi daerah yang telah diimplementasikan dan memberikan dampak positif bagi masyarakat. Kisah-kisah ini menjadi inspirasi bagi daerah lain untuk mengembangkan inovasi yang bermanfaat.
          </p>
        </div>
        <div class="mt-6 flex justify-center">
           <NuxtLink to="/cerita-keberhasilan/baru" class="inline-flex items-center px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors font-semibold">
             <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
               <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
             </svg>
             Berbagi Cerita Anda
           </NuxtLink>
        </div>
      </div>

      <!-- Success Stories Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div
          v-for="story in successStories"
          :key="story.id"
          class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
        >
          <div
            class="h-48 flex items-center justify-center"
            :class="story.colorClass || 'bg-gradient-to-br from-green-400 to-green-600'"
          >
            <svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-800 mb-2">{{ story.title }}</h3>
            <p class="text-gray-600 text-sm mb-4">
              {{ story.summary }}
            </p>
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-green-600">Dampak: {{ story.impact }}</span>
              <button class="text-blue-600 hover:text-blue-800 font-medium text-sm">
                Baca Selengkapnya →
              </button>
            </div>
          </div>
        </div>
        <div v-if="successStories.length === 0" class="col-span-full text-center text-gray-500 py-12">
          Tidak ada cerita keberhasilan ditemukan.
        </div>
      </div>

      <!-- Call to Action -->
      <div class="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-8 text-white text-center">
        <h3 class="text-2xl font-bold mb-4">Ingin Berbagi Cerita Keberhasilan Inovasi Anda?</h3>
        <p class="text-lg mb-6 opacity-90">
          Mari jadikan inovasi daerah Anda sebagai inspirasi bagi daerah lain
        </p>
        <button class="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-md">
          Bagikan Cerita Anda
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const successStories = ref([])

onMounted(async () => {
  try {
    const { data } = await useFetch('/api/success-stories')
    // Asumsikan data.value adalah array of stories
    successStories.value = Array.isArray(data.value) ? data.value : []
  } catch (e) {
    successStories.value = []
  }
})

// Page meta
useHead({
  title: 'Cerita Keberhasilan - INOLAND',
  meta: [
    { name: 'description', content: 'Koleksi cerita sukses inovasi daerah yang memberikan dampak positif' }
  ]
})
</script>

<style scoped>
/* Additional custom styles if needed */
</style>