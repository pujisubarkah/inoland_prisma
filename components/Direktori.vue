<template>
  <div class="p-4">
    <h1 class="font-bold text-2xl text-center my-5 font-poppins">DIREKTORI INOVASI</h1>
    <hr class="w-[100px] h-[2px] mx-auto mb-5 border-none bg-gradient-to-r from-blue-800 via-black to-blue-800" />    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <NuxtLink
        v-for="item in currentItems"
        :key="item.id"
        :to="`/referensi/direktori/${item.id}`"
        class="bg-white rounded-lg shadow hover:scale-[1.03] transition cursor-pointer block no-underline"
      >
        <img
          :src="item.image"
          :alt="item.title"
          class="w-full h-[220px] object-cover rounded-t-lg"
          @error="handleImageError"
        />        <div class="p-4">
          <h3 class="font-bold text-base mb-1">{{ item.title }}</h3>
          <p class="text-blue-800 text-sm">{{ item.pemda }}</p>
        </div>
      </NuxtLink>
    </div>

    <div v-if="totalPages > 1" class="mt-6 flex justify-center items-center gap-2">
      <button
        v-if="currentPage > 1"
        @click="changePage(currentPage - 1)"
        class="px-3 py-1 rounded bg-gray-100 text-black shadow hover:bg-gray-200"
      >Prev</button>

      <button
        v-for="page in visiblePages"
        :key="page"
        @click="changePage(page)"
        :class="[
          'px-3 py-1 rounded shadow',
          currentPage === page ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black hover:bg-gray-200'
        ]"
      >{{ page }}</button>

      <button
        v-if="currentPage < totalPages"
        @click="changePage(currentPage + 1)"
        class="px-3 py-1 rounded bg-gray-100 text-black shadow hover:bg-gray-200"
      >Next</button>
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
      // Urutkan berdasarkan year (descending)
      .sort((a, b) => (b.year || 0) - (a.year || 0))
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