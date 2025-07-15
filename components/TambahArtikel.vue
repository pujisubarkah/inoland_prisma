<template>
  <div class="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-8">
    <h2 class="text-2xl font-bold text-blue-700 mb-6">Daftar Artikel</h2>
    <button
      @click="showForm = !showForm"
      class="mb-6 bg-blue-700 text-white font-semibold px-6 py-2 rounded hover:bg-blue-800 transition"
    >
      {{ showForm ? 'Tutup Form' : 'Tambah Artikel' }}
    </button>

    <!-- Form Tambah Artikel -->
    <div v-if="showForm" class="mb-8">
      <form @submit.prevent="submitArtikel">
        <div class="mb-4">
          <label class="block text-gray-700 font-semibold mb-2" for="judul">Judul Artikel</label>
          <input
            v-model="form.judul"
            id="judul"
            type="text"
            class="shadcn-input w-full px-4 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Masukkan judul artikel"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-semibold mb-2" for="konten">Konten Artikel</label>
          <textarea
            v-model="form.konten"
            id="konten"
            rows="12"
            class="shadcn-textarea w-full px-4 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y"
            placeholder="Tulis isi artikel di sini..."
            required
          ></textarea>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-semibold mb-2" for="penulis">Penulis</label>
          <input
            v-model="form.penulis"
            id="penulis"
            type="text"
            class="shadcn-input w-full px-4 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Nama penulis"
          />
        </div>
        <button
          type="submit"
          class="bg-blue-700 text-white font-semibold px-6 py-2 rounded hover:bg-blue-800 transition"
        >
          Simpan Artikel
        </button>
      </form>
      <div v-if="success" class="mt-4 text-green-600 font-semibold">
        Artikel berhasil ditambahkan!
      </div>
    </div>

    <!-- Tabel Daftar Artikel -->
    <table class="w-full border mt-4 rounded overflow-hidden">
      <thead class="bg-blue-50">
        <tr>
          <th class="py-2 px-4 text-left font-semibold text-blue-700">Judul</th>
          <th class="py-2 px-4 text-left font-semibold text-blue-700">Penulis</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(artikel, idx) in daftarArtikel" :key="idx" class="border-t">
          <td class="py-2 px-4">{{ artikel.judul }}</td>
          <td class="py-2 px-4">{{ artikel.penulis }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showForm = ref(false)
const success = ref(false)
const form = ref({
  judul: '',
  konten: '',
  penulis: ''
})

const daftarArtikel = ref([
  { judul: 'Mengenal Laboratorium Inovasi', penulis: 'Admin' },
  { judul: 'Langkah Praktis Menjadi Inovator', penulis: 'Inovator' }
])

function submitArtikel() {
  daftarArtikel.value.push({
    judul: form.value.judul,
    penulis: form.value.penulis
  })
  success.value = true
  setTimeout(() => {
    success.value = false
    form.value = { judul: '', konten: '', penulis: '' }
    showForm.value = false
  }, 1500)
}
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