<script setup>
import { ref, computed, onMounted } from 'vue'
import { toast } from 'vue-sonner'

const instansi = ref([])
const categories = ref([])
const isLoading = ref(true)
const currentPage = ref(1)
const itemsPerPage = 10
const searchQuery = ref('')
const selectedCategory = ref('')

const form = ref({ agency_id: '', agency_name: '', agency_category_id: '' })
const editMode = ref(false)
const editId = ref(null)
const isModalOpen = ref(false)

const fetchInstansi = async () => {
  isLoading.value = true
  try {
    const res = await $fetch('/api/instansi')
    instansi.value = res.data ?? []
  } catch (err) {
    console.error('Error fetching instansi:', err)
    instansi.value = []
    toast.error('Gagal memuat data instansi.')
  } finally {
    isLoading.value = false
  }
}

const fetchCategories = async () => {
  try {
    const res = await $fetch('/api/instansi_kategori')
    categories.value = res.data ?? []
  } catch (err) {
    console.warn('Kategori instansi tidak tersedia:', err)
    categories.value = []
  }
}

onMounted(() => {
  fetchInstansi()
  fetchCategories()
})

const indexOfLastItem = computed(() => currentPage.value * itemsPerPage)
const indexOfFirstItem = computed(() => indexOfLastItem.value - itemsPerPage)

const filteredInstansi = computed(() => {
  const q = (searchQuery.value || '').toString().trim().toLowerCase()
  return instansi.value.filter(item => {
    if (selectedCategory.value !== '' && String(item.agency_category_id) !== String(selectedCategory.value)) return false
    if (!q) return true
    const name = (item.agency_name || '').toString().toLowerCase()
    const agencyId = (item.agency_id || '').toString().toLowerCase()
    return name.includes(q) || agencyId.includes(q)
  })
})

const currentItems = computed(() => filteredInstansi.value.slice(indexOfFirstItem.value, indexOfLastItem.value))
const totalPages = computed(() => Math.max(1, Math.ceil(filteredInstansi.value.length / itemsPerPage)))

const openAddModal = () => {
  editMode.value = false
  editId.value = null
  form.value = { agency_id: '', agency_name: '', agency_category_id: '' }
  isModalOpen.value = true
}

const openEditModal = (item) => {
  editMode.value = true
  editId.value = item.id
  form.value = { agency_id: item.agency_id || '', agency_name: item.agency_name || '', agency_category_id: item.agency_category_id || '' }
  isModalOpen.value = true
}

const handleSave = async () => {
  try {
    if (editMode.value && editId.value) {
      await $fetch(`/api/instansi/${editId.value}`, { method: 'PUT', body: form.value })
      instansi.value = instansi.value.map(i => i.id === editId.value ? { ...i, ...form.value } : i)
      toast.success('Instansi berhasil diperbarui.')
    } else {
      const res = await $fetch('/api/instansi', { method: 'POST', body: form.value })
      // If API returns created object in res.data, push it; otherwise refetch
      if (res?.data) instansi.value.unshift(res.data)
      else fetchInstansi()
      toast.success('Instansi berhasil ditambahkan.')
    }
    isModalOpen.value = false
  } catch (err) {
    console.error('Error saving instansi:', err)
    toast.error('Gagal menyimpan instansi.')
  }
}

const handleDelete = async (id) => {
  if (!confirm('Hapus instansi ini?')) return
  try {
    await $fetch(`/api/instansi/${id}`, { method: 'DELETE' })
    instansi.value = instansi.value.filter(i => i.id !== id)
    toast.success('Instansi dihapus.')
  } catch (err) {
    console.error('Error deleting instansi:', err)
    toast.error('Gagal menghapus instansi.')
  }
}
</script>

<template>
  <div class="w-full mt-24">
    <h1 class="text-3xl font-extrabold text-center mb-4 font-poppins text-blue-700 drop-shadow">Daftar Instansi</h1>
    <hr class="w-32 h-1 bg-gradient-to-r from-blue-700 via-cyan-400 to-blue-700 mx-auto mb-8 rounded" />

    <div class="w-11/12 mx-auto mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div class="flex items-center gap-3 w-full md:w-2/3">
        <input v-model="searchQuery" placeholder="Cari nama atau agency id..." class="form-input p-2 flex-1" />
        <select v-model="selectedCategory" class="form-input p-2 w-48">
          <option value="">Semua Kategori</option>
          <option v-for="c in categories" :key="c.id" :value="c.id">{{ c.kat_instansi }}</option>
        </select>
        <button @click="() => { searchQuery=''; selectedCategory=''; currentPage=1 }" class="px-3 py-2 bg-gray-100 rounded">Reset</button>
      </div>
      <div class="w-full md:w-auto text-right">
        <button @click="openAddModal" class="bg-gradient-to-r from-cyan-400 to-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow hover:bg-white hover:text-blue-700 transition">+ Tambah Instansi</button>
      </div>
    </div>

    <div class="w-11/12 mx-auto bg-white shadow rounded overflow-hidden">
      <table class="min-w-full text-sm">
        <thead class="bg-gradient-to-r from-blue-700 via-blue-400 to-cyan-400 text-white">
          <tr>
            <th class="p-4 text-left">No</th>
            <th class="p-4 text-left">ID Instansi</th>
            <th class="p-4 text-left">Nama Instansi</th>
            <th class="p-4 text-left">Kategori</th>
            <th class="p-4 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in currentItems" :key="item.id" class="odd:bg-gray-50 hover:bg-blue-50">
            <td class="p-4">{{ indexOfFirstItem + idx + 1 }}</td>
            <td class="p-4">{{ item.agency_id }}</td>
            <td class="p-4">{{ item.agency_name }}</td>
            <td class="p-4">{{ item.kategori?.kat_instansi || '-' }}</td>
            <td class="p-4">
              <div class="flex items-center gap-2 whitespace-nowrap">
                <button @click="() => openEditModal(item)" class="text-blue-600 hover:text-blue-700 bg-white border border-blue-200 rounded-lg px-3 py-1 shadow hover:scale-110 transition">✏️ Edit</button>
                <button @click="() => handleDelete(item.id)" class="text-red-600 hover:text-red-700 bg-white border border-red-200 rounded-lg px-3 py-1 shadow hover:scale-110 transition">🗑️ Hapus</button>
              </div>
            </td>
          </tr>
          <tr v-if="!isLoading && instansi.length === 0"><td class="p-4 text-center" colspan="5">Tidak ada data instansi.</td></tr>
          <tr v-if="isLoading"><td class="p-4 text-center" colspan="5">Memuat...</td></tr>
        </tbody>
      </table>
    </div>

    <div class="flex justify-center mt-6 gap-2">
      <button @click="currentPage--" :disabled="currentPage === 1" class="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50">Prev</button>
      <span class="px-4 py-2 bg-white rounded shadow">{{ currentPage }} / {{ totalPages }}</span>
      <button @click="currentPage++" :disabled="currentPage === totalPages" class="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50">Next</button>
    </div>

    <!-- Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 p-6">
        <h3 class="text-xl font-semibold mb-4">{{ editMode ? 'Edit Instansi' : 'Tambah Instansi' }}</h3>
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <label class="form-label">Agency ID</label>
            <input v-model="form.agency_id" class="form-input" placeholder="e.g. 510001" />
          </div>
          <div class="flex items-center gap-4">
            <label class="form-label">Nama Instansi</label>
            <input v-model="form.agency_name" class="form-input" placeholder="Nama instansi" />
          </div>
          <div class="flex items-center gap-4">
            <label class="form-label">Kategori</label>
            <select v-model="form.agency_category_id" class="form-input">
              <option value="">-- Pilih Kategori --</option>
              <option v-for="c in categories" :key="c.id" :value="c.id">{{ c.kat_instansi }}</option>
            </select>
          </div>
        </div>
        <div class="mt-6 flex justify-end gap-3">
          <button @click="isModalOpen = false" class="px-4 py-2 rounded bg-gray-100">Batal</button>
          <button @click="handleSave" class="px-4 py-2 rounded bg-blue-600 text-white">Simpan</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.font-poppins { font-family: 'Poppins', sans-serif; }
.form-label { min-width: 140px; font-size: 1rem; font-weight: 600; color: #2563eb; padding-right: 8px; text-align: right; }
.form-input { flex: 1; border: 2px solid #38bdf8; border-radius: 10px; padding: 8px 10px; font-size: 1rem; background: linear-gradient(90deg, #f8fafc 80%, #e0f2fe 100%); }
@media (max-width: 600px) { .form-label { text-align: left; min-width: 0; margin-bottom: 2px; padding-right: 0; } }
</style>
