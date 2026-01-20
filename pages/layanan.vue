<!-- pages/layanan.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Ecosystem Selection (like Udemy course cards) -->
    <div v-if="!selectedEcosystem" class="px-8 py-8">
      <div class="max-w-6xl mx-auto">
        <h1 class="text-3xl font-bold text-gray-800 mb-8 text-center">Pilih Pembelajaran Inovasi</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Laboratorium Inovasi Card -->
          <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <!-- Background image for Laboratorium Inovasi -->
            <div class="w-full h-48 bg-cover bg-center flex items-center justify-center relative" style="background-image: url('/labinov.png');">
              <svg class="w-16 h-16 text-white relative z-10 drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M6 2a1 1 0 011-1h6a1 1 0 110 2v.5c0 1.5-.5 3.5-2 5.086L8 10.914C6.5 9.5 6 7.5 6 6V2zm4 14c-4 0-6-1.5-6-4 0-1.5 1-3 2.5-4.5L8 6v4c0 2.5 1.5 4 2 4s2-1.5 2-4V6l1.5 1.5C15 9 16 10.5 16 12c0 2.5-2 4-6 4z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div class="p-6">
              <h2 class="text-xl font-semibold text-gray-800 mb-2">Laboratorium Inovasi</h2>
              <p class="text-gray-600 mb-4">
                Pembelajaran mandiri Laboratorium Inovasi dengan 6 tahap inovasi lengkap dengan quiz dan sertifikat. 
                Pelajari proses inovasi dari Drum Up hingga Display.
              </p>
              <div class="flex items-center mb-4">
                <span class="text-sm text-gray-500">6 Modul • Sertifikat Tersedia</span>
              </div>
              <button 
                @click="selectEcosystem('labinov')"
                class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Mulai Belajar
              </button>
            </div>
          </div>

          <!-- Ekosistem Inovasi Card -->
          <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <!-- Background image for Ekosistem Inovasi -->
            <div class="w-full h-48 bg-cover bg-center flex items-center justify-center relative" style="background-image: url('/ekosistem.png');">
              <svg class="w-16 h-16 text-white relative z-10 drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm3 2a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div class="p-6">
              <h2 class="text-xl font-semibold text-gray-800 mb-2">Ekosistem Inovasi</h2>
              <p class="text-gray-600 mb-4">
                Eksplorasi ekosistem inovasi yang lebih luas, termasuk kolaborasi, teknologi, dan implementasi inovasi di berbagai sektor.
              </p>
              <div class="flex items-center mb-4">
                <span class="text-sm text-gray-500">Modul Dinamis • Sertifikat Tersedia</span>
              </div>
              <button 
                @click="selectEcosystem('ekosistem')"
                class="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
              >
                Mulai Belajar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Dynamic Component Rendering -->
    <div v-else>
      <component :is="currentComponent" @back="selectedEcosystem = null" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import LaboratoriumInovasi from '~/components/laboratorium_inovasi.vue'
import EkosistemInovasi from '~/components/ekosistem_inovasi.vue'

// Reactive state
const selectedEcosystem = ref(null) // null for overview, 'labinov' or 'ekosistem'

// Computed for dynamic component
const currentComponent = computed(() => {
  return selectedEcosystem.value === 'labinov' ? LaboratoriumInovasi : EkosistemInovasi
})

// Methods
const selectEcosystem = (ecosystem) => {
  selectedEcosystem.value = ecosystem
}

// Set page title
useHead({
  title: 'Pembelajaran Inovasi | INOLAND',
  meta: [
    { name: 'description', content: 'Pembelajaran mandiri ekosistem inovasi dengan berbagai modul dan sertifikat' }
  ]
})
</script>

<style scoped>
/* Additional styles if needed */
</style>