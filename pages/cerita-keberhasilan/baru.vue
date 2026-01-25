<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-8">
    <div class="w-full max-w-xl bg-white rounded-lg shadow-lg p-8">
      <h1 class="text-2xl font-bold mb-4 text-center text-blue-700">Berbagi Cerita Keberhasilan Inovasi</h1>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label class="block text-gray-700 mb-1">Judul Cerita <span class="text-red-500">*</span></label>
          <input v-model="form.title" required class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Judul cerita keberhasilan" />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-1">Cerita/Pengalaman <span class="text-red-500">*</span></label>
          <textarea v-model="form.story" required rows="5" class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Bagikan pengalaman inovasi Anda..."></textarea>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-1">Nama (opsional)</label>
          <input v-model="form.name" class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Nama Anda" />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-1">Instansi/Organisasi (opsional)</label>
          <input v-model="form.organization" class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Instansi/Organisasi" />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-1">Upload Foto (opsional)</label>
          <input type="file" @change="handleFileChange" class="w-full" />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-1">Kontak/Email (opsional)</label>
          <input v-model="form.contact" class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Email atau kontak" />
        </div>
        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold">Kirim Cerita</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  title: '',
  story: '',
  name: '',
  organization: '',
  contact: '',
  photo: null
})

function handleFileChange(e) {
  form.value.photo = e.target.files[0] || null
}

function handleSubmit() {
  // TODO: Kirim data ke backend atau tampilkan pesan sukses
  alert('Cerita berhasil dikirim! (simulasi)')
  router.push('/cerita-keberhasilan')
}
</script>

<style scoped>
/* Tambahan styling jika diperlukan */
</style>
