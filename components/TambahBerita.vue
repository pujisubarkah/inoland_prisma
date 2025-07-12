<template>
  <div>
    <h2 class="text-xl font-bold mb-4">Tambah Berita Baru</h2>
    <form @submit.prevent="handleSubmit">
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700">Tanggal</label>
        <input v-model="formData.date" type="date" required class="mt-1 block w-full border rounded-md p-2" />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700">Judul</label>
        <input v-model="formData.title" type="text" required class="mt-1 block w-full border rounded-md p-2" />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700">Deskripsi</label>
        <textarea v-model="formData.deskripsi" rows="3" required class="mt-1 block w-full border rounded-md p-2"></textarea>
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700">URL Gambar</label>
        <input v-model="formData.image_url" type="text" required class="mt-1 block w-full border rounded-md p-2" />
      </div>
      <div class="flex justify-end space-x-2">
        <button type="button" @click="onClose" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
          Batal
        </button>
        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Simpan
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
const formData = ref({
  date: '',
  title: '',
  deskripsi: '',
  image_url: ''
})

const emit = defineEmits(['close', 'submit'])

function handleSubmit() {
  emit('submit', formData.value)
}
</script>