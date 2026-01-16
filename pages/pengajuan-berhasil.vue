<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-2xl mx-auto text-center">
      <!-- Success Icon -->
      <div class="mb-8">
        <div class="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
          <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>

      <!-- Title -->
      <h1 class="text-3xl sm:text-4xl font-bold text-blue-800 mb-6">
        Pengajuan Berhasil
      </h1>

      <!-- Content -->
      <div class="bg-white rounded-xl shadow-lg p-8 mb-8">
        <p class="text-lg text-gray-700 leading-relaxed mb-6">
          Terima kasih. Pengajuan pendampingan Anda telah diterima dan akan ditindaklanjuti oleh Tim INOLAND.
        </p>

        <!-- Additional Info -->
        <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
          <div class="flex items-start gap-3">
            <svg class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div class="text-left">
              <p class="text-sm text-blue-800 font-medium mb-1">Apa selanjutnya?</p>
              <p class="text-sm text-blue-700">
                Tim kami akan menghubungi Anda dalam 2-3 hari kerja untuk konfirmasi dan diskusi lebih lanjut mengenai pendampingan inovasi yang Anda ajukan.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <NuxtLink
          to="/"
          class="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg"
        >
          Kembali ke Beranda
        </NuxtLink>
        <NuxtLink
          to="/layanan"
          class="px-8 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
        >
          Lihat Layanan Lainnya
        </NuxtLink>
      </div>

      <!-- Contact Info -->
      <div class="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-6 text-white">
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
// Page meta
useHead({
  title: 'Pengajuan Berhasil - INOLAND',
  meta: [
    { name: 'description', content: 'Pengajuan pendampingan inovasi berhasil diterima' }
  ]
})
</script>

<style scoped>
/* Additional custom styles if needed */
</style>