<template>
  <div class="p-3 sm:p-5">
    <h1 class="font-bold text-xl sm:text-2xl lg:text-3xl text-center my-3 sm:my-5 font-['Poppins'] leading-tight">
      PROYEK PERUBAHAN
    </h1>
    <hr class="w-16 sm:w-20 lg:w-25 h-0.5 bg-gradient-to-r from-blue-800 via-black to-blue-800 border-none mx-auto mb-4 sm:mb-5" />
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 mb-4 sm:mb-5">
      <div 
        v-for="item in newsItems" 
        :key="item.id" 
        class="border border-gray-300 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg touch-action-manipulation"
        @click="handleItemClick(item.id)"
      >
        <img :src="item.image" :alt="item.title" class="w-full h-36 sm:h-40 lg:h-48 object-cover" />
        <div class="p-3 sm:p-4">
          <h3 class="font-bold text-sm sm:text-base lg:text-lg leading-tight mb-2 line-clamp-2">{{ item.title }}</h3>
          <p class="text-blue-800 text-xs sm:text-sm m-0 line-clamp-2">
            {{ item.author }} - {{ item.instansi }}
          </p>
        </div>
      </div>
    </div>
    
    <div v-if="totalPages > 1" class="mt-2 sm:mt-2.5 flex flex-wrap justify-center gap-1 sm:gap-1.5">
      <button 
        v-if="currentPage > 1"
        @click="handlePageChange(currentPage - 1)"
        class="px-2 sm:px-3 py-2 border-none rounded bg-gray-50 text-black cursor-pointer shadow-sm transition-colors duration-200 hover:bg-gray-200 min-h-[44px] text-sm touch-action-manipulation"
      >
        <span class="hidden sm:inline">Prev</span>
        <svg class="w-4 h-4 sm:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        v-for="pageNumber in visiblePages"
        :key="pageNumber"
        @click="handlePageChange(pageNumber)"
        :class="[
          'px-2 sm:px-3 py-2 border-none rounded cursor-pointer shadow-sm transition-colors duration-200 min-h-[44px] min-w-[44px] text-sm touch-action-manipulation',
          currentPage === pageNumber 
            ? 'bg-gray-700 text-white' 
            : 'bg-gray-50 text-black hover:bg-gray-200'
        ]"
      >
        {{ pageNumber }}
      </button>
      
      <button 
        v-if="currentPage < totalPages"
        @click="handlePageChange(currentPage + 1)"
        class="px-2 sm:px-3 py-2 border-none rounded bg-gray-50 text-black cursor-pointer shadow-sm transition-colors duration-200 hover:bg-gray-200 min-h-[44px] text-sm touch-action-manipulation"
      >
        <span class="hidden sm:inline">Next</span>
        <svg class="w-4 h-4 sm:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
/**
 * @typedef {Object} NewsItem
 * @property {number} id
 * @property {string} title
 * @property {string} image
 * @property {string} author
 * @property {string} instansi
 * @property {string} date
 */

/** @type {import('vue').Ref<NewsItem[]>} */
const newsItems = ref([])
const currentPage = ref(1)
const itemsPerPage = 8
const totalPages = 20

const visiblePages = computed(() => {
  const pages = []
  const maxPages = Math.min(totalPages, 5)
  
  for (let i = 0; i < maxPages; i++) {
    const pageNumber = currentPage.value > 3 ? currentPage.value - 2 + i : i + 1
    pages.push(pageNumber)
  }
  
  return pages
})

const handlePageChange = (newPage) => {
  currentPage.value = newPage
}

const fetchBeritaFromAPI = async () => {
  try {
    const { data } = await $fetch(
      `https://properexpo.lan.go.id/app/api/tx-proper?perPage=${itemsPerPage}&page=${currentPage.value}`
    )
    
    const responseData = data.data
    
    const formattedData = responseData.map((item) => ({
      id: item.id_proper,
      title: item.judul,
      image: `https://properexpo.lan.go.id/uploads/properexpo-lan/berkas_poster_landscape/${item.berkas_poster_landscape}`,
      author: item.nama,
      instansi: item.md_instansi?.nama,
      date: item.created_at,
    }))
    
    newsItems.value = formattedData
    
    console.log('api:', `https://properexpo.lan.go.id/app/api/tx-proper?perPage=${itemsPerPage}&page=${currentPage.value}`)
  } catch (error) {
    console.error('Error fetching news from API:', error)
  }
}

const handleItemClick = (id) => {
  window.open(`https://properexpo.lan.go.id/web/proper/detail/${id}`, '_blank')
}

// Watch for currentPage changes
watch(currentPage, () => {
  fetchBeritaFromAPI()
})

// Fetch data on component mount
onMounted(() => {
  fetchBeritaFromAPI()
})
</script>

<style scoped>
.app {
  padding: 20px;
}

.title {
  font-family: 'Poppins', sans-serif;
  font-weight: bold;
  font-size: 2rem;
  text-align: center;
  margin: 20px 0 10px 0;
}

.divider {
  width: 100px;
  border: none;
  height: 2px;
  background: linear-gradient(to right, #16578d, black, #16578d);
  margin: 0 auto 20px auto;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.news-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.news-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.news-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.news-content {
  padding: 15px;
}

.news-content h3 {
  margin: 0 0 10px 0;
  font-size: 1.1rem;
  line-height: 1.4;
}

.author-info {
  color: #16578d;
  margin: 0;
  font-size: 0.9rem;
}

.pagination {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  gap: 5px;
}

.pagination-btn {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  background-color: #f9f9f9;
  color: #000;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s;
}

.pagination-btn:hover {
  background-color: #e9e9e9;
}

.pagination-btn.active {
  background-color: #444;
  color: #fff;
}

/* Line clamp for mobile */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Touch targets for mobile */
@media (max-width: 767px) {
  button, .cursor-pointer {
    min-height: 44px;
    touch-action: manipulation;
  }
  
  .news-grid {
    grid-template-columns: 1fr;
  }
}

/* Smooth transitions */
.transition-all {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>