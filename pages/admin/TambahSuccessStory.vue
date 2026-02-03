<template>
  <div class="p-6">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-2xl font-bold">Manage Success Stories</h2>
      <div>
        <button
          @click="openModal = true"
          class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Tambah Cerita Sukses
        </button>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="openModal" class="fixed inset-0 z-50 flex items-center justify-center" style="background: rgba(0,0,0,0.35); backdrop-filter: blur(2px);">
      <div class="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-3xl mx-auto relative overflow-y-auto">
        <button @click="closeModal" class="absolute top-4 right-4 text-gray-500 text-2xl font-bold hover:text-red-400 transition" aria-label="Tutup">×</button>
        <h3 class="text-2xl font-semibold mb-2">Tambah Cerita Sukses</h3>
        <p class="text-sm text-gray-500 mb-4">Isi data cerita sukses di bawah ini.</p>

        <form @submit.prevent="submitForm" class="space-y-4">
          <div class="space-y-3">
            <div class="flex flex-col md:flex-row md:items-center">
              <label class="md:w-48 w-full text-sm font-semibold text-gray-700 mb-1 md:mb-0 md:text-right pr-4">Judul</label>
              <input v-model="form.title" placeholder="Judul" required class="flex-1 shadcn-input rounded-lg px-4 py-2 border border-gray-300 bg-white text-gray-800 focus:outline-none" />
            </div>

            <div class="flex flex-col md:flex-row md:items-start">
              <label class="md:w-48 w-full text-sm font-semibold text-gray-700 mb-1 md:mb-0 md:text-right pr-4 pt-2">Isi Cerita</label>
              <textarea v-model="form.story" placeholder="Isi cerita" required class="flex-1 shadcn-textarea rounded-lg px-4 py-2 border border-gray-300 bg-white text-gray-800" style="min-height:200px;"></textarea>
            </div>

            <div class="flex flex-col md:flex-row md:items-center">
              <label class="md:w-48 w-full text-sm font-semibold text-gray-700 mb-1 md:mb-0 md:text-right pr-4">Nama Penulis</label>
              <input v-model="form.name" placeholder="Nama Penulis" class="flex-1 shadcn-input rounded-lg px-4 py-2 border border-gray-300" />
            </div>

            <div class="flex flex-col md:flex-row md:items-center">
              <label class="md:w-48 w-full text-sm font-semibold text-gray-700 mb-1 md:mb-0 md:text-right pr-4">Instansi/Organisasi</label>
              <input v-model="form.organization" placeholder="Instansi/Organisasi" class="flex-1 shadcn-input rounded-lg px-4 py-2 border border-gray-300" />
            </div>

            <div class="flex flex-col md:flex-row md:items-center">
              <label class="md:w-48 w-full text-sm font-semibold text-gray-700 mb-1 md:mb-0 md:text-right pr-4">Kontak</label>
              <input v-model="form.contact" placeholder="Kontak" class="flex-1 shadcn-input rounded-lg px-4 py-2 border border-gray-300" />
            </div>

            <div class="flex flex-col md:flex-row md:items-center">
              <label class="md:w-48 w-full text-sm font-semibold text-gray-700 mb-1 md:mb-0 md:text-right pr-4">Foto</label>
              <input type="file" @change="handleFile" class="flex-1" />
            </div>
          </div>

          <div class="flex justify-end gap-3 mt-2">
            <button type="button" @click="closeModal" class="bg-gray-300 text-gray-800 px-5 py-2 rounded-lg font-medium shadow hover:bg-gray-400 transition">Batal</button>
            <button type="submit" class="bg-gradient-to-r from-blue-700 via-blue-400 to-cyan-400 text-white px-5 py-2 rounded-lg font-semibold shadow hover:scale-105 transition">Simpan</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Search -->
    <div class="mb-4">
      <input v-model="query" placeholder="Cari judul atau penulis..." class="border px-3 py-2 rounded w-full max-w-md" />
    </div>

    <!-- Table -->
    <div class="overflow-x-auto bg-white rounded shadow">
      <table class="min-w-full">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-4 py-2 text-left">Judul</th>
            <th class="px-4 py-2 text-left">Penulis</th>
            <th class="px-4 py-2 text-left">Instansi</th>
            <th class="px-4 py-2 text-left">Tanggal</th>
            <th class="px-4 py-2 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in pagedData" :key="item.id" class="border-t">
            <td class="px-4 py-2">{{ item.title }}</td>
            <td class="px-4 py-2">{{ item.name }}</td>
            <td class="px-4 py-2">{{ item.organization }}</td>
            <td class="px-4 py-2">{{ formatDate(item.created_at || item.createdAt) }}</td>
            <td class="px-4 py-2">
              <button @click="viewItem(item)" class="text-blue-600 mr-2">Lihat</button>
              <button @click="deleteItem(item.id)" class="text-red-600">Hapus</button>
            </td>
          </tr>
          <tr v-if="!pagedData.length">
            <td class="px-4 py-6 text-center" colspan="5">Tidak ada data</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="mt-4 flex items-center justify-between">
      <div>Menampilkan {{ start+1 }} - {{ Math.min(end, filtered.length) }} dari {{ filtered.length }}</div>
      <div class="space-x-2">
        <button @click="prevPage" :disabled="page===1" class="px-3 py-1 border rounded">Prev</button>
        <button @click="nextPage" :disabled="end>=filtered.length" class="px-3 py-1 border rounded">Next</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const openModal = ref(false)
const query = ref('')
const page = ref(1)
const perPage = ref(10)
const items = ref([])

const form = ref({ title: '', story: '', name: '', organization: '', contact: '', photo: null })

function handleFile(e){
  form.value.photo = e.target.files[0] || null
}

function closeModal(){
  openModal.value = false
  form.value = { title: '', story: '', name: '', organization: '', contact: null, photo: null }
}

async function submitForm(){
  try{
    const fd = new FormData()
    fd.append('title', form.value.title)
    fd.append('story', form.value.story)
    fd.append('name', form.value.name)
    fd.append('organization', form.value.organization)
    fd.append('contact', form.value.contact)
    if(form.value.photo) fd.append('photo', form.value.photo)

    await $fetch('/api/success-stories', { method: 'POST', body: fd })
    alert('Cerita sukses berhasil ditambahkan')
    closeModal()
    await fetchData()
  }catch(err){
    console.error('Error creating success story:', err)
    alert('Gagal menambahkan cerita sukses')
  }
}

async function fetchData(){
  try{
    const data = await $fetch('/api/success-stories')
    items.value = Array.isArray(data) ? data : data.data || []
  }catch(err){
    console.error('Error fetching success stories:', err)
    items.value = []
  }
}

function viewItem(item){
  alert((item.title || 'Untitled') + '\n\n' + (item.story || ''))
}

async function deleteItem(id){
  if(!confirm('Hapus cerita ini?')) return
  try{
    await $fetch(`/api/success-stories/${id}`, { method: 'DELETE' })
    await fetchData()
  }catch(err){
    console.error('Error deleting:', err)
    alert('Gagal menghapus')
  }
}

onMounted(()=>{ fetchData() })

const filtered = computed(()=>{
  if(!query.value) return items.value
  const q = query.value.toLowerCase()
  return items.value.filter(i => (i.title||'').toLowerCase().includes(q) || (i.name||'').toLowerCase().includes(q))
})

const start = computed(()=> (page.value-1)*perPage.value )
const end = computed(()=> start.value + perPage.value )
const pagedData = computed(()=> filtered.value.slice(start.value, end.value))

function nextPage(){ if(end.value < filtered.value.length) page.value++ }
function prevPage(){ if(page.value>1) page.value-- }

function formatDate(d){ if(!d) return '-' ; const dt = new Date(d); return dt.toLocaleDateString() }
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
