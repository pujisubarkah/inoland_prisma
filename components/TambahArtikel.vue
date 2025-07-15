<template>
  <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-8">
    <h2 class="text-2xl font-bold text-blue-700 mb-6">Manajemen Artikel</h2>
    <button
      @click="showForm = !showForm"
      class="mb-6 bg-blue-700 text-white font-semibold px-6 py-2 rounded hover:bg-blue-800 transition"
    >
      {{ showForm ? 'Tutup Form' : 'Tambah Artikel' }}
    </button>

    <!-- Form Tambah/Edit Artikel -->
    <div v-if="showForm" class="mb-8">
      <form @submit.prevent="editingId ? updateArtikel() : submitArtikel()">
        <div class="mb-4">
          <label class="block text-gray-700 font-semibold mb-2">Judul Artikel</label>
          <input
            v-model="form.title"
            type="text"
            class="shadcn-input w-full px-4 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Masukkan judul artikel"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-semibold mb-2">Ringkasan</label>
          <input
            v-model="form.summary"
            type="text"
            class="shadcn-input w-full px-4 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Masukkan ringkasan artikel"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-semibold mb-2">Tanggal</label>
          <input
            v-model="form.date"
            type="date"
            class="shadcn-input w-full px-4 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-semibold mb-2">Avatar (URL gambar)</label>
          <input
            v-model="form.avatar"
            type="text"
            class="shadcn-input w-full px-4 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="https://..."
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-semibold mb-2">Konten Artikel (HTML)</label>
          <QuillEditor
            v-model="form.content"
            theme="snow"
            toolbar="full"
            class="bg-white rounded border border-blue-300"
            style="min-height:200px;"
          />
        </div>
        <button
          type="submit"
          class="bg-blue-700 text-white font-semibold px-6 py-2 rounded hover:bg-blue-800 transition"
        >
          {{ editingId ? 'Update Artikel' : 'Simpan Artikel' }}
        </button>
      </form>
      <div v-if="success" class="mt-4 text-green-600 font-semibold">
        Artikel berhasil {{ editingId ? 'diupdate' : 'ditambahkan' }}!
      </div>
    </div>

    <!-- Tabel Daftar Artikel -->
    <table class="w-full border mt-4 rounded overflow-hidden">
      <thead class="bg-blue-50">
        <tr>
          <th class="py-2 px-4 text-left font-semibold text-blue-700">Judul</th>
          <th class="py-2 px-4 text-left font-semibold text-blue-700">Tanggal</th>
          <th class="py-2 px-4 text-left font-semibold text-blue-700">Ringkasan</th>
          <th class="py-2 px-4 text-left font-semibold text-blue-700">Avatar</th>
          <th class="py-2 px-4 text-left font-semibold text-blue-700">Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="artikel in daftarArtikel" :key="artikel.id" class="border-t">
          <td class="py-2 px-4 font-bold">{{ artikel.title }}</td>
          <td class="py-2 px-4">{{ formatDate(artikel.date) }}</td>
          <td class="py-2 px-4">{{ artikel.summary }}</td>
          <td class="py-2 px-4">
            <img :src="artikel.avatar" alt="avatar" class="w-10 h-10 rounded-full object-cover border" v-if="artikel.avatar"/>
          </td>
          <td class="py-2 px-4 flex gap-2">
            <button @click="editArtikel(artikel)" class="text-blue-600 hover:text-blue-700 bg-white border border-blue-200 rounded-lg px-2 py-1 shadow hover:scale-110 transition">
              ✏️
            </button>
            <button @click="deleteArtikel(artikel.id)" class="text-red-600 hover:text-red-700 bg-white border border-red-200 rounded-lg px-2 py-1 shadow hover:scale-110 transition">
              🗑️
            </button>
          </td>
        </tr>
        <tr v-if="daftarArtikel.length === 0">
          <td colspan="5" class="text-center p-4 text-blue-700">Belum ada artikel.</td>
        </tr>
      </tbody>
    </table>

    <!-- Modal Edit Artikel -->
    <div
      v-if="showEditModal"
      class="fixed inset-0 z-50 flex items-center justify-center"
      style="background: rgba(0,0,0,0.35); backdrop-filter: blur(2px);"
    >
      <div class="bg-white rounded-xl shadow-xl p-8 max-w-lg w-full mx-auto relative">
        <button
          @click="closeEditModal"
          class="absolute top-4 right-4 text-gray-700 text-2xl font-bold hover:text-red-400 transition"
          title="Tutup"
        >×</button>
        <h2 class="text-2xl font-bold text-blue-700 mb-6">Edit Artikel</h2>
        <form @submit.prevent="updateArtikel" class="space-y-5">
          <div>
            <label class="block text-gray-700 font-semibold mb-2">Judul Artikel</label>
            <input
              v-model="form.title"
              type="text"
              class="shadcn-input w-full px-4 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label class="block text-gray-700 font-semibold mb-2">Ringkasan</label>
            <input
              v-model="form.summary"
              type="text"
              class="shadcn-input w-full px-4 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label class="block text-gray-700 font-semibold mb-2">Tanggal</label>
            <input
              v-model="form.date"
              type="date"
              class="shadcn-input w-full px-4 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label class="block text-gray-700 font-semibold mb-2">Avatar (URL gambar)</label>
            <input
              v-model="form.avatar"
              type="text"
              class="shadcn-input w-full px-4 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label class="block text-gray-700 font-semibold mb-2">Konten Artikel (HTML)</label>
            <QuillEditor
              v-model="form.content"
              theme="snow"
              toolbar="full"
              class="bg-white rounded border border-blue-300"
              style="min-height:200px;"
            />
          </div>
          <div class="flex justify-end gap-3 mt-6">
            <button
              type="button"
              @click="closeEditModal"
              class="bg-gray-500 text-white px-5 py-2 rounded-lg font-bold shadow hover:bg-gray-600 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              class="bg-blue-700 text-white font-semibold px-6 py-2 rounded hover:bg-blue-800 transition"
            >
              Update Artikel
            </button>
          </div>
        </form>
        <div v-if="success" class="mt-4 text-green-600 font-semibold">
          Artikel berhasil diupdate!
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const showForm = ref(false)
const success = ref(false)
const editingId = ref(null)
const form = ref({
  title: '',
  summary: '',
  date: '',
  avatar: '',
  content: ''
})

const daftarArtikel = ref([])
const showEditModal = ref(false)

function formatDate(dateStr) {
  if (!dateStr) return '-'
  const d = new Date(dateStr)
  return d.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })
}

async function fetchArtikel() {
  try {
    const res = await $fetch('/api/artikel')
    daftarArtikel.value = Array.isArray(res) ? res : (res.data || [])
  } catch (error) {
    console.error('Gagal mengambil artikel:', error)
  }
}

async function submitArtikel() {
  try {
    const res = await $fetch('/api/artikel', {
      method: 'POST',
      body: { ...form.value }
    })
    success.value = true
    showForm.value = false
    form.value = { title: '', summary: '', date: '', avatar: '', content: '' }
    await fetchArtikel()
    setTimeout(() => { success.value = false }, 1500)
  } catch (error) {
    alert('Gagal menambah artikel')
  }
}

function editArtikel(artikel) {
  editingId.value = artikel.id
  form.value = {
    title: artikel.title,
    summary: artikel.summary,
    date: artikel.date,
    avatar: artikel.avatar,
    content: artikel.content || '' // pastikan default string kosong jika tidak ada
  }
  showEditModal.value = true
}

function closeEditModal() {
  showEditModal.value = false
  editingId.value = null
  form.value = { title: '', summary: '', date: '', avatar: '', content: '' }
}

async function updateArtikel() {
  try {
    await $fetch(`/api/artikel/${editingId.value}`, {
      method: 'PUT',
      body: { ...form.value }
    })
    success.value = true
    showEditModal.value = false
    editingId.value = null
    form.value = { title: '', summary: '', date: '', avatar: '', content: '' }
    await fetchArtikel()
    setTimeout(() => { success.value = false }, 1500)
  } catch (error) {
    alert('Gagal update artikel')
  }
}

async function deleteArtikel(id) {
  if (!confirm('Yakin ingin menghapus artikel ini?')) return
  try {
    await $fetch(`/api/artikel/${id}`, { method: 'DELETE' })
    await fetchArtikel()
  } catch (error) {
    alert('Gagal menghapus artikel')
  }
}

onMounted(fetchArtikel)
</script>

<style scoped>
.shadcn-input,
.shadcn-textarea {
  font-size: 1rem;
  background: #f8fafc;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.shadcn-input:focus,
.shadcn-textarea:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 2px #2563eb33;
}
.shadcn-textarea {
  resize: vertical;
  min-height: 120px;
  max-height: 600px;
}
</style>