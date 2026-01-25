<template>
  <div class="w-full mt-8">
    <h1 class="text-3xl font-bold text-center font-poppins my-5">Tambah Inovasi</h1>
    <hr class="w-[120px] h-[3px] mx-auto my-5 bg-gray-300 border-none rounded" />

    <!-- Filter Wilayah -->
    <div class="w-11/12 mx-auto mb-4 flex items-center gap-4">
      <label class="text-gray-700 font-semibold">Filter Wilayah:</label>
      <select v-model="filterWilayah" class="border rounded px-3 py-2 text-gray-800">
        <option value="">Semua Wilayah</option>
        <option
          v-for="wil in wilayahList"
          :key="wil"
          :value="wil"
        >
          {{ wil }}
        </option>
      </select>
    </div>

    <div class="flex justify-end w-11/12 mx-auto">
      <button
        @click="showModalAdd = true"
        class="py-2 px-4 font-bold text-white rounded-lg shadow flex items-center bg-gray-700 hover:bg-gray-800 transition"
      >
        <span class="mr-2">➕</span> Tambah Inovasi
      </button>
    </div>

    <div class="w-full flex justify-center mt-16">
      <table class="border-collapse table-auto w-11/12 text-sm shadow rounded-xl overflow-hidden bg-white">
        <thead>
          <tr class="bg-gray-200 text-gray-700">
            <th class="border-b text-base font-semibold p-4 pl-8 text-left w-24">Tahun</th>
            <th class="border-b text-base font-semibold p-4 text-left w-56">Judul Inovasi</th>
            <th class="border-b text-base font-semibold p-4 text-left w-40">KLD</th>
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
            class="odd:bg-gray-50 hover:bg-gray-100"
          >
            <td class="border-b p-4 font-bold align-top">{{ item.tahun }}</td>
            <td class="border-b p-4 font-bold align-top">{{ item.judul_inovasi }}</td>
            <td class="border-b p-4 font-bold align-top">{{ item.kld }}</td>
            <td class="border-b p-4 font-bold align-top">{{ item.inovator || '-' }}</td>
            <td class="border-b p-4 font-bold align-top">
              {{ getSdgsLabel(item.sdgs) }}
            </td>
            <td class="border-b p-4 align-top w-96">
              <div class="whitespace-pre-line">{{ item.deskripsi }}</div>
            </td>
            <td class="border-b p-4 align-top">
              {{ item.wilayah?.nama_provinsi || '-' }}<br>
              {{ item.wilayah?.nama_kabkot || '-' }}
            </td>
            <td class="border-b p-4 font-bold flex gap-2 w-32">
              <button @click="handleEditClick(item.id)" class="text-gray-700 hover:text-gray-900 bg-white border border-gray-200 rounded-lg px-2 py-1 shadow">✏️</button>
              <button @click="deleteProduct(item.id)" class="text-red-600 hover:text-red-700 bg-white border border-red-200 rounded-lg px-2 py-1 shadow">🗑️</button>
            </td>
          </tr>
          <tr v-if="currentItems.length === 0">
            <td colspan="8" class="text-center p-4 text-gray-700">Belum ada inovasi.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex justify-center mt-8 gap-2">
      <button
        @click="handlePageChange(currentPage - 1)"
        :disabled="currentPage === 1"
        class="px-5 py-2 bg-gray-700 text-white font-bold rounded-lg shadow hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      <span class="px-4 py-2 font-semibold bg-white rounded shadow">
        {{ currentPage }} / {{ totalPages }}
      </span>
      <button
        @click="handlePageChange(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="px-5 py-2 bg-gray-700 text-white font-bold rounded-lg shadow hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
    <!-- Modal Tambah Inovasi (manual) - REPLACE THIS BLOCK -->
    <div
      v-if="showModalAdd"
      class="fixed inset-0 z-50 flex items-center justify-center"
      style="background: rgba(0, 0, 0, 0.35); backdrop-filter: blur(2px);"
    >
      <div
        class="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-4xl mx-auto relative overflow-y-auto border border-gray-200"
        style="max-height: 90vh;"
      >
        <button
          @click="onClose"
          class="absolute top-4 right-4 text-gray-400 text-2xl font-bold hover:text-red-400 transition"
          aria-label="Tutup"
        >×</button>
        <h2 class="text-2xl font-bold text-center text-gray-800 mb-2">Tambah Inovasi Baru</h2>
        <p class="text-center text-gray-500 mb-6">Isi data inovasi dengan lengkap dan benar.</p>

        <form @submit.prevent="handleAddInovasi" class="space-y-6">
          <div class="space-y-4">
            <div class="flex flex-col md:flex-row md:items-center">
              <label class="md:w-56 w-full text-sm font-semibold text-gray-700 mb-1 md:mb-0 md:text-right pr-4">Tahun <span class="text-red-500">*</span></label>
              <input v-model="formInovasi.tahun" type="text" required placeholder="Contoh: 2026"
                class="flex-1 rounded-lg px-4 py-2 border border-gray-300 bg-white text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition" />
            </div>

            <div class="flex flex-col md:flex-row md:items-center">
              <label class="md:w-56 w-full text-sm font-semibold text-gray-700 mb-1 md:mb-0 md:text-right pr-4">Judul <span class="text-red-500">*</span></label>
              <input v-model="formInovasi.judul_inovasi" type="text" required placeholder="Judul inovasi"
                class="flex-1 rounded-lg px-4 py-2 border border-gray-300 bg-white text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition" />
            </div>

            <div class="flex flex-col md:flex-row md:items-center">
              <label class="md:w-56 w-full text-sm font-semibold text-gray-700 mb-1 md:mb-0 md:text-right pr-4">KLD <span class="text-red-500">*</span></label>
              <input v-model="formInovasi.kld" type="text" required placeholder="Kementerian/Lembaga/Daerah"
                class="flex-1 rounded-lg px-4 py-2 border border-gray-300 bg-white text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition" />
            </div>

            <div class="flex flex-col md:flex-row md:items-center">
              <label class="md:w-56 w-full text-sm font-semibold text-gray-700 mb-1 md:mb-0 md:text-right pr-4">Inovator</label>
              <input v-model="formInovasi.inovator" type="text" placeholder="Nama inovator (opsional)"
                class="flex-1 rounded-lg px-4 py-2 border border-gray-300 bg-white text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition" />
            </div>

            <div class="flex flex-col md:flex-row md:items-center">
              <label class="md:w-56 w-full text-sm font-semibold text-gray-700 mb-1 md:mb-0 md:text-right pr-4">SDGS</label>
              <select v-model="formInovasi.sdgs"
                class="flex-1 rounded-lg px-4 py-2 border border-gray-300 bg-white text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition">
                <option value="">Pilih SDGS (opsional)</option>
                <option v-for="s in sdgsList" :key="s.id" :value="s.id">
                  {{ s.tujuan_ke }}. {{ s.sdgs }}
                </option>
              </select>
            </div>

            <div class="flex flex-col md:flex-row md:items-start">
              <label class="md:w-56 w-full text-sm font-semibold text-gray-700 mb-1 md:mb-0 md:text-right pr-4 pt-2">Deskripsi <span class="text-red-500">*</span></label>
              <textarea v-model="formInovasi.deskripsi" rows="4" required placeholder="Jelaskan inovasi secara singkat dan jelas"
                class="flex-1 rounded-lg px-4 py-2 border border-gray-300 bg-white text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition resize-none"></textarea>
            </div>
          </div>

          <div class="flex justify-end gap-3 mt-2">
            <button type="button" @click="onClose"
              class="flex items-center gap-2 bg-gray-400 text-white px-5 py-2 rounded-lg font-bold shadow hover:bg-gray-500 transition">
              <span>✖️</span> Batal
            </button>
            <button type="submit"
              class="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg font-bold shadow hover:bg-blue-700 transition-all disabled:opacity-60">
              <span>💾</span> Simpan
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

const filterWilayah = ref('')
const wilayahList = ref([])

const formInovasi = ref({
  tahun: '',
  judul_inovasi: '',
  kld: '',
  urusan: '',
  inovator: '',
  sdgs: '', // akan berisi id SDGS
  deskripsi: ''
})

const sdgsList = ref([])

const fetchInolands = async () => {
  try {
    const res = await $fetch('/api/inolands')
    inolands.value = Array.isArray(res.data) ? res.data : []
    const wilayahSet = new Set()
    inolands.value.forEach(item => {
      if (item.wilayah && item.wilayah.nama_provinsi) {
        wilayahSet.add(item.wilayah.nama_provinsi)
      }
    })
    wilayahList.value = Array.from(wilayahSet)
  } catch (error) {
    console.error('Gagal mengambil data inovasi:', error)
  }
}

const fetchSdgs = async () => {
  try {
    const res = await $fetch('/api/sdgs')
    // support responses like { success:true, data: [...] } or direct array
    sdgsList.value = Array.isArray(res?.data) ? res.data : (Array.isArray(res) ? res : (Array.isArray(res?.data?.data) ? res.data.data : []))
  } catch (err) {
    console.error('Gagal mengambil SDGS:', err)
    sdgsList.value = []
  }
}

onMounted(() => {
  fetchInolands()
  fetchSdgs()
})

// helper untuk tampilkan label SDGS dari id
const sdgsMap = computed(() => {
  const m = {}
  sdgsList.value.forEach(s => { m[s.id] = s })
  return m
})

function getSdgsLabel(sdgsId) {
  if (!sdgsId) return '-'
  return sdgsMap.value[sdgsId]?.sdgs ?? sdgsId
}

const handleEditClick = (id) => {
  console.log('Edit item with id:', id)
}

const deleteProduct = async (id) => {
  inolands.value = inolands.value.filter(item => item.id !== id)
}

const handlePageChange = (newPage) => {
  if (newPage < 1 || newPage > totalPages.value) return
  currentPage.value = newPage
}

const handleAddInovasi = () => {
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

// Filter inovasi berdasarkan wilayah
const filteredInolands = computed(() => {
  if (!filterWilayah.value) return inolands.value
  return inolands.value.filter(item => item.wilayah && item.wilayah.nama_provinsi === filterWilayah.value)
})

const indexOfLastItem = computed(() => currentPage.value * itemsPerPage)
const indexOfFirstItem = computed(() => indexOfLastItem.value - itemsPerPage)
const currentItems = computed(() => filteredInolands.value.slice(indexOfFirstItem.value, indexOfLastItem.value))
const totalPages = computed(() => Math.ceil(filteredInolands.value.length / itemsPerPage))
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
