<template>
  <div class="min-h-screen p-6 pt-24">
    <div class="max-w-7xl mx-auto">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-bold text-gray-800">Daftar Pengajuan Pendampingan</h1>
        <div>
          <input v-model="search" placeholder="Cari instansi / penanggung jawab" class="px-3 py-2 border rounded-md" />
        </div>
      </div>

      <div class="bg-white rounded-lg shadow overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500">#</th>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500">Instansi</th>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500">Penanggung Jawab</th>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500">Jabatan</th>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500">Email</th>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500">Telepon</th>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500">Jenis Pendampingan</th>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500">Keterangan</th>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500">Tanggal</th>
              <th class="px-4 py-2 text-right text-xs font-medium text-gray-500">Aksi</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(r, idx) in paginated" :key="r.id">
              <td class="px-4 py-2 text-sm text-gray-700">{{ startIndex + idx + 1 }}</td>
              <td class="px-4 py-2 text-sm text-gray-700">{{ r.instansi }}</td>
              <td class="px-4 py-2 text-sm text-gray-700">{{ r.penanggung_jawab }}</td>
              <td class="px-4 py-2 text-sm text-gray-700">{{ r.jabatan }}</td>
              <td class="px-4 py-2 text-sm text-gray-700">{{ r.email }}</td>
              <td class="px-4 py-2 text-sm text-gray-700">{{ r.telepon }}</td>
              <td class="px-4 py-2 text-sm text-gray-700">{{ r.jenis_pendampingan }}</td>
              <td class="px-4 py-2 text-sm text-gray-700 truncate max-w-xs">{{ r.keterangan }}</td>
              <td class="px-4 py-2 text-sm text-gray-700">{{ formatDate(r.created_at || r.date || r.tanggal) }}</td>
              <td class="px-4 py-2 text-sm text-right">
                <button @click="handleDelete(r.id)" class="text-red-600 hover:underline mr-2">Hapus</button>
                <button @click="viewDetail(r)" class="text-blue-600 hover:underline">Lihat</button>
              </td>
            </tr>
            <tr v-if="!loading && filtered.length === 0">
              <td colspan="10" class="px-4 py-6 text-center text-gray-500">Belum ada pengajuan.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="flex items-center justify-between mt-4">
        <div class="text-sm text-gray-600">Menampilkan {{ filtered.length }} hasil</div>
        <div class="flex items-center gap-2">
          <button :disabled="currentPage === 1" @click="currentPage--" class="px-3 py-1 border rounded disabled:opacity-50">Prev</button>
          <span class="text-sm">Halaman {{ currentPage }} / {{ totalPages }}</span>
          <button :disabled="currentPage === totalPages" @click="currentPage++" class="px-3 py-1 border rounded disabled:opacity-50">Next</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
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
    // support both array or { data: [] }
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
  // simple alert detail; replace with modal as needed
  alert(JSON.stringify(r, null, 2))
}

// keep pagination in-range
watch([filtered, perPage], () => {
  if (currentPage.value > totalPages.value) currentPage.value = totalPages.value
})
</script>

<style scoped>
.truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
</style>
