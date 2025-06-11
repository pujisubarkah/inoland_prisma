<script setup>
definePageMeta({
  layout: "default"
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
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

    <!-- Properexpo Section -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto">
        <Properexpo />
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