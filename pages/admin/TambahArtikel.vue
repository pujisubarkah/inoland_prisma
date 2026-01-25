<template>
  <div class="w-full mt-8">
    <h2 class="text-2xl font-extrabold text-center font-poppins my-5 text-blue-700">Manajemen Artikel</h2>
    <hr class="w-32 h-1 mx-auto my-4 bg-gradient-to-r from-blue-700 via-cyan-400 to-blue-700 rounded border-none" />

    <div class="w-11/12 mx-auto mb-6 flex justify-end">
      <button
        @click="showForm = !showForm"
        class="py-2 px-4 font-bold text-white rounded-lg shadow-lg flex items-center bg-gradient-to-r from-blue-700 via-blue-400 to-cyan-400 hover:scale-105 hover:shadow-xl transition-all duration-200"
      >
        <span class="mr-2">➕</span>
        {{ showForm ? 'Tutup Form' : 'Tambah Artikel' }}
      </button>
    </div>

    <!-- Modal Form (replace the inline form block) -->
    <div v-if="showForm" class="fixed inset-0 z-50 flex items-center justify-center" style="background: rgba(0,0,0,0.35); backdrop-filter: blur(2px);">
      <div class="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-3xl mx-auto relative overflow-y-auto">
        <button @click="showForm = false" class="absolute top-4 right-4 text-gray-500 text-2xl font-bold hover:text-red-400 transition" aria-label="Tutup">×</button>
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Tambah / Edit Artikel</h2>
        <p class="text-sm text-gray-500 mb-4">Isi data artikel di bawah ini.</p>

        <form @submit.prevent="editingId ? updateArtikel() : submitArtikel()" class="space-y-4">
          <div class="space-y-3">
            <div class="flex flex-col md:flex-row md:items-center">
              <label class="md:w-48 w-full text-sm font-semibold text-gray-700 mb-1 md:mb-0 md:text-right pr-4">Judul Artikel</label>
              <input v-model="form.title" type="text" required placeholder="Masukkan judul artikel"
                class="flex-1 rounded-lg px-4 py-2 border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-200" />
            </div>

            <div class="flex flex-col md:flex-row md:items-center">
              <label class="md:w-48 w-full text-sm font-semibold text-gray-700 mb-1 md:mb-0 md:text-right pr-4">Tanggal</label>
              <input v-model="form.date" type="date" required
                class="flex-1 rounded-lg px-4 py-2 border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-200" />
            </div>

            <div class="flex flex-col md:flex-row md:items-center">
              <label class="md:w-48 w-full text-sm font-semibold text-gray-700 mb-1 md:mb-0 md:text-right pr-4">Ringkasan</label>
              <input v-model="form.summary" type="text" placeholder="Masukkan ringkasan artikel"
                class="flex-1 rounded-lg px-4 py-2 border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-200" />
            </div>

            <div class="flex flex-col md:flex-row md:items-center">
              <label class="md:w-48 w-full text-sm font-semibold text-gray-700 mb-1 md:mb-0 md:text-right pr-4">Avatar (URL gambar)</label>
              <input v-model="form.avatar" type="text" placeholder="https://..."
                class="flex-1 rounded-lg px-4 py-2 border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-200" />
            </div>

            <div class="flex flex-col md:flex-row md:items-start">
              <label class="md:w-48 w-full text-sm font-semibold text-gray-700 mb-1 md:mb-0 md:text-right pr-4 pt-2">Konten Artikel (HTML)</label>
              <div class="flex-1">
                <ClientOnly>
                  <QuillEditor v-model="form.content" theme="snow" toolbar="full" class="bg-white rounded border border-gray-300" style="min-height:220px;" />
                </ClientOnly>
              </div>
            </div>
          </div>

          <div class="flex justify-end gap-3 mt-2">
            <button type="button" @click="showForm = false" class="bg-gray-300 text-gray-800 px-5 py-2 rounded-lg font-medium shadow hover:bg-gray-400 transition">Batal</button>
            <button type="submit" class="bg-gradient-to-r from-blue-700 via-blue-400 to-cyan-400 text-white px-5 py-2 rounded-lg font-semibold shadow hover:scale-105 transition">
              {{ editingId ? 'Update Artikel' : 'Simpan Artikel' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <div class="w-full flex justify-center mt-6">
      <table class="border-collapse table-auto w-11/12 text-sm shadow-xl rounded-xl overflow-hidden bg-white">
        <thead>
          <tr class="bg-gradient-to-r from-blue-700 via-blue-400 to-cyan-400 text-white">
            <th class="border-b text-base font-semibold p-4 text-left">Judul</th>
            <th class="border-b text-base font-semibold p-4 text-left">Tanggal</th>
            <th class="border-b text-base font-semibold p-4 text-left">Ringkasan</th>
            <th class="border-b text-base font-semibold p-4 text-left">Avatar</th>
            <th class="border-b text-base font-semibold p-4 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="artikel in daftarArtikel" :key="artikel.id" class="hover:bg-blue-50 transition">
            <td class="border-b p-4 font-semibold text-gray-800">{{ artikel.title }}</td>
            <td class="border-b p-4 text-gray-700">{{ formatDate(artikel.date) }}</td>
            <td class="border-b p-4 text-gray-700 w-96"><div class="whitespace-pre-line">{{ artikel.summary }}</div></td>
            <td class="border-b p-4 text-gray-700">
              <img :src="artikel.avatar" alt="avatar" class="w-10 h-10 rounded-full object-cover border" v-if="artikel.avatar"/>
            </td>
            <td class="border-b p-4 font-semibold flex gap-2">
              <button @click="editArtikel(artikel)" class="text-gray-700 hover:text-gray-900 bg-white border border-gray-200 rounded-lg px-2 py-1 shadow hover:scale-110 transition">✏️</button>
              <button @click="deleteArtikel(artikel.id)" class="text-red-600 hover:text-red-700 bg-white border border-red-200 rounded-lg px-2 py-1 shadow hover:scale-110 transition">🗑️</button>
            </td>
          </tr>
          <tr v-if="daftarArtikel.length === 0">
            <td colspan="5" class="text-center p-4 text-gray-700">Belum ada artikel.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Edit modal with suggested changes -->
    <div v-if="showEditModal" class="fixed inset-0 z-50 flex items-center justify-center" style="background: rgba(0,0,0,0.35); backdrop-filter: blur(2px);">
      <div class="bg-white rounded-xl shadow-xl p-8 max-w-2xl w-full mx-auto relative">
        <button @click="closeEditModal" class="absolute top-4 right-4 text-gray-700 text-2xl font-bold hover:text-red-400 transition" title="Tutup">×</button>
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Edit Artikel</h2>

        <form @submit.prevent="updateArtikel" class="space-y-4">
          <div class="space-y-3">
            <div class="flex flex-col md:flex-row md:items-center">
              <label class="md:w-48 w-full text-sm font-semibold text-gray-700 mb-1 md:mb-0 md:text-right pr-4">Judul Artikel</label>
              <input v-model="form.title" type="text" required
                class="flex-1 shadcn-input rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-200" />
            </div>

            <div class="flex flex-col md:flex-row md:items-center">
              <label class="md:w-48 w-full text-sm font-semibold text-gray-700 mb-1 md:mb-0 md:text-right pr-4">Ringkasan</label>
              <input v-model="form.summary" type="text"
                class="flex-1 shadcn-input rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-200" />
            </div>

            <div class="flex flex-col md:flex-row md:items-center">
              <label class="md:w-48 w-full text-sm font-semibold text-gray-700 mb-1 md:mb-0 md:text-right pr-4">Tanggal</label>
              <input v-model="form.date" type="date" required
                class="flex-1 shadcn-input rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-200" />
            </div>

            <div class="flex flex-col md:flex-row md:items-center">
              <label class="md:w-48 w-full text-sm font-semibold text-gray-700 mb-1 md:mb-0 md:text-right pr-4">Avatar (URL gambar)</label>
              <input v-model="form.avatar" type="text"
                class="flex-1 shadcn-input rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-200" />
            </div>

            <div class="flex flex-col md:flex-row md:items-start">
              <label class="md:w-48 w-full text-sm font-semibold text-gray-700 mb-1 md:mb-0 md:text-right pr-4 pt-2">Konten Artikel (HTML)</label>
              <div class="flex-1">
                <ClientOnly>
                  <QuillEditor v-model="form.content" theme="snow" toolbar="full" class="bg-white rounded border border-gray-300" style="min-height:200px;" />
                </ClientOnly>
              </div>
            </div>
          </div>

          <div class="flex justify-end gap-3 mt-4">
            <button type="button" @click="closeEditModal" class="bg-gray-500 text-white px-5 py-2 rounded-lg font-bold shadow hover:bg-gray-600 transition">Batal</button>
            <button type="submit" class="bg-gradient-to-r from-blue-700 via-blue-400 to-cyan-400 text-white font-semibold px-6 py-2 rounded hover:scale-105 hover:shadow-xl transition">Update Artikel</button>
          </div>
        </form>

        <div v-if="success" class="mt-4 text-green-600 font-semibold">Artikel berhasil diupdate!</div>
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
const form = ref({ title: '', summary: '', date: '', avatar: '', content: '' })

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
    const res = await $fetch('/api/artikel', { method: 'POST', body: { ...form.value } })
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
  form.value = { title: artikel.title, summary: artikel.summary, date: artikel.date, avatar: artikel.avatar, content: artikel.content || '' }
  showEditModal.value = true
}

function closeEditModal() {
  showEditModal.value = false
  editingId.value = null
  form.value = { title: '', summary: '', date: '', avatar: '', content: '' }
}

async function updateArtikel() {
  try {
    await $fetch(`/api/artikel/${editingId.value}`, { method: 'PUT', body: { ...form.value } })
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
  background: #fff;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.shadcn-input:focus,
.shadcn-textarea:focus {
  border-color: #0ea5e9;
  box-shadow: 0 0 0 4px #0ea5e933;
}
.shadcn-textarea { resize: vertical; min-height: 120px; max-height: 600px; }
</style>
