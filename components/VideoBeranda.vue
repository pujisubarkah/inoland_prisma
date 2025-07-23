<template>
  <div class="flex flex-col lg:flex-row w-full items-center text-white p-4 sm:p-6 lg:p-10 rounded-xl shadow-lg relative overflow-hidden"
       style="background: linear-gradient(90deg, #0a3570 0%, #154c8c 30%, #2563eb 60%, #1976d2 85%, #42a5f5 100%);">
    <!-- Video YouTube -->
    <div class="relative w-full lg:w-1/2 mb-6 lg:mb-0">
      <iframe
        class="w-full h-48 sm:h-56 md:h-64 lg:h-80 rounded-lg shadow-md"
        src="https://www.youtube.com/embed/SeE5cBzl26Q"
        title="YouTube Video"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>

      <!-- Tulisan samping (vertical text) - Hidden on mobile -->
      <div class="hidden lg:block absolute left-[-140px] top-1/2 -translate-y-1/2 rotate-90 text-xs lg:text-sm tracking-wider text-gray-200">
        KOLABORASI UNTUK PERUBAHAN
      </div>
    </div>

    <!-- Deskripsi -->
    <div class="w-full lg:w-1/2 lg:ml-6 xl:ml-10">
      <!-- Garis dekoratif -->
      <div class="flex items-center justify-center lg:justify-start space-x-2 mb-4">
        <div class="w-8 sm:w-10 h-1 bg-white"></div>
        <div class="w-3 sm:w-4 h-1 bg-white"></div>
      </div>

      <h3 class="text-xl sm:text-2xl font-bold leading-tight text-center lg:text-left mb-4">
        Kreativitas dan Kolaborasi Bersatu di INOLAND untuk Menciptakan Inovasi yang Berarti.
      </h3>
      <p class="text-gray-200 text-sm sm:text-base leading-relaxed text-center lg:text-left">
        "Inovasi dapat dicapai oleh siapa saja melalui kreativitas dan kolaborasi, 
        di mana beragam ide saling dibagikan untuk menciptakan dampak yang berarti. 
        INOLAND, sebagai platform informasi dari Pusat Inovasi Administrasi Negara, 
        berfungsi sebagai sistem integrasi untuk memperkuat kapasitas inovasi melalui 
        berbagai program advokasi pembelajaran yang inspiratif."
      </p>
    </div>
  </div>
</template>

<script setup>
// No script needed for this component
</script>

<style scoped>
/* Custom styles jika diperlukan */
</style>