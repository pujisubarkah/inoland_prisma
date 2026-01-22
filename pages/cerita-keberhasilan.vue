<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-6xl mx-auto">
      <!-- Header Section -->
      <div class="text-center mb-8">
        <h1 class="text-3xl sm:text-4xl font-bold text-blue-800 mb-3">
          Cerita Keberhasilan
        </h1>
        <p class="text-lg sm:text-xl text-blue-600 font-medium mb-4">
          Kisah Inspiratif Inovasi Daerah yang Berhasil
        </p>
        <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg shadow-sm max-w-3xl mx-auto">
          <p class="text-gray-700 text-sm sm:text-base leading-relaxed">
            Koleksi cerita sukses inovasi daerah yang telah diimplementasikan dan memberikan dampak positif bagi masyarakat. Kisah-kisah ini menjadi inspirasi bagi daerah lain untuk mengembangkan inovasi yang bermanfaat.
          </p>
        </div>
        <div class="mt-6 flex justify-center">
           <NuxtLink to="/cerita-keberhasilan/baru" class="inline-flex items-center px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors font-semibold">
             <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
               <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
             </svg>
             Berbagi Cerita Anda
           </NuxtLink>
        </div>
      </div>

      <!-- Success Stories Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <!-- Story Card 1 -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
          <div class="h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
            <svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-800 mb-2">Sistem E-Government Kabupaten X</h3>
            <p class="text-gray-600 text-sm mb-4">
              Inovasi pelayanan publik berbasis digital yang meningkatkan efisiensi dan transparansi pemerintah daerah.
            </p>
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-green-600">Dampak: Efisiensi 70%</span>
              <button class="text-blue-600 hover:text-blue-800 font-medium text-sm">
                Baca Selengkapnya →
              </button>
            </div>
          </div>
        </div>

        <!-- Story Card 2 -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
          <div class="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
            <svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-800 mb-2">Bank Sampah Digital Kota Y</h3>
            <p class="text-gray-600 text-sm mb-4">
              Platform digital yang menghubungkan masyarakat dengan bank sampah untuk pengelolaan limbah yang lebih efektif.
            </p>
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-blue-600">Dampak: Pengurangan Limbah 50%</span>
              <button class="text-blue-600 hover:text-blue-800 font-medium text-sm">
                Baca Selengkapnya →
              </button>
            </div>
          </div>
        </div>

        <!-- Story Card 3 -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
          <div class="h-48 bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
            <svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-800 mb-2">Sistem Pembelajaran Online Daerah Z</h3>
            <p class="text-gray-600 text-sm mb-4">
              Platform edukasi yang memfasilitasi pembelajaran jarak jauh untuk meningkatkan akses pendidikan di daerah terpencil.
            </p>
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-purple-600">Dampak: Jangkauan 10.000 Siswa</span>
              <button class="text-blue-600 hover:text-blue-800 font-medium text-sm">
                Baca Selengkapnya →
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-8 text-white text-center">
        <h3 class="text-2xl font-bold mb-4">Ingin Berbagi Cerita Keberhasilan Inovasi Anda?</h3>
        <p class="text-lg mb-6 opacity-90">
          Mari jadikan inovasi daerah Anda sebagai inspirasi bagi daerah lain
        </p>
        <button class="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-md">
          Bagikan Cerita Anda
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// Page meta
useHead({
  title: 'Cerita Keberhasilan - INOLAND',
  meta: [
    { name: 'description', content: 'Koleksi cerita sukses inovasi daerah yang memberikan dampak positif' }
  ]
})
</script>

<style scoped>
/* Additional custom styles if needed */
</style>