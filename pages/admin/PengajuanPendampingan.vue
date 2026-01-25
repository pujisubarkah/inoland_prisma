<template>
  <div class="w-full mt-8">
    <h1 class="text-3xl font-bold text-center font-poppins my-5">Pengajuan Pendampingan</h1>
    <hr class="w-[120px] h-[3px] mx-auto my-5 bg-gray-300 border-none rounded" />

    <div class="w-11/12 mx-auto mb-4 flex items-center justify-between gap-4">
      <input v-model="search" placeholder="Cari instansi / penanggung jawab" class="border rounded px-3 py-2 w-2/3" />
      <div class="flex gap-2">
        <button @click="fetchRequests" class="py-2 px-4 bg-gray-700 text-white rounded hover:bg-gray-800 transition">Refresh</button>
      </div>
    </div>

    <div class="w-full flex justify-center mt-4">
      <table class="border-collapse table-auto w-11/12 text-sm shadow rounded-xl overflow-hidden bg-white">
        <thead>
          <tr class="bg-gray-200 text-gray-700">
            <th class="border-b text-base font-semibold p-4 text-left w-12">#</th>
            <th class="border-b text-base font-semibold p-4 text-left">Instansi</th>
            <th class="border-b text-base font-semibold p-4 text-left">Penanggung Jawab</th>
            <th class="border-b text-base font-semibold p-4 text-left">Jabatan</th>
            <th class="border-b text-base font-semibold p-4 text-left">Email</th>
            <th class="border-b text-base font-semibold p-4 text-left">Telepon</th>
            <th class="border-b text-base font-semibold p-4 text-left">Jenis Pendampingan</th>
            <th class="border-b text-base font-semibold p-4 text-left w-96">Keterangan</th>
            <th class="border-b text-base font-semibold p-4 text-left">Tanggal</th>
            <th class="border-b text-base font-semibold p-4 text-left w-32">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(r, idx) in paginated" :key="r.id" class="odd:bg-gray-50 hover:bg-gray-100">
            <td class="border-b p-4 font-semibold text-gray-700">{{ startIndex + idx + 1 }}</td>
            <td class="border-b p-4 text-gray-700">{{ r.instansi }}</td>
            <td class="border-b p-4 text-gray-700">{{ r.penanggung_jawab }}</td>
            <td class="border-b p-4 text-gray-700">{{ r.jabatan }}</td>
            <td class="border-b p-4 text-gray-700">{{ r.email }}</td>
            <td class="border-b p-4 text-gray-700">{{ r.telepon }}</td>
            <td class="border-b p-4 text-gray-700">{{ r.jenis_pendampingan }}</td>
            <td class="border-b p-4 text-gray-700 w-96">
              <div class="whitespace-pre-line truncate">{{ r.keterangan }}</div>
            </td>
            <td class="border-b p-4 text-gray-700">{{ formatDate(r.created_at || r.date || r.tanggal) }}</td>
            <td class="border-b p-4 font-semibold flex gap-2">
              <button @click="handleDelete(r.id)" class="text-red-600 hover:text-red-700 bg-white border border-red-200 rounded-lg px-2 py-1 shadow hover:scale-105 transition">🗑️</button>
              <button @click="viewDetail(r)" class="text-gray-700 hover:text-gray-900 bg-white border border-gray-200 rounded-lg px-2 py-1 shadow hover:scale-105 transition">🔍</button>
            </td>
          </tr>

          <tr v-if="!loading && filtered.length === 0">
            <td colspan="10" class="text-center p-4 text-gray-700">Belum ada pengajuan.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex justify-center mt-8 gap-2">
      <button
        @click="currentPage > 1 && (currentPage--)"
        :disabled="currentPage === 1"
        class="px-5 py-2 bg-gray-700 text-white font-bold rounded-lg shadow hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Sebelumnya
      </button>
      <span class="px-4 py-2 font-semibold text-gray-700 bg-white rounded shadow">
        {{ currentPage }} / {{ totalPages }}
      </span>
      <button
        @click="currentPage < totalPages && (currentPage++)"
        :disabled="currentPage === totalPages"
        class="px-5 py-2 bg-gray-700 text-white font-bold rounded-lg shadow hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Selanjutnya
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { toast } from 'vue-sonner'

const requests = ref([])
const loading = ref(true)
const error = ref(null)
const search = ref('')

const currentPage = ref(1)
const perPage = ref(10)

const fetchRequests = async () => {
  loading.value = true
  try {
    const res = await $fetch('/api/inoland-assistance-request')
    requests.value = Array.isArray(res) ? res : (res.data || [])
  } catch (err) {
    console.error('fetchRequests error', err)
    error.value = 'Gagal memuat data.'
  } finally {
    loading.value = false
  }
}

onMounted(fetchRequests)

const filtered = computed(() => {
  if (!search.value) return requests.value
  const q = search.value.toLowerCase()
  return requests.value.filter(r => {
    return (r.instansi || '').toLowerCase().includes(q) || (r.penanggung_jawab || '').toLowerCase().includes(q)
  })
})

const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / perPage.value)))
const startIndex = computed(() => (currentPage.value - 1) * perPage.value)
const paginated = computed(() => filtered.value.slice(startIndex.value, startIndex.value + perPage.value))

function formatDate(d) {
  if (!d) return '-'
  try {
    const dt = new Date(d)
    return dt.toLocaleString('id-ID')
  } catch (_) { return String(d) }
}

async function handleDelete(id) {
  if (!confirm('Hapus pengajuan ini?')) return
  try {
    await $fetch(`/api/inoland-assistance-request/${id}`, { method: 'DELETE' })
    requests.value = requests.value.filter(r => r.id !== id)
    toast.success('Pengajuan dihapus')
  } catch (err) {
    console.error('delete error', err)
    toast.error('Gagal menghapus')
  }
}

function viewDetail(r) {
  alert(JSON.stringify(r, null, 2))
}

watch([filtered, perPage], () => {
  if (currentPage.value > totalPages.value) currentPage.value = totalPages.value
})
</script>

<style scoped>
.font-poppins { font-family: 'Poppins', sans-serif; }
.truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
</style>
