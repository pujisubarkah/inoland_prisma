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
      <div class="container mx-auto px-6 flex flex-col items-center justify-center">
        <h1 class="animated-title text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-2 tracking-wide drop-shadow-lg">
          <span class="block animate-gradient">Everyone Can Innovate</span>
        </h1>
        <p class="text-white text-lg font-medium opacity-90 mt-2 drop-shadow">
          Inovasi untuk semua!
        </p>
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
</style>