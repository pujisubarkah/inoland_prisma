<template>
  <div class="p-3 md:p-4">
    <h1 class="font-bold text-2xl md:text-3xl text-center my-4 md:my-5 font-poppins px-4">
      DIREKTORI INOVASI
    </h1>
    <hr class="w-20 md:w-[100px] h-[2px] mx-auto mb-4 md:mb-5 border-none bg-gradient-to-r from-blue-800 via-black to-blue-800" />
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">      <NuxtLink
        v-for="item in currentItems"
        :key="item.id"
        :to="`/referensi/direktori/${item.id}`"
        class="bg-white rounded-lg shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer block no-underline touch-target overflow-hidden"
      >
        <div class="relative">
          <img
            :src="item.image"
            :alt="item.title"
            class="w-full h-64 md:h-80 object-cover"
            style="aspect-ratio: 3/4;"
            @error="handleImageError"
          />
          <div v-if="item.year" class="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-md">
            {{ item.year }}
          </div>
        </div>
        
        <div class="p-3 md:p-4 flex flex-col gap-2">
          <h3 class="font-bold text-sm md:text-base leading-tight text-gray-800 min-h-[2.5rem] md:min-h-[3rem]">
            {{ item.title }}
          </h3>
          <p class="text-blue-700 text-xs md:text-sm font-medium">
            {{ item.pemda }}
          </p>
        </div>
      </NuxtLink>
    </div>

    <!-- Pagination with responsive design -->
    <div v-if="totalPages > 1" class="mt-4 md:mt-6 flex justify-center items-center gap-1 md:gap-2 px-4">
      <button
        v-if="currentPage > 1"
        @click="changePage(currentPage - 1)"
        class="px-2 md:px-3 py-1.5 md:py-2 rounded bg-gray-100 text-black shadow hover:bg-gray-200 transition-colors text-xs md:text-sm font-medium touch-target"
      >
        <span class="hidden sm:inline">Prev</span>
        <span class="sm:hidden">‹</span>
      </button>

      <div class="flex gap-1 md:gap-2 max-w-xs overflow-x-auto">
        <button
          v-for="page in visiblePages"
          :key="page"
          @click="changePage(page)"
          :class="[
            'px-2 md:px-3 py-1.5 md:py-2 rounded shadow text-xs md:text-sm font-medium transition-colors touch-target flex-shrink-0',
            currentPage === page 
              ? 'bg-gray-700 text-white' 
              : 'bg-gray-100 text-black hover:bg-gray-200'
          ]"
        >{{ page }}</button>
      </div>

      <button
        v-if="currentPage < totalPages"
        @click="changePage(currentPage + 1)"
        class="px-2 md:px-3 py-1.5 md:py-2 rounded bg-gray-100 text-black shadow hover:bg-gray-200 transition-colors text-xs md:text-sm font-medium touch-target"
      >
        <span class="hidden sm:inline">Next</span>
        <span class="sm:hidden">›</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import axios from 'axios'

const router = useRouter()
const newsItems = ref([])
const currentPage = ref(1)
const totalItems = ref(0)
const itemsPerPage = 12

const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage))

const fetchPdfList = async () => {
  try {
    const res = await axios.get(`/api/pdflist?page=${currentPage.value}&limit=${itemsPerPage}`)
    if (res.data) {
      const { data, count } = res.data
      totalItems.value = count || 0
      newsItems.value = data.map(item => ({
        id: item.id,
        title: item.pdf_judul,
        image: item.pdf_cover,
        pemda: item.pdf_publisher,
        url: item.pdf_url, // jika ingin dipakai detail
        year: item.pdf_year,
        kategori: item.pdf_kategori,
        created_at: item.created_at
      }))
    }
  } catch (err) {
    console.error('Error fetching data:', err)
  }
}

onMounted(fetchPdfList)
watch(currentPage, fetchPdfList)

const currentItems = computed(() => newsItems.value)

const changePage = page => {
  if (page >= 1 && page <= totalPages.value) currentPage.value = page
}

// Pagination logic: show max 5 pages
const visiblePages = computed(() => {
  const pages = []
  let start = 1
  if (totalPages.value > 5 && currentPage.value > 3) {
    start = Math.max(currentPage.value - 2, 1)
  }
  for (let i = start; i <= Math.min(totalPages.value, start + 4); i++) {
    pages.push(i)
  }
  return pages
})

const handleImageError = (e) => {
  e.target.src = 'https://via.placeholder.com/220x220?text=No+Image'
}
</script>

<style scoped>
.font-poppins {
  font-family: 'Poppins', sans-serif;
}

.touch-target {
  min-height: 44px;
}

/* Smooth transitions */
.transition-all {
  transition: all 0.3s ease;
}

/* Custom scrollbar for pagination */
.overflow-x-auto::-webkit-scrollbar {
  height: 4px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 2px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 2px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .grid {
    gap: 0.75rem;
  }
  
  /* Ensure touch targets are adequate */
  button {
    min-height: 40px;
    min-width: 40px;
  }
}

@media (min-width: 640px) and (max-width: 1024px) {
  .grid {
    gap: 1rem;
  }
}
</style>