<template>
  <div class="w-full mt-24">
    <h1 class="text-2xl font-bold text-center font-poppins my-5">Tambah Inovasi</h1>
    <hr class="w-[100px] h-[2px] mx-auto my-5 bg-gradient-to-r from-red-500 via-black to-red-500 border-none" />

    <div class="flex justify-end w-11/12 mx-auto">
      <button
        @click="showModalAdd = true"
        class="py-2 px-3 font-medium text-white rounded shadow flex items-center bg-blue-600 hover:bg-blue-700 transition"
      >
        Tambah Inovasi
      </button>
    </div>

    <div class="w-full flex justify-center mt-16">
      <table class="border-collapse table-auto w-11/12 text-sm">
        <thead>
          <tr>
            <th v-for="header in headers" :key="header" class="border-b text-base font-medium p-4 pl-8 text-slate-400 text-left">
              {{ header }}
            </th>
            <th class="border-b text-base font-medium p-4 text-slate-400 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in currentItems"
            :key="item.id"
            class="hover:bg-gray-50"
          >
            <td class="border-b p-4 font-bold">{{ item.tahun }}</td>
            <td class="border-b p-4 font-bold">{{ item.provinsi?.nama_provinsi }}</td>
            <td class="border-b p-4 font-bold">{{ item.kabupaten?.nama_kabupaten }}</td>
            <td class="border-b p-4 font-bold">{{ item.inovator }}</td>
            <td class="border-b p-4 font-bold">{{ item.sdgs?.sdgs }}</td>
            <td class="border-b p-4 font-bold">{{ item.deskripsi }}</td>
            <td class="border-b p-4 font-bold flex gap-2">
              <button @click="handleEditClick(item.id)" class="text-blue-600 hover:text-blue-500">✏️</button>
              <button @click="deleteProduct(item.id)" class="text-red-600 hover:text-red-500">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex justify-center mt-4 gap-2">
      <button
        @click="handlePageChange(currentPage - 1)"
        :disabled="currentPage === 1"
        class="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        Previous
      </button>
      <button
        @click="handlePageChange(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const inolands = ref([])
const showModalAdd = ref(false)
const currentPage = ref(1)
const itemsPerPage = 10

const headers = ['Tahun', 'Provinsi', 'Kabupaten', 'Inovator', 'SDGS', 'Deskripsi']

const fetchInolands = async () => {
  try {
    const res = await $fetch('/api/inovasi_lan')
    inolands.value = res.data || []
  } catch (error) {
    console.error('Gagal mengambil data inovasi:', error)
  }
}

onMounted(() => {
  fetchInolands()
})

const handleEditClick = (id) => {
  console.log('Edit item with id:', id)
  // Logika edit di sini
}

const deleteProduct = async (id) => {
  console.log('Delete item with id:', id)
  // Logika delete di sini
}

const handlePageChange = (newPage) => {
  currentPage.value = newPage
}

const indexOfLastItem = computed(() => currentPage.value * itemsPerPage)
const indexOfFirstItem = computed(() => indexOfLastItem.value - itemsPerPage)
const currentItems = computed(() => inolands.value.slice(indexOfFirstItem.value, indexOfLastItem.value))
const totalPages = computed(() => Math.ceil(inolands.value.length / itemsPerPage))
</script>

<style scoped>
button:disabled {
  cursor: not-allowed;
}
</style>