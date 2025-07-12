<template>
  <div class="w-full mt-24">
    <h2 class="text-3xl font-extrabold text-center text-blue-700 mb-6 drop-shadow">Daftar Berita</h2>
    <hr class="w-32 h-1 bg-gradient-to-r from-blue-700 via-cyan-400 to-blue-700 mx-auto mb-8 rounded" />

    <!-- Tombol Tambah Berita -->
    <div class="flex justify-end w-11/12 mx-auto mb-6">
      <button
        @click="showModal = true"
        class="py-2 px-4 font-bold text-white rounded-lg shadow-lg flex items-center bg-gradient-to-r from-blue-700 via-blue-400 to-cyan-400 hover:scale-105 hover:shadow-xl transition-all duration-200"
      >
        <span class="mr-2">➕</span> Tambah Berita
      </button>
    </div>

    <!-- Table Berita -->
    <div class="w-full flex justify-center">
      <table class="border-collapse table-auto w-11/12 text-sm shadow-xl rounded-xl overflow-hidden bg-white">
        <thead>
          <tr class="bg-gradient-to-r from-blue-700 via-blue-400 to-cyan-400 text-white">
            <th class="border-b text-base font-semibold p-4 text-left w-32">Tanggal</th>
            <th class="border-b text-base font-semibold p-4 text-left w-64">Judul</th>
            <th class="border-b text-base font-semibold p-4 text-left w-96">Deskripsi</th>
            <th class="border-b text-base font-semibold p-4 text-left w-40">Link Gambar</th>
            <th class="border-b text-base font-semibold p-4 text-left w-32">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="berita in paginatedBerita" :key="berita.id" class="hover:bg-blue-50 transition">
            <td class="border-b p-4 text-blue-700 font-semibold align-top">
              {{ formatDate(berita.date) }}
            </td>
            <td class="border-b p-4 text-blue-700 font-bold align-top">
              {{ berita.title }}
            </td>
            <td class="border-b p-4 text-blue-700 align-top w-96">
              <div class="whitespace-pre-line">{{ berita.deskripsi }}</div>
            </td>
            <td class="border-b p-4 text-blue-700 align-top w-40">
              <a
                :href="berita.imageUrl"
                target="_blank"
                class="text-cyan-600 underline hover:text-blue-700 block truncate"
              >
                {{ berita.imageUrl }}
              </a>
            </td>
            <td class="border-b p-4 font-bold flex gap-2">
              <button @click="handleEditClick(item.id)" class="text-blue-600 hover:text-blue-700 bg-white border border-blue-200 rounded-lg px-2 py-1 shadow hover:scale-110 transition">
                ✏️
              </button>
              <button @click="deleteProduct(item.id)" class="text-red-600 hover:text-red-700 bg-white border border-red-200 rounded-lg px-2 py-1 shadow hover:scale-110 transition">
                🗑️
              </button>
            </td>
          </tr>
          <tr v-if="paginatedBerita.length === 0">
            <td colspan="5" class="text-center p-4 text-blue-700">Belum ada berita.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination (shadcn) -->
    <div class="flex flex-col items-center mt-8 gap-2">
      <span class="text-blue-700 font-semibold">
        Halaman {{ currentPage }} dari {{ Math.ceil(beritaList.length / itemsPerPage) }}
      </span>
      <Pagination
        :total="beritaList.length"
        :page-size="itemsPerPage"
        v-model:page="currentPage"
        show-controls
        class="bg-white rounded-lg shadow px-4 py-2"
      />
      <div class="flex gap-2 mt-2">
        <button
          @click="currentPage > 1 && (currentPage--)"
          :disabled="currentPage === 1"
          class="px-4 py-2 bg-blue-700 text-white rounded-lg font-bold shadow hover:bg-blue-800 transition disabled:opacity-50"
        >
          Sebelumnya
        </button>
        <button
          @click="currentPage < Math.ceil(beritaList.length / itemsPerPage) && (currentPage++)"
          :disabled="currentPage === Math.ceil(beritaList.length / itemsPerPage)"
          class="px-4 py-2 bg-blue-700 text-white rounded-lg font-bold shadow hover:bg-blue-800 transition disabled:opacity-50"
        >
          Selanjutnya
        </button>
      </div>
    </div>

    <!-- Modal Tambah Berita (shadcn dialog) -->
    <Dialog v-model:open="showModal">
      <DialogContent class="bg-gradient-to-br from-blue-700 via-blue-400 to-cyan-400 rounded-xl shadow-xl p-8 max-w-lg w-full mx-auto mt-8">
        <h2 class="text-2xl font-extrabold text-center text-white mb-6 drop-shadow">Tambah Berita Baru</h2>
        <form @submit.prevent="handleSubmit" class="space-y-5">
          <div>
            <label class="block text-sm font-bold text-white mb-2">Tanggal</label>
            <input
              v-model="formData.date"
              type="date"
              required
              class="w-full rounded-lg px-4 py-2 border border-blue-300 bg-white/90 text-blue-700 font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow"
            />
          </div>
          <div>
            <label class="block text-sm font-bold text-white mb-2">Judul</label>
            <input
              v-model="formData.title"
              type="text"
              required
              placeholder="Judul berita"
              class="w-full rounded-lg px-4 py-2 border border-blue-300 bg-white/90 text-blue-700 font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow"
            />
          </div>
          <div>
            <label class="block text-sm font-bold text-white mb-2">Deskripsi</label>
            <textarea
              v-model="formData.deskripsi"
              rows="3"
              required
              placeholder="Deskripsi berita"
              class="w-full rounded-lg px-4 py-2 border border-blue-300 bg-white/90 text-blue-700 font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow resize-none"
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-bold text-white mb-2">Link Gambar</label>
            <input
              v-model="formData.imageUrl"
              type="text"
              required
              placeholder="https://..."
              class="w-full rounded-lg px-4 py-2 border border-blue-300 bg-white/90 text-blue-700 font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow"
            />
          </div>
          <div class="flex justify-end gap-3 mt-6">
            <DialogClose as-child>
              <button
                type="button"
                @click="onClose"
                class="bg-gray-500 text-white px-5 py-2 rounded-lg font-bold shadow hover:bg-gray-600 transition"
              >
                Batal
              </button>
            </DialogClose>
            <button
              type="submit"
              class="bg-gradient-to-r from-blue-700 via-blue-400 to-cyan-400 text-white px-5 py-2 rounded-lg font-bold shadow hover:scale-105 hover:shadow-xl transition-all"
            >
              Simpan
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog'
import { Pagination } from '@/components/ui/pagination'

const showModal = ref(false)
const beritaList = ref([])

const formData = ref({
  date: '',
  title: '',
  deskripsi: '',
  imageUrl: ''
})

const itemsPerPage = 5
const currentPage = ref(1)

const paginatedBerita = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return beritaList.value.slice(start, end)
})

onMounted(async () => {
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

function onClose() {
  showModal.value = false
}

// Dummy handler for edit and delete
function editBerita(berita) {
  alert('Edit berita: ' + berita.title)
}
function deleteBerita(id) {
  beritaList.value = beritaList.value.filter(b => b.id !== id)
}

function formatDate(dateStr) {
  if (!dateStr) return '-'
  const d = new Date(dateStr)
  return d.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>

<style scoped>
/* Kolom judul dan gambar agar tidak terlalu panjang */
td.w-64, th.w-64 { max-width: 16rem; }
td.w-96, th.w-96 { max-width: 24rem; }
td.w-56, th.w-56 { max-width: 14rem; }
td.w-40, th.w-40 { max-width: 10rem; }
td.w-32, th.w-32 { max-width: 8rem; }
</style>