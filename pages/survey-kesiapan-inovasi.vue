<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header Section -->
      <div class="text-center mb-8">
        <h1 class="text-3xl sm:text-4xl font-bold text-blue-800 mb-3">
          Survey Kesiapan Inovasi
        </h1>
        <p class="text-lg sm:text-xl text-blue-600 font-medium mb-4">
          Evaluasi Tingkat Kesiapan Daerah dalam Mengembangkan Inovasi
        </p>
        <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg shadow-sm max-w-3xl mx-auto">
          <p class="text-gray-700 text-sm sm:text-base leading-relaxed">
            Survei ini bertujuan untuk mengukur tingkat kesiapan pemerintah daerah dalam mengembangkan inovasi. Hasil survei akan menjadi dasar untuk memberikan rekomendasi pendampingan yang tepat sasaran.
          </p>
        </div>
      </div>

      <!-- Survey Form -->
      <div class="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-8">
        <h2 class="text-2xl font-bold text-blue-800 mb-6">
          Form Survey Kesiapan Inovasi
        </h2>

        <form @submit.prevent="submitSurvey" class="space-y-8">
          <!-- Informasi Dasar -->
          <div class="bg-gray-50 p-6 rounded-lg">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Informasi Dasar</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Nama Instansi</label>
                <input
                  v-model="surveyData.instansi"
                  type="text"
                  required
                  class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Contoh: Pemerintah Kabupaten Bogor"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                <input
                  v-model="surveyData.nama"
                  type="text"
                  required
                  class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Nama penanggung jawab"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Jabatan</label>
                <input
                  v-model="surveyData.jabatan"
                  type="text"
                  required
                  class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Jabatan Anda"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  v-model="surveyData.email"
                  type="email"
                  required
                  class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="email@instansi.go.id"
                />
              </div>
            </div>
          </div>

          <!-- Pertanyaan Survey -->
          <div class="space-y-6">
            <h3 class="text-lg font-semibold text-gray-800">Penilaian Kesiapan Inovasi</h3>
            <p class="text-sm text-gray-600 mb-4">Berikan penilaian dari skala 1-5 (1 = Sangat Rendah, 5 = Sangat Tinggi)</p>

            <!-- Question 1 -->
            <div class="bg-white border border-gray-200 rounded-lg p-6">
              <h4 class="font-medium text-gray-800 mb-3">1. Dukungan Pimpinan terhadap Inovasi</h4>
              <p class="text-sm text-gray-600 mb-4">Seberapa besar dukungan pimpinan daerah terhadap pengembangan inovasi?</p>
              <div class="flex gap-4">
                <label v-for="score in [1,2,3,4,5]" :key="score" class="flex items-center gap-2">
                  <input
                    v-model="surveyData.dukungan_pimpinan"
                    :value="score"
                    type="radio"
                    name="dukungan_pimpinan"
                    required
                    class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span class="text-sm">{{ score }}</span>
                </label>
              </div>
            </div>

            <!-- Question 2 -->
            <div class="bg-white border border-gray-200 rounded-lg p-6">
              <h4 class="font-medium text-gray-800 mb-3">2. Kapasitas SDM Inovasi</h4>
              <p class="text-sm text-gray-600 mb-4">Seberapa memadai kapasitas sumber daya manusia untuk mengembangkan inovasi?</p>
              <div class="flex gap-4">
                <label v-for="score in [1,2,3,4,5]" :key="score" class="flex items-center gap-2">
                  <input
                    v-model="surveyData.kapasitas_sdm"
                    :value="score"
                    type="radio"
                    name="kapasitas_sdm"
                    required
                    class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span class="text-sm">{{ score }}</span>
                </label>
              </div>
            </div>

            <!-- Question 3 -->
            <div class="bg-white border border-gray-200 rounded-lg p-6">
              <h4 class="font-medium text-gray-800 mb-3">3. Infrastruktur Teknologi</h4>
              <p class="text-sm text-gray-600 mb-4">Seberapa baik infrastruktur teknologi yang tersedia untuk mendukung inovasi?</p>
              <div class="flex gap-4">
                <label v-for="score in [1,2,3,4,5]" :key="score" class="flex items-center gap-2">
                  <input
                    v-model="surveyData.infrastruktur_teknologi"
                    :value="score"
                    type="radio"
                    name="infrastruktur_teknologi"
                    required
                    class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span class="text-sm">{{ score }}</span>
                </label>
              </div>
            </div>

            <!-- Question 4 -->
            <div class="bg-white border border-gray-200 rounded-lg p-6">
              <h4 class="font-medium text-gray-800 mb-3">4. Anggaran Inovasi</h4>
              <p class="text-sm text-gray-600 mb-4">Seberapa memadai alokasi anggaran untuk pengembangan inovasi?</p>
              <div class="flex gap-4">
                <label v-for="score in [1,2,3,4,5]" :key="score" class="flex items-center gap-2">
                  <input
                    v-model="surveyData.anggaran_inovasi"
                    :value="score"
                    type="radio"
                    name="anggaran_inovasi"
                    required
                    class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span class="text-sm">{{ score }}</span>
                </label>
              </div>
            </div>

            <!-- Question 5 -->
            <div class="bg-white border border-gray-200 rounded-lg p-6">
              <h4 class="font-medium text-gray-800 mb-3">5. Budaya Inovasi</h4>
              <p class="text-sm text-gray-600 mb-4">Seberapa kuat budaya inovasi yang telah terbentuk di instansi Anda?</p>
              <div class="flex gap-4">
                <label v-for="score in [1,2,3,4,5]" :key="score" class="flex items-center gap-2">
                  <input
                    v-model="surveyData.budaya_inovasi"
                    :value="score"
                    type="radio"
                    name="budaya_inovasi"
                    required
                    class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span class="text-sm">{{ score }}</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="flex justify-end gap-4">
            <button
              type="button"
              @click="resetSurvey"
              class="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Reset
            </button>
            <button
              type="submit"
              :disabled="isSubmitting"
              class="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
            >
              <span v-if="!isSubmitting">Kirim Survey</span>
              <span v-else>Mengirim...</span>
            </button>
          </div>
        </form>
      </div>

      <!-- Info Section -->
      <div class="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-6 text-white text-center">
        <h3 class="text-lg font-bold mb-2">Hasil Survey</h3>
        <p class="text-sm mb-4">Hasil survey akan dianalisis oleh tim INOLAND dan dijadikan dasar rekomendasi pendampingan inovasi yang sesuai dengan kebutuhan daerah Anda.</p>
        <div class="flex flex-wrap justify-center gap-4 text-sm">
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Analisis Mendalam</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Rekomendasi Tepat Sasaran</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { toast } from 'vue-sonner'

const isSubmitting = ref(false)
const surveyData = ref({
  instansi: '',
  nama: '',
  jabatan: '',
  email: '',
  dukungan_pimpinan: '',
  kapasitas_sdm: '',
  infrastruktur_teknologi: '',
  anggaran_inovasi: '',
  budaya_inovasi: ''
})

const resetSurvey = () => {
  surveyData.value = {
    instansi: '',
    nama: '',
    jabatan: '',
    email: '',
    dukungan_pimpinan: '',
    kapasitas_sdm: '',
    infrastruktur_teknologi: '',
    anggaran_inovasi: '',
    budaya_inovasi: ''
  }
}

const submitSurvey = async () => {
  isSubmitting.value = true

  try {
    // TODO: Implement API call to submit survey
    // const response = await fetch('/api/survey-kesiapan', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(surveyData.value)
    // })

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    toast.success('Survey berhasil dikirim! Terima kasih atas partisipasi Anda.')
    resetSurvey()
  } catch (error) {
    console.error('Error submitting survey:', error)
    toast.error('Terjadi kesalahan. Silakan coba lagi.')
  } finally {
    isSubmitting.value = false
  }
}

// Page meta
useHead({
  title: 'Survey Kesiapan Inovasi - INOLAND',
  meta: [
    { name: 'description', content: 'Survei evaluasi tingkat kesiapan daerah dalam mengembangkan inovasi' }
  ]
})
</script>

<style scoped>
/* Additional custom styles if needed */
</style>