<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header Section -->
      <div class="text-center mb-8">
        <h1 class="text-3xl sm:text-4xl font-bold text-blue-800 mb-3">
          Pengajuan Pendampingan Inovasi
        </h1>
        <p class="text-lg sm:text-xl text-blue-600 font-medium mb-4">
          Fasilitasi dan pendampingan inovasi daerah oleh Laboratorium Inovasi LAN
        </p>
        <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg shadow-sm max-w-3xl mx-auto">
          <p class="text-gray-700 text-sm sm:text-base leading-relaxed">
            Halaman ini digunakan oleh Pemerintah Daerah untuk mengajukan fasilitasi dan pendampingan inovasi daerah melalui Laboratorium Inovasi LAN. Pengajuan akan ditindaklanjuti sesuai dengan ketentuan dan mekanisme yang berlaku.
          </p>
        </div>
      </div>

      <!-- Alur Pendampingan Section -->
      <div class="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-8">
        <h2 class="text-2xl font-bold text-blue-800 mb-6 text-center">
          Alur Pendampingan
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Step 1 -->
          <div class="flex flex-col items-center text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border-2 border-blue-200 hover:shadow-md transition-shadow">
            <div class="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-3 shadow-md">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span class="text-sm font-semibold text-blue-800">Pengajuan oleh<br>Pemerintah Daerah</span>
          </div>

          <!-- Step 2 -->
          <div class="flex flex-col items-center text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border-2 border-green-200 hover:shadow-md transition-shadow">
            <div class="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-3 shadow-md">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <span class="text-sm font-semibold text-green-800">Review dan<br>Klarifikasi Kebutuhan</span>
          </div>

          <!-- Step 3 -->
          <div class="flex flex-col items-center text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border-2 border-orange-200 hover:shadow-md transition-shadow">
            <div class="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-3 shadow-md">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span class="text-sm font-semibold text-orange-800">Penetapan Bentuk<br>Pendampingan</span>
          </div>

          <!-- Step 4 -->
          <div class="flex flex-col items-center text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border-2 border-purple-200 hover:shadow-md transition-shadow">
            <div class="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mb-3 shadow-md">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <span class="text-sm font-semibold text-purple-800">Pelaksanaan<br>Pendampingan</span>
          </div>
        </div>
      </div>

      <!-- Form Section -->
      <div class="bg-white rounded-xl shadow-lg p-6 sm:p-8">
        <h2 class="text-2xl font-bold text-blue-800 mb-6">
          Form Pengajuan Pendampingan
        </h2>
        
        <!-- Disclaimer -->
        <div class="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6 rounded-r-lg">
          <div class="flex items-start gap-3">
            <svg class="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <div>
              <h3 class="text-sm font-semibold text-amber-800 mb-1">Catatan:</h3>
              <p class="text-sm text-amber-700 leading-relaxed">
                Pengajuan ini tidak bersifat komersial dan akan diproses sesuai kebijakan dan kapasitas pendampingan yang tersedia.
              </p>
            </div>
          </div>
        </div>
        
        <form @submit.prevent="submitForm" class="space-y-6">
          <!-- Nama Instansi -->
          <div>
            <label for="instansi" class="block text-sm font-semibold text-gray-700 mb-2">
              Nama Instansi/Pemerintah Daerah <span class="text-red-500">*</span>
            </label>
            <input
              id="instansi"
              v-model="formData.instansi"
              type="text"
              required
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Contoh: Pemerintah Kabupaten Bogor"
            />
          </div>

          <!-- Nama Penanggung Jawab -->
          <div>
            <label for="penanggung_jawab" class="block text-sm font-semibold text-gray-700 mb-2">
              Nama Penanggung Jawab <span class="text-red-500">*</span>
            </label>
            <input
              id="penanggung_jawab"
              v-model="formData.penanggung_jawab"
              type="text"
              required
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Nama lengkap penanggung jawab"
            />
          </div>

          <!-- Jabatan -->
          <div>
            <label for="jabatan" class="block text-sm font-semibold text-gray-700 mb-2">
              Jabatan <span class="text-red-500">*</span>
            </label>
            <input
              id="jabatan"
              v-model="formData.jabatan"
              type="text"
              required
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Jabatan penanggung jawab"
            />
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">
              Email <span class="text-red-500">*</span>
            </label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              required
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="email@instansi.go.id"
            />
          </div>

          <!-- Nomor Telepon -->
          <div>
            <label for="telepon" class="block text-sm font-semibold text-gray-700 mb-2">
              Nomor Telepon/HP <span class="text-red-500">*</span>
            </label>
            <input
              id="telepon"
              v-model="formData.telepon"
              type="tel"
              required
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="08xx xxxx xxxx"
            />
          </div>

          <!-- Nama Inovasi -->
          <div>
            <label for="nama_inovasi" class="block text-sm font-semibold text-gray-700 mb-2">
              Nama Inovasi yang Akan Didampingi <span class="text-red-500">*</span>
            </label>
            <input
              id="nama_inovasi"
              v-model="formData.nama_inovasi"
              type="text"
              required
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Nama inovasi daerah"
            />
          </div>

          <!-- Deskripsi Inovasi -->
          <div>
            <label for="deskripsi" class="block text-sm font-semibold text-gray-700 mb-2">
              Deskripsi Singkat Inovasi <span class="text-red-500">*</span>
            </label>
            <textarea
              id="deskripsi"
              v-model="formData.deskripsi"
              required
              rows="4"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Jelaskan secara singkat tentang inovasi yang akan didampingi"
            ></textarea>
          </div>

          <!-- Jenis Pendampingan -->
          <div>
            <label for="jenis_pendampingan" class="block text-sm font-semibold text-gray-700 mb-2">
              Jenis Pendampingan yang Dibutuhkan <span class="text-red-500">*</span>
            </label>
            <select
              id="jenis_pendampingan"
              v-model="formData.jenis_pendampingan"
              required
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="">Pilih jenis pendampingan</option>
              <option value="konsultasi_awal">Konsultasi awal / diskusi masalah</option>
              <option value="penyusunan_inovasi">Pendampingan penyusunan inovasi</option>
              <option value="penguatan_sdm">Penguatan kapasitas SDM inovasi</option>
              <option value="pengembangan_uji_coba">Pengembangan & uji coba inovasi</option>
              <option value="belum_tahu">Belum tahu / perlu diskusi lebih lanjut</option>
            </select>
          </div>

          <!-- Keterangan Tambahan -->
          <div>
            <label for="keterangan" class="block text-sm font-semibold text-gray-700 mb-2">
              Keterangan Tambahan
            </label>
            <textarea
              id="keterangan"
              v-model="formData.keterangan"
              rows="3"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Informasi tambahan yang perlu disampaikan (opsional)"
            ></textarea>
          </div>

          <!-- Submit Button -->
          <div class="flex justify-end gap-4">
            <button
              type="button"
              @click="resetForm"
              class="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Reset
            </button>
            <button
              type="submit"
              :disabled="isSubmitting"
              class="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
            >
              <span v-if="!isSubmitting">Ajukan Pendampingan</span>
              <span v-else>Mengirim...</span>
            </button>
          </div>
        </form>
      </div>

      <!-- Info Contact -->
      <div class="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-6 text-white text-center">
        <h3 class="text-lg font-bold mb-2">Butuh Bantuan?</h3>
        <p class="text-sm mb-4">Hubungi tim Laboratorium Inovasi LAN untuk informasi lebih lanjut</p>
        <div class="flex flex-wrap justify-center gap-4 text-sm">
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>labinov@lan.go.id</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>(021) 1234-5678</span>
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
const formData = ref({
  instansi: '',
  penanggung_jawab: '',
  jabatan: '',
  email: '',
  telepon: '',
  nama_inovasi: '',
  deskripsi: '',
  jenis_pendampingan: '',
  keterangan: ''
})

const resetForm = () => {
  formData.value = {
    instansi: '',
    penanggung_jawab: '',
    jabatan: '',
    email: '',
    telepon: '',
    nama_inovasi: '',
    deskripsi: '',
    jenis_pendampingan: '',
    keterangan: ''
  }
}

const submitForm = async () => {
  isSubmitting.value = true
  
  try {
    // TODO: Implement API call to submit the form
    // const response = await fetch('/api/pendampingan', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData.value)
    // })
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    toast.success('Pengajuan pendampingan berhasil dikirim!')
    
    // Redirect to success page
    await navigateTo('/pengajuan-berhasil')
  } catch (error) {
    console.error('Error submitting form:', error)
    toast.error('Terjadi kesalahan. Silakan coba lagi.')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
