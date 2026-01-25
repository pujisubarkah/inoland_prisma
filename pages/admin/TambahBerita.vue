<template>
  <div class="w-full mt-8">
    <h2 class="text-3xl font-bold text-center mb-6 font-poppins">Daftar Berita</h2>
    <hr class="w-32 h-1 bg-gray-300 mx-auto mb-8 rounded" />

    <!-- Tombol Tambah Berita -->
    <div class="flex justify-end w-11/12 mx-auto mb-6">
      <button
        @click="showModal = true"
        class="py-2 px-4 font-bold text-white rounded-lg shadow flex items-center bg-gray-700 hover:bg-gray-800 transition"
      >
        <span class="mr-2">➕</span> Tambah Berita
      </button>
    </div>

    <!-- Table Berita -->
    <div class="w-full flex justify-center">
      <table class="border-collapse table-auto w-11/12 text-sm shadow rounded-xl overflow-hidden bg-white">
        <thead>
          <tr class="bg-gray-200 text-gray-700">
            <th class="border-b text-base font-semibold p-4 text-left w-32">Tanggal</th>
            <th class="border-b text-base font-semibold p-4 text-left w-64">Judul</th>
            <th class="border-b text-base font-semibold p-4 text-left w-96">Deskripsi</th>
            <th class="border-b text-base font-semibold p-4 text-left w-40">Gambar</th>
            <th class="border-b text-base font-semibold p-4 text-left w-32">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="berita in paginatedBerita" :key="berita.id" class="odd:bg-gray-50 hover:bg-gray-100">
            <td class="border-b p-4 font-semibold align-top">{{ formatDate(berita.date) }}</td>
            <td class="border-b p-4 font-bold align-top">{{ berita.title }}</td>
            <td class="border-b p-4 align-top w-96">
              <div class="whitespace-pre-line">{{ berita.deskripsi }}</div>
            </td>
            <td class="border-b p-4 align-top w-40">
              <a :href="berita.imageUrl" target="_blank" class="text-gray-600 underline hover:text-gray-900 block truncate">
                {{ berita.imageUrl }}
              </a>
            </td>
            <td class="border-b p-4 font-bold flex gap-2">
              <button class="text-gray-700 hover:text-gray-900 bg-white border border-gray-200 rounded-lg px-2 py-1 shadow">✏️</button>
              <button @click="deleteBerita(berita.id)" class="text-red-600 hover:text-red-700 bg-white border border-red-200 rounded-lg px-2 py-1 shadow">🗑️</button>
            </td>
          </tr>
          <tr v-if="paginatedBerita.length === 0">
            <td colspan="5" class="text-center p-4 text-gray-700">Belum ada berita.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="flex flex-col items-center mt-8 gap-2">
      <span class="font-semibold">Halaman {{ currentPage }} dari {{ totalPages }}</span>
      <div class="flex gap-2 mt-2">
        <button
          @click="currentPage > 1 && (currentPage--)"
          :disabled="currentPage === 1"
          class="px-4 py-2 bg-gray-700 text-white rounded-lg font-bold shadow hover:bg-gray-800 transition disabled:opacity-50"
        >Sebelumnya</button>
        <button
          @click="currentPage < totalPages && (currentPage++)"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 bg-gray-700 text-white rounded-lg font-bold shadow hover:bg-gray-800 transition disabled:opacity-50"
        >Selanjutnya</button>
      </div>
    </div>

    <!-- Modal Tambah Berita -->
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center"
      style="background: rgba(0,0,0,0.35); backdrop-filter: blur(2px);"
    >
      <div class="bg-white rounded-xl shadow-xl p-8 max-w-lg w-full mx-auto relative">
        <button
          @click="showModal = false"
          class="absolute top-4 right-4 text-gray-700 text-2xl font-bold hover:text-red-400 transition"
        >×</button>
        <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Tambah Berita Baru</h2>
        <form @submit.prevent="handleSubmit" class="space-y-5">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Tanggal</label>
            <input v-model="formData.date" type="date" required class="w-full rounded-lg px-4 py-2 border border-gray-300 bg-white text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-gray-200 shadow" />
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Judul</label>
            <input v-model="formData.title" type="text" required placeholder="Judul berita" class="w-full rounded-lg px-4 py-2 border border-gray-300 bg-white text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-gray-200 shadow" />
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Deskripsi</label>
            <textarea v-model="formData.deskripsi" rows="3" required placeholder="Deskripsi berita" class="w-full rounded-lg px-4 py-2 border border-gray-300 bg-white text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-gray-200 shadow resize-none"></textarea>
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Upload Gambar</label>
            <input type="file" accept="image/*" @change="handleImageUpload" required class="w-full rounded-lg px-4 py-2 border border-gray-300 bg-white text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-gray-200 shadow" />
            <div v-if="formData.imageUrl" class="mt-3">
              <img :src="formData.imageUrl" alt="Preview" class="w-32 rounded shadow border border-gray-200" />
            </div>
            <input v-model="formData.imageUrl" type="hidden" />
          </div>
          <div class="flex justify-end gap-3 mt-6">
            <button type="button" @click="showModal = false" class="bg-gray-400 text-white px-5 py-2 rounded-lg font-bold shadow hover:bg-gray-500 transition">Batal</button>
            <button type="submit" :disabled="isUploading" class="bg-gray-700 text-white px-5 py-2 rounded-lg font-bold shadow hover:bg-gray-800 transition-all disabled:opacity-60">
              {{ isUploading ? 'Mengunggah...' : 'Simpan' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const showModal = ref(false)
const isUploading = ref(false)

const beritaList = ref([])
const formData = ref({
  date: '',
  title: '',
  deskripsi: '',
  imageUrl: ''
})

const itemsPerPage = 5
const currentPage = ref(1)
const totalPages = computed(() => Math.max(1, Math.ceil(beritaList.value.length / itemsPerPage)))
const paginatedBerita = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return beritaList.value.slice(start, end)
})

onMounted(async () => {
  // Contoh fetch dari API lokal
  try {
    const res = await $fetch('/api/berita')
    beritaList.value = Array.isArray(res) ? res : []
  } catch (error) {
    console.error('Gagal mengambil data berita:', error)
  }
})

function handleSubmit() {
  beritaList.value.unshift({ ...formData.value, id: Date.now() })
  showModal.value = false
  formData.value = {
    date: '',
    title: '',
    deskripsi: '',
    imageUrl: ''
  }
}

function deleteBerita(id) {
  beritaList.value = beritaList.value.filter(b => b.id !== id)
}

function formatDate(dateStr) {
  if (!dateStr) return '-'
  const d = new Date(dateStr)
  return d.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })
}

// Ganti ini dengan API key ImgBB kamu
const API_KEY = '8785d517aff1a23a4dd1e3d4081e8a54'

async function handleImageUpload(e) {
  const file = e.target.files[0]
  if (!file) return

  if (file.size > 2 * 1024 * 1024) {
    alert('Ukuran gambar maksimal 2MB!')
    return
  }

  const formDataImg = new FormData()
  formDataImg.append('key', API_KEY)
  formDataImg.append('image', file)

  isUploading.value = true

  try {
    const res = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: formDataImg
    })
    const data = await res.json()
    if (data.success) {
      formData.value.imageUrl = data.data.url
      alert('Gambar berhasil diupload!')
    } else {
      alert('Gagal upload gambar: ' + (data.error?.message || 'Unknown error'))
    }
  } catch (error) {
    console.error('Error uploading image:', error)
    alert('Terjadi kesalahan saat mengunggah gambar.')
  } finally {
    isUploading.value = false
  }
}
</script>

<style scoped>
td.w-64, th.w-64 { max-width: 16rem; }
td.w-96, th.w-96 { max-width: 24rem; }
td.w-40, th.w-40 { max-width: 10rem; }
td.w-32, th.w-32 { max-width: 8rem; }
</style>
