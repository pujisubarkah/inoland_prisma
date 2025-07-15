<template>
  <Transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded-xl shadow-xl max-w-lg w-full relative">
        <button @click="close" class="absolute top-2 right-3 text-gray-400 hover:text-gray-600">✖</button>
        <h2 class="text-xl font-semibold text-center mb-4">Beri Masukan Anda 🙏</h2>

        <!-- Nama -->
        <div class="mb-3">
          <label class="block text-sm font-medium mb-1">Nama</label>
          <input v-model="form.nama" type="text" class="w-full border p-2 rounded" />
        </div>

        <!-- Instansi -->
        <div class="mb-3">
          <label class="block text-sm font-medium mb-1">Instansi</label>
          <input v-model="form.instansi" type="text" class="w-full border p-2 rounded" />
        </div>

        <!-- Rating -->
        <div class="mb-3">
          <label class="block text-sm font-medium mb-1">Bagaimana penilaian Anda terhadap tampilan website?</label>
          <StarRating v-model="form.rating" />
        </div>

        <!-- Pertanyaan 1 -->
        <div class="mb-3">
          <label class="block text-sm font-medium mb-1">Apakah informasi di website mudah dipahami?</label>
          <select v-model="form.p1" class="w-full border p-2 rounded">
            <option value="">Pilih...</option>
            <option>Ya, sangat mudah</option>
            <option>Cukup mudah</option>
            <option>Kurang jelas</option>
            <option>Tidak paham sama sekali</option>
          </select>
        </div>

        <!-- Pertanyaan 2 -->
        <div class="mb-3">
          <label class="block text-sm font-medium mb-1">Apakah Anda pernah menggunakan fitur Lab Inovasi?</label>
          <select v-model="form.p2" class="w-full border p-2 rounded">
            <option value="">Pilih...</option>
            <option>Ya, sering</option>
            <option>Pernah, tapi jarang</option>
            <option>Belum pernah</option>
          </select>
        </div>

        <!-- Komentar -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Saran atau komentar lainnya</label>
          <textarea
            v-model="form.comment"
            class="w-full border p-2 rounded"
            rows="3"
            placeholder="Tulis pendapat Anda di sini..."
          ></textarea>
        </div>

        <button
          @click="submit"
          class="bg-blue-600 text-white w-full mt-2 py-2 rounded hover:bg-blue-700"
        >
          Kirim Masukan
        </button>

        <p v-if="success" class="text-green-600 text-center mt-4">Terima kasih atas partisipasinya! 🌟</p>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref } from 'vue'
import StarRating from './StarRating.vue'

const show = ref(true)
const success = ref(false)

const form = ref({
  nama: '',
  instansi: '',
  rating: 0,
  p1: '',
  p2: '',
  comment: '',
})

const close = () => (show.value = false)

const submit = async () => {
  if (!form.value.nama || !form.value.instansi) {
    alert('Nama dan instansi wajib diisi!');
    return;
  }

  await $fetch('/api/survey', {
    method: 'POST',
    body: form.value,
  })

  success.value = true
  setTimeout(() => (show.value = false), 2000)
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
