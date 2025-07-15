<template>
  <div class="w-full mt-24">
    <h1 class="text-3xl font-extrabold text-center font-poppins my-5 text-blue-700 drop-shadow">Tambah Inovasi</h1>
    <hr class="w-[120px] h-[3px] mx-auto my-5 bg-gradient-to-r from-blue-700 via-cyan-400 to-blue-700 border-none rounded" />

    <div class="flex justify-end w-11/12 mx-auto">
      <button
        @click="showModalAdd = true"
        class="py-2 px-4 font-bold text-white rounded-lg shadow-lg flex items-center bg-gradient-to-r from-blue-700 via-blue-400 to-cyan-400 hover:scale-105 hover:shadow-xl transition-all duration-200"
      >
        <span class="mr-2">➕</span> Tambah Inovasi
      </button>
    </div>

    <div class="w-full flex justify-center mt-16">
      <table class="border-collapse table-auto w-11/12 text-sm shadow-xl rounded-xl overflow-hidden bg-white">
        <thead>
          <tr class="bg-gradient-to-r from-blue-700 via-blue-400 to-cyan-400 text-white">
            <th class="border-b text-base font-semibold p-4 pl-8 text-left w-24">Tahun</th>
            <th class="border-b text-base font-semibold p-4 text-left w-56">Judul Inovasi</th>
            <th class="border-b text-base font-semibold p-4 text-left w-40">KLD</th>
            <!-- <th class="border-b text-base font-semibold p-4 text-left w-40">Urusan</th> -->
            <th class="border-b text-base font-semibold p-4 text-left w-32">Inovator</th>
            <th class="border-b text-base font-semibold p-4 text-left w-32">SDGS</th>
            <th class="border-b text-base font-semibold p-4 text-left w-96">Deskripsi</th>
            <th class="border-b text-base font-semibold p-4 text-left w-40">Wilayah</th>
            <th class="border-b text-base font-semibold p-4 text-left w-32">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in currentItems"
            :key="item.id"
            class="hover:bg-blue-50 transition"
          >
            <td class="border-b p-4 font-bold text-blue-700">{{ item.tahun }}</td>
            <td class="border-b p-4 font-bold text-blue-700">{{ item.judul_inovasi }}</td>
            <td class="border-b p-4 font-bold text-blue-700">{{ item.kld }}</td>
            <!-- <td class="border-b p-4 font-bold text-blue-700">{{ item.urusan || '-' }}</td> -->
            <td class="border-b p-4 font-bold text-blue-700">{{ item.inovator || '-' }}</td>
            <td class="border-b p-4 font-bold text-blue-700">{{ item.sdgs || '-' }}</td>
            <td class="border-b p-4 text-blue-700 w-96">
              <div class="whitespace-pre-line">{{ item.deskripsi }}</div>
            </td>
            <td class="border-b p-4 text-blue-700">
              {{ item.wilayah?.nama_provinsi || '-' }}<br>
              {{ item.wilayah?.nama_kabkot || '-' }}
            </td>
            <td class="border-b p-4 font-bold flex gap-2 w-32">
              <button @click="handleEditClick(item.id)" class="text-blue-600 hover:text-blue-700 bg-white border border-blue-200 rounded-lg px-2 py-1 shadow hover:scale-110 transition">
                ✏️
              </button>
              <button @click="deleteProduct(item.id)" class="text-red-600 hover:text-red-700 bg-white border border-red-200 rounded-lg px-2 py-1 shadow hover:scale-110 transition">
                🗑️
              </button>
            </td>
          </tr>
          <tr v-if="currentItems.length === 0">
            <td colspan="8" class="text-center p-4 text-blue-700">Belum ada inovasi.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex justify-center mt-8 gap-2">
      <button
        @click="handlePageChange(currentPage - 1)"
        :disabled="currentPage === 1"
        class="px-5 py-2 bg-gradient-to-r from-blue-700 to-cyan-400 text-white font-bold rounded-lg shadow hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      <span class="px-4 py-2 font-semibold text-blue-700 bg-white rounded shadow">
        {{ currentPage }} / {{ totalPages }}
      </span>
      <button
        @click="handlePageChange(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="px-5 py-2 bg-gradient-to-r from-blue-700 to-cyan-400 text-white font-bold rounded-lg shadow hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
<!-- Modal Tambah Inovasi (manual) -->
<div
  v-if="showModalAdd"
  class="fixed inset-0 z-50 flex items-center justify-center"
  style="background: rgba(0, 0, 0, 0.35); backdrop-filter: blur(2px);"
>
  <div
    class="bg-gradient-to-br from-blue-700 via-blue-400 to-cyan-400 rounded-xl shadow-xl p-8 max-w-lg w-full mx-auto relative overflow-y-auto"
    style="max-height: 90vh;"
  >
    <button
      @click="onClose"
      class="absolute top-4 right-4 text-white text-2xl font-bold hover:text-red-400 transition"
    >×</button>
    <h2 class="text-2xl font-extrabold text-center text-white mb-6 drop-shadow">Tambah Inovasi Baru</h2>
    <form @submit.prevent="handleAddInovasi" class="space-y-5">
      <div>
        <label class="block text-sm font-bold text-white mb-2">Tahun</label>
        <input v-model="formInovasi.tahun" type="text" required placeholder="Tahun"
          class="w-full rounded-lg px-4 py-2 border border-blue-300 bg-white/90 text-blue-700 font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow" />
      </div>
      <div>
        <label class="block text-sm font-bold text-white mb-2">Judul Inovasi</label>
        <input v-model="formInovasi.judul_inovasi" type="text" required placeholder="Judul Inovasi"
          class="w-full rounded-lg px-4 py-2 border border-blue-300 bg-white/90 text-blue-700 font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow" />
      </div>
      <div>
        <label class="block text-sm font-bold text-white mb-2">KLD</label>
        <input v-model="formInovasi.kld" type="text" required placeholder="KLD"
          class="w-full rounded-lg px-4 py-2 border border-blue-300 bg-white/90 text-blue-700 font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow" />
      </div>
      <!-- <div>
        <label class="block text-sm font-bold text-white mb-2">Urusan</label>
        <input v-model="formInovasi.urusan" type="text" required placeholder="Urusan"
          class="w-full rounded-lg px-4 py-2 border border-blue-300 bg-white/90 text-blue-700 font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow" />
      </div> -->
      <div>
        <label class="block text-sm font-bold text-white mb-2">Inovator</label>
        <input v-model="formInovasi.inovator" type="text" placeholder="Inovator"
          class="w-full rounded-lg px-4 py-2 border border-blue-300 bg-white/90 text-blue-700 font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow" />
      </div>
      <div>
        <label class="block text-sm font-bold text-white mb-2">SDGS</label>
        <input v-model="formInovasi.sdgs" type="text" placeholder="SDGS"
          class="w-full rounded-lg px-4 py-2 border border-blue-300 bg-white/90 text-blue-700 font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow" />
      </div>
      <div>
        <label class="block text-sm font-bold text-white mb-2">Deskripsi</label>
        <textarea v-model="formInovasi.deskripsi" rows="3" required placeholder="Deskripsi inovasi"
          class="w-full rounded-lg px-4 py-2 border border-blue-300 bg-white/90 text-blue-700 font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow resize-none"></textarea>
      </div>
      <div class="flex justify-end gap-3 mt-6">
        <button type="button" @click="onClose"
          class="bg-gray-500 text-white px-5 py-2 rounded-lg font-bold shadow hover:bg-gray-600 transition">
          Batal
        </button>
        <button type="submit"
          class="bg-gradient-to-r from-blue-700 via-blue-400 to-cyan-400 text-white px-5 py-2 rounded-lg font-bold shadow hover:scale-105 hover:shadow-xl transition-all">
          Simpan
        </button>
      </div>
    </form>
  </div>
</div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const inolands = ref([])
const showModalAdd = ref(false)
const currentPage = ref(1)
const itemsPerPage = 10

const formInovasi = ref({
  tahun: '',
  judul_inovasi: '',
  kld: '',
  urusan: '',
  inovator: '',
  sdgs: '',
  deskripsi: ''
})

const fetchInolands = async () => {
  try {
    const res = await $fetch('/api/inolands')
    // Ambil data dari res.data
    inolands.value = Array.isArray(res.data) ? res.data : []
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
  inolands.value = inolands.value.filter(item => item.id !== id)
}

const handlePageChange = (newPage) => {
  if (newPage < 1 || newPage > totalPages.value) return
  currentPage.value = newPage
}

const handleAddInovasi = () => {
  // id baru dari Date.now(), wilayah kosong
  inolands.value.unshift({
    ...formInovasi.value,
    id: Date.now(),
    wilayah: { nama_provinsi: '', nama_kabkot: '' }
  })
  showModalAdd.value = false
  formInovasi.value = {
    tahun: '',
    judul_inovasi: '',
    kld: '',
    urusan: '',
    inovator: '',
    sdgs: '',
    deskripsi: ''
  }
}

function onClose() {
  showModalAdd.value = false
}

const indexOfLastItem = computed(() => currentPage.value * itemsPerPage)
const indexOfFirstItem = computed(() => indexOfLastItem.value - itemsPerPage)
const currentItems = computed(() => inolands.value.slice(indexOfFirstItem.value, indexOfLastItem.value))
const totalPages = computed(() => Math.ceil(inolands.value.length / itemsPerPage))
</script>

<style scoped>
.font-poppins {
  font-family: 'Poppins', sans-serif;
}
td.w-96, th.w-96 { max-width: 24rem; }
td.w-56, th.w-56 { max-width: 14rem; }
td.w-40, th.w-40 { max-width: 10rem; }
td.w-32, th.w-32 { max-width: 8rem; }
button:disabled {
  cursor: not-allowed;
}
</style>