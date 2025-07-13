<script setup>
definePageMeta({
  layout: "default"
})

import BeritaSection from '~/components/Berita_slider.vue'
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-white via-gray-100 to-cyan-100">
    <!-- Animated Title Section -->
    <section class="py-8 bg-gradient-to-r from-cyan-400 via-blue-400 to-blue-700">
      <div class="container mx-auto px-6 flex flex-col items-center justify-center py-12">
        <div class="relative w-fit mb-6">
          <h1 class="animated-title text-center text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-wide drop-shadow-lg">
            <span class="block animate-gradient">Everyone Can Innovate</span>
          </h1>
          <div class="absolute left-1/2 -bottom-4 -translate-x-1/2 w-24 h-2 bg-gradient-to-r from-green-400 via-blue-400 to-blue-700 rounded-full opacity-70"></div>
        </div>
       <div class="hero-text-box px-4 py-3 rounded-xl shadow-lg max-w-4xl w-full">
  <p class="hero-text text-white text-lg md:text-xl font-medium opacity-95 mb-3 text-center">
    Setiap gagasan atau ide adalah berharga dan layak dikembangkan,<br class="hidden sm:inline" />
    <span class="font-semibold text-cyan-200">Inolands</span> memfasilitasi, menghubungkan, dan mendorong setiap ide menuju aksi nyata.
  </p>
  <p class="hero-text text-white text-lg md:text-xl font-medium opacity-95 text-center">
    <span class="font-semibold text-cyan-200">Inolands</span> adalah ekosistem kolaborasi instansi,<br class="hidden sm:inline" />
    tempat ide lintas sektor bertemu dan tumbuh bersama,<br class="hidden sm:inline" />
    membangun masa depan yang adaptif, efektif, dan berdampak.
  </p>
  <p class="hero-text text-white text-lg md:text-xl font-medium opacity-95 text-center mt-4">
    🌱 ide sederhana hanya butuh ruang untuk tumbuh.<br class="hidden sm:inline" />
    Di <span class="font-semibold text-cyan-200">Inolands</span>, kami merawat ruang itu bersama lewat Laboratorium Inovasi.
  </p>
  <p class="hero-text text-white text-lg md:text-xl font-medium opacity-95 text-center mt-2">
    Sejak 2015, pendekatan Laboratorium Inovasi telah kami terapkan<br class="hidden sm:inline" />
    sebagai cara untuk mendekatkan ide dengan realitas dan kebutuhan masyarakat.
  </p>
</div>
      </div>
    </section>

    <!-- Berita Section -->
    <section class="py-12 bg-white">
      <div class="container mx-auto px-6">
        <BeritaSection />
      </div>
    </section>

    <!-- Map Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-6">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-800 mb-4">Peta Sebaran Inovasi</h2>
          <p class="text-gray-600">Visualisasi data inovasi di seluruh Indonesia</p>
        </div>
        <ClientOnly>
          <LeafletMap />
          <template #fallback>
            <div class="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
              <p class="text-gray-500">Loading Map...</p>
            </div>
          </template>
        </ClientOnly>
      </div>
    </section>

    <!-- Video Section -->
    <section class="py-16 bg-gray-100">
      <div class="container mx-auto px-6">
        <VideoBeranda />
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-6">
        <StatsGrid />
      </div>
    </section>

 

    <!-- Carousel Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-6">
        <ClientOnly>
          <Carousel />
          <template #fallback>
            <div class="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
              <p class="text-gray-500">Loading Carousel...</p>
            </div>
          </template>
        </ClientOnly>
      </div>
    </section>
  </div>
</template>

<style scoped>
.animated-title {
  position: relative;
  overflow: hidden;
}
.animate-gradient {
  background: linear-gradient(90deg, #22c55e, #84cc16, #4ade80, #22c55e);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient-move 3s linear infinite, floatUpDown 2s ease-in-out infinite, marqueeMove 8s linear infinite;
  display: inline-block;
  white-space: nowrap;
}

@keyframes gradient-move {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
@keyframes floatUpDown {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}
@keyframes marqueeMove {
  0% { transform: translateX(0); }
  100% { transform: translateX(-40%); }
}

.hero-text {
  text-shadow:
    2px 2px 6px #000,
    0px 0px 2px #000;
  line-height: 1.7;
  letter-spacing: 0.2px;
}

.hero-text-box {
  background: rgba(0,0,0,0.18);
  /* Untuk mobile, background lebih gelap agar teks tetap terbaca */
}

@media (max-width: 640px) {
  .hero-text-box {
    background: rgba(0,0,0,0.32);
  }
}
</style>