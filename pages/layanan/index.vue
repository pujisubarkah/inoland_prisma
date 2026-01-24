<!-- pages/layanan.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Ecosystem Selection (like Udemy course cards) -->
    <div v-if="!selectedEcosystem" class="px-8 py-8">
      <div class="max-w-6xl mx-auto">
        <h1 class="text-3xl font-bold text-gray-800 mb-8 text-center">{{ $t('layananH1') }}</h1>
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
              <h2 class="text-xl font-semibold text-gray-800 mb-2">{{ $t('laboratoriumInovasi') }}</h2>
              <p class="text-gray-600 mb-4">
                {{ $t('laboratoriumDesc') }}
              </p>
              <div class="flex items-center mb-4">
                <span class="text-sm text-gray-500">{{ $t('laboratoriumMeta') }}</span>
              </div>
              <button 
                @click="selectEcosystem('labinov')"
                class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {{ $t('mulaiBelajar') }}
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
              <h2 class="text-xl font-semibold text-gray-800 mb-2">{{ $t('ekosistemInovasi') }}</h2>
              <p class="text-gray-600 mb-4">
                {{ $t('ekosistemDesc') }}
              </p>
              <div class="flex items-center mb-4">
                <span class="text-sm text-gray-500">{{ $t('ekosistemMeta') }}</span>
              </div>
              <button 
                @click="selectEcosystem('ekosistem')"
                class="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
              >
                {{ $t('mulaiBelajar') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Dynamic Component Rendering -->
    <!-- Sekarang navigasi ke halaman, tidak perlu render dinamis di sini -->
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const { t } = useI18n()
const selectEcosystem = (ecosystem) => {
  if (ecosystem === 'labinov') {
    router.push('/layanan/laboratorium_inovasi')
  } else if (ecosystem === 'ekosistem') {
    router.push('/layanan/ekosistem_inovasi')
  }
}

// Set page title
useHead({
  title: t('layananTitle'),
  meta: [
    { name: 'description', content: t('layananMetaDesc') }
  ]
})
</script>

<style scoped>
/* Additional styles if needed */
</style>