<!-- components/StatsGrid.vue -->
<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 grid gap-3 sm:gap-4 auto-rows-fr grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
    <!-- Judul -->
    <div class="p-4 sm:p-6 rounded-xl shadow-lg bg-white text-gray-800 col-span-1 sm:col-span-2 lg:col-span-2 flex flex-col justify-start">
      <h3 class="text-xl sm:text-2xl font-extrabold text-center sm:text-left">LABINOV dalam Angka</h3>
      <div class="w-16 h-1 bg-blue-500 mt-2 mx-auto sm:mx-0"></div>
    </div>

    <!-- Statistik -->
    <div v-for="(stat, index) in stats" :key="index" 
         class="p-4 sm:p-6 rounded-xl shadow-lg flex flex-col items-center text-center text-white hover:scale-105 transition-all duration-300 cursor-pointer"
         :class="gradients[index % gradients.length]">
      <p class="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">
        <AnimatedCounter :value="stat.value" :suffix="stat.suffix" />
      </p>
      <p class="text-xs sm:text-sm uppercase mb-2 sm:mb-3 leading-tight">{{ stat.label }}</p>
      <div class="text-2xl sm:text-3xl">
        <!-- Icon menggunakan emoji -->
        <span v-if="stat.iconType === 'lightbulb'">💡</span>
        <span v-else-if="stat.iconType === 'rocket'">🚀</span>
        <span v-else-if="stat.iconType === 'map'">📍</span>
        <span v-else-if="stat.iconType === 'city'">🏢</span>
        <span v-else-if="stat.iconType === 'building'">🏛️</span>
        <span v-else-if="stat.iconType === 'handshake'">🤝</span>
        <span v-else-if="stat.iconType === 'person'">👤</span>
        <span v-else-if="stat.iconType === 'briefcase'">💼</span>
        <span v-else-if="stat.iconType === 'school'">🎓</span>
        <span v-else-if="stat.iconType === 'teach'">📚</span>
        <span v-else>📊</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AnimatedCounter from './AnimatedCounter.vue'

const stats = ref([
  { value: 13339, suffix: "+", label: "TOTAL IDE INOVASI", iconType: 'lightbulb' },
  { value: 9625, suffix: "+", label: "IDE DILAUNCHING", iconType: 'rocket' },
  { value: 120, suffix: "+", label: "JUMLAH LOKUS", iconType: 'map' },
  { value: 89, suffix: "+", label: "KABUPATEN DIFASILITASI", iconType: 'city' },
  { value: 30, suffix: "+", label: "KOTA DIFASILITASI", iconType: 'building' },
  { value: 2, suffix: "+", label: "NGO DILIBATKAN", iconType: 'handshake' },
  { value: 30, suffix: "+", label: "FASILITATOR", iconType: 'person' },
  { value: 120, suffix: "+", label: "PERANGKAT DAERAH", iconType: 'briefcase' },
  { value: 929, suffix: "+", label: "ALUMNI WCI", iconType: 'school' },
  { value: 20, suffix: "+", label: "LOKUS WCI", iconType: 'teach' },
])

const gradients = [
  'bg-gradient-to-r from-blue-400 to-cyan-400',
  'bg-gradient-to-r from-blue-500 to-purple-500',
  'bg-gradient-to-r from-cyan-400 to-blue-500',
  'bg-gradient-to-r from-indigo-400 to-cyan-400',
  'bg-gradient-to-r from-blue-600 to-indigo-500',
]
</script>