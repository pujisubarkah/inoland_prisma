<template>
  <div class="flex w-full items-center bg-[#1C2F5D] text-white p-6 md:p-10 rounded-xl shadow-lg relative">
    <!-- Video YouTube -->
    <div class="relative w-full md:w-1/2">
      <iframe
        class="w-full h-64 md:h-80 rounded-lg shadow-md"
        src="https://www.youtube.com/embed/SeE5cBzl26Q"
        title="YouTube Video"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>

      <!-- Tulisan samping (vertical text) -->
      <div class="absolute left-[-140px] top-1/2 -translate-y-1/2 rotate-90 text-xs md:text-sm tracking-wider text-gray-300">
        KOLABORASI UNTUK PERUBAHAN
      </div>
    </div>

    <!-- Deskripsi -->
    <div class="w-full md:w-1/2 mt-6 md:mt-0 md:ml-10">
      <!-- Garis dekoratif -->
      <div class="flex items-center space-x-2 mb-4">
        <div class="w-10 h-1 bg-white"></div>
        <div class="w-4 h-1 bg-white"></div>
      </div>

      <h3 class="text-2xl font-bold leading-tight">
        Kreativitas dan Kolaborasi Bersatu di INOLAND untuk Menciptakan Inovasi yang Berarti.
      </h3>
      <p class="text-gray-300 text-sm mt-4">
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