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
           <NuxtLink to="/cerita-keberhasilan/baru" class="inline-flex items-center px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors font-semibold z-10">
             <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
               <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
             </svg>
             Berbagi Cerita Anda
           </NuxtLink>
        </div>
      </div>
      <!-- Success Stories Grid (dummy) -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <!-- ...story cards... -->
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
