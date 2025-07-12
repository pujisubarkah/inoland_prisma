<template>
  <div class="app">
    <!-- Header -->
    <header class="bg-white shadow-md p-4 mb-6">
      <h1 class="text-2xl font-bold text-center">SEBARAN LABORATORIUM INOVASI</h1>
      <hr class="w-1/4 h-1 bg-gradient-to-r from-red-500 via-black to-red-500 mx-auto my-2" />
    </header>

    <!-- Provinsi Map -->
    <section class="mb-6">
      <div class="relative overflow-hidden rounded-lg shadow-md">
        <svg viewBox="0 0 981.98602 441.06508" width="100%" height="auto" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="grad-blue-high" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#2563eb" stop-opacity="1" />
              <stop offset="100%" stop-color="#93c5fd" stop-opacity="1" />
            </linearGradient>
            <linearGradient id="grad-blue-mid" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#3b82f6" stop-opacity="1" />
              <stop offset="100%" stop-color="#bfdbfe" stop-opacity="1" />
            </linearGradient>
            <linearGradient id="grad-blue-low" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#60a5fa" stop-opacity="1" />
              <stop offset="100%" stop-color="#e0f2fe" stop-opacity="1" />
            </linearGradient>
          </defs>
          <path
            v-for="provinsi in provinsis"
            :key="provinsi.id_provinsi"
            :d="cleanSvgPath(provinsi.svg_path)"
            :fill="getChoroplethColor(provinsi.jumlah_inovasi)"
            stroke="black"
            stroke-width="0.5"
            @click="loadKabupaten(provinsi.id_provinsi)"
            @mouseenter="handleMouseEnter($event, `${provinsi.nama}<br/>Jumlah Ide Inovasi: ${provinsi.jumlah_inovasi}`)"

            @mouseleave="handleMouseLeave"
          >
            <title>{{ provinsi.nama }}</title>
          </path>
          <!-- Tooltip Hover -->
          <foreignObject v-if="hoveredArea.visible" :x="svgWidth - 230" :y="10" width="220" height="80">
            <div class="bg-white border border-blue-400 rounded-lg p-2 shadow-lg text-sm font-semibold text-blue-700">
              <div v-html="hoveredArea.text"></div>
            </div>
          </foreignObject>
        </svg>
      </div>
    </section>

    <!-- Popup Kabupaten -->
    <div v-if="selectedProvinsi !== null" class="popup-overlay">
      <div class="popup-box">
        <button class="close-btn absolute top-2 right-2" @click="selectedProvinsi = null">
          ✖
        </button>
        <h1 class="text-xl font-bold mb-2">Daftar Inovasi di Provinsi {{ selectedProvinceName }}</h1>
        <hr class="my-2" />

        <!-- Left Side: Map & Chart -->
        <div class="flex flex-col gap-4 w-full md:w-1/2">
          <!-- Kabupaten Map -->
          <div class="overflow-hidden rounded-lg shadow-md">
            <svg viewBox="-100 0 1000 600" height="250" preserveAspectRatio="xMidYMid meet" class="map-kabupaten">
              <path
                v-for="kab in kabupaten"
                :key="kab.id_kabkot"
                :d="cleanSvgPath(kab.svg_path)"
                :fill="getChoroplethColor(kab.jumlah_inovasi || 0)"
                stroke="black"
                stroke-width="1"
                @click="loadInovasi(kab.id_kabkot)"
              />
            </svg>
          </div>

          <!-- Chart -->
          <div class="flex flex-col gap-2">
            <select v-model="selectedIndex" class="w-full p-2 border border-gray-300 rounded-lg">
              <option value="indeks_skor">Indeks Inovasi Daerah</option>
              <option value="ipp_skor">Indeks Pelayanan Publik</option>
              <option value="idsd_skor">Indeks Daya Saing Daerah</option>
              <option value="rb_level">Indeks Reformasi Birokrasi</option>
            </select>
            <Line 
              :data="chartData" 
              :options="chartOptions"
              class="max-h-60"
            />
          </div>
        </div>

        <!-- Right Side: Table -->
        <div class="w-full md:w-1/2">
          <table class="inovasi-table w-full">
            <thead>
              <tr>
                <th>Judul Inovasi</th>
                <th>Tahun</th>
                <th>Inovator</th>
                <th>Deskripsi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="inovasi in currentInovasi" :key="inovasi.id">
                <td>{{ inovasi.judul_inovasi }}</td>
                <td>{{ inovasi.tahun }}</td>
                <td>{{ inovasi.inovator }}</td>
                <td>
                  {{ truncateText(inovasi.deskripsi, inovasi.id) }}
                  <button v-if="inovasi.deskripsi && inovasi.deskripsi.length > maxLength && !expandedIds.includes(inovasi.id)" @click="toggleExpand(inovasi.id)">[More]</button>
                  <button v-if="expandedIds.includes(inovasi.id)" @click="toggleExpand(inovasi.id)">[Less]</button>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- Pagination -->
          <div class="pagination flex justify-center mt-4">
            <button :disabled="currentPage === 1" @click="handlePageChange(currentPage - 1)">Prev</button>
            <button v-for="page in totalPages" :key="page" :class="{ 'bg-blue-500 text-white': page === currentPage }" @click="handlePageChange(page)">
              {{ page }}
            </button>
            <button :disabled="currentPage === totalPages" @click="handlePageChange(currentPage + 1)">Next</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Legend -->
    <div class="legend bg-white p-4 rounded-lg shadow-md mt-6">
      <h3 class="font-bold mb-2">LEGENDA</h3>
      <div class="flex flex-wrap gap-2">
        <div v-for="(color, label) in legendColors" :key="label" class="flex items-center">
          <div class="w-4 h-4 rounded-full" :style="{ backgroundColor: color }"></div>
          <span class="ml-2">{{ label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Line } from 'vue-chartjs'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

// Types
interface Provinsi {
  id_provinsi: number
  nama: string
  svg_path: string
  jumlah_inovasi: number
}
interface Kabupaten {
  id_kabkot: number
  id_provinsi: number
  nama: string
  svg_path: string
  jumlah_inovasi: number
}
interface Inovasi {
  id: number
  judul_inovasi: string
  tahun: number
  inovator: string
  deskripsi: string
  id_kabkot: number
}
interface IndeksInovasi {
  id_provinsi: number
  id_kabkot: number
  indeks_tahun: number
  nama_kabkot: string
  nama_prov: string
  level: string
  indeks_skor: number
  indeks_predikat: string
  indeks_level: number
  ipp_skor: number
  ipp_predikat: string
  ipp_level: number
  idsd_skor: number
  idsd_predikat: string
  idsd_level: number
  rb_predikat: string
  rb_level: number
}

// Data State
const provinsis = ref<Provinsi[]>([])
const kabupaten = ref<Kabupaten[]>([])
const selectedProvinsi = ref<number | null>(null)
const selectedKabkot = ref<number | null>(null)
const hoveredArea = ref({ visible: false, text: '', x: 0, y: 0 })
const inovasiKabupaten = ref<Inovasi[]>([])
const indeksInovasi = ref<IndeksInovasi[]>([])

// Pagination
const currentPage = ref(1)
const itemsPerPage = 5

// Chart State
const selectedIndex = ref<'indeks_skor' | 'ipp_skor' | 'idsd_skor' | 'rb_level'>('indeks_skor')

// Legend colors
const legendColors = ref({
  'Tinggi (≥20)': '#2563eb',
  'Sedang (10-19)': '#3b82f6',
  'Rendah (1-9)': '#60a5fa',
  'Tidak ada data': '#e0e0e0'
})

// Computed: Paginated inovasi for current page
const currentInovasi = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return inovasiKabupaten.value.slice(start, end)
})

// Computed: Total pages for pagination
const totalPages = computed(() => {
  return Math.ceil(inovasiKabupaten.value.length / itemsPerPage)
})

// Computed: Get selected province name
const selectedProvinceName = computed(() => {
  const prov = provinsis.value.find(p => p.id_provinsi === selectedProvinsi.value)
  return prov ? prov.nama : ''
})

// Computed: Chart Data for Vue Chart.js
const chartData = computed(() => {
  if (!indeksInovasi.value.length) {
    return {
      labels: [],
      datasets: []
    }
  }

  // Group data by year and get averages
  const years = [...new Set(indeksInovasi.value.map(item => item.indeks_tahun))].sort()
  let yAxisLabel = ''
  let dataColor = '#3B82F6'
  const data = years.map(year => {
    const yearData = indeksInovasi.value.filter(item => item.indeks_tahun === year)
    const key = selectedIndex.value
    if (key === 'rb_level') {
      // For rb_level, calculate average of numeric values
      const values = yearData.map(item => item.rb_level).filter(val => val !== null)
      return values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0
    } else {
      // For other metrics, calculate average
      const values = yearData.map(item => (item as any)[key]).filter(val => val !== null && val !== undefined)
      return values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0
    }
  })

  // Set label and color based on selected index
  switch (selectedIndex.value) {
    case 'indeks_skor':
      yAxisLabel = 'Skor Indeks Inovasi'
      dataColor = '#3B82F6'
      break
    case 'ipp_skor':
      yAxisLabel = 'Skor Indeks Pelayanan Publik'
      dataColor = '#10B981'
      break
    case 'idsd_skor':
      yAxisLabel = 'Skor Indeks Daya Saing Daerah'
      dataColor = '#F59E0B'
      break
    case 'rb_level':
      yAxisLabel = 'Level Reformasi Birokrasi'
      dataColor = '#EF4444'
      break
  }

  return {
    labels: years,
    datasets: [
      {
        label: yAxisLabel,
        data: data,
        borderColor: dataColor,
        backgroundColor: `${dataColor}20`,
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: dataColor,
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8
      }
    ]
  }
})

// Computed: Chart Options for Vue Chart.js
const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top' as const,
      labels: {
        usePointStyle: true,
        padding: 20,
        font: {
          size: 12,
          family: 'Poppins'
        }
      }
    },
    title: {
      display: true,
      text: `Trend ${getIndexLabel(selectedIndex.value)}`,
      font: {
        size: 16,
        family: 'Poppins',
        weight: 'bold' as const
      },
      padding: 20
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: '#ffffff',
      bodyColor: '#ffffff',
      borderColor: '#3B82F6',
      borderWidth: 1,
      cornerRadius: 8,
      displayColors: true,
      callbacks: {
        label: function(context: any) {
          const value = context.parsed.y.toFixed(2)
          return `${context.dataset.label}: ${value}`
        }
      }
    }
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Tahun',
        font: {
          size: 14,
          family: 'Poppins',
          weight: 'bold' as const
        }
      },
      grid: {
        color: 'rgba(0, 0, 0, 0.1)'
      }
    },
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: getIndexLabel(selectedIndex.value),
        font: {
          size: 14,
          family: 'Poppins',
          weight: 'bold' as const
        }
      },
      grid: {
        color: 'rgba(0, 0, 0, 0.1)'
      }
    }
  },
  interaction: {
    intersect: false,
    mode: 'index' as const
  }
}))

// Helper function to get index label
function getIndexLabel(index: string): string {
  const labels = {
    'indeks_skor': 'Skor Indeks Inovasi',
    'ipp_skor': 'Skor Indeks Pelayanan Publik',
    'idsd_skor': 'Skor Indeks Daya Saing Daerah',
    'rb_level': 'Level Reformasi Birokrasi'
  }
  return labels[index as keyof typeof labels] || 'Indeks'
}

// Truncate functionality
const expandedIds = ref<number[]>([])
const maxLength = 50
function toggleExpand(id: number) {
  const idx = expandedIds.value.indexOf(id)
  if (idx === -1) {
    expandedIds.value.push(id)
  } else {
    expandedIds.value.splice(idx, 1)
  }
}
function truncateText(text: string, id: number): string {
  if (!text) return ''
  if (expandedIds.value.includes(id)) return text
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
}

// Pagination handler
function handlePageChange(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

// Utility to clean SVG path
function cleanSvgPath(path: string | undefined): string {
  return path ? path.replace(/"/g, '') : ''
}

// Choropleth color function
function getChoroplethColor(jumlah: number): string {
  if (jumlah >= 20) return 'url(#grad-blue-high)'
  if (jumlah >= 10) return 'url(#grad-blue-mid)'
  if (jumlah > 0) return 'url(#grad-blue-low)'
  return '#e0e0e0'
}

// Load initial data
onMounted(async () => {
  try {
    const { data } = await useFetch('/api/provinsi')
    provinsis.value = Array.isArray(data.value)
      ? data.value.map((item: any) => ({
          id_provinsi: item.id ?? item.id_provinsi ?? 0,
          nama: item.nama_provinsi ?? item.nama ?? '',
          svg_path: item.svg_path ?? '',
          jumlah_inovasi: item.jumlah_inovasi ?? 0
        }))
      : []
  } catch (error) {
    console.error('Error fetching provinces:', error)
  }
})

const fetchProvinsiData = async () => {
  const ids = provinsis.value.map(p => p.id_provinsi).filter(Boolean).join(',')
  const { data } = await useFetch(`/api/provinsi`, { query: { ids } })
  const provData = (data.value && Array.isArray((data.value as any).data)) ? (data.value as any).data as Provinsi[] : []
  provinsis.value = provinsis.value.map(p => ({
    ...p,
    jumlah_inovasi: provData.find(dp => dp.id_provinsi === p.id_provinsi)?.jumlah_inovasi || 0
  }))
}

fetchProvinsiData()

const loadKabupaten = async (id_provinsi: number) => {
  try {
    const { data } = await useFetch(`/api/kabupaten-maps`, { query: { provId: id_provinsi } })
    kabupaten.value = data.value as Kabupaten[]
    const kabIds = kabupaten.value.map(k => k.id_kabkot)
    const { data: kabkotData } = await useFetch(`/api/kabkot`, { query: { ids: kabIds.join(',') } })
    // Safely extract data array from kabkotData response
    const kabkotArray = (kabkotData.value && Array.isArray((kabkotData.value as any).data))
      ? (kabkotData.value as any).data
      : []
    kabupaten.value = kabupaten.value.map(k => ({
      ...k,
      jumlah_inovasi: kabkotArray.find((dk: any) => (dk.id_kabkot ?? dk.Id_kabkot) === k.id_kabkot)?.jumlah_inovasi || 0
    }))
    const { data: inovasiData } = await useFetch(`/api/inolands`, { query: { provId: id_provinsi } })
    const { data: indeksData } = await useFetch(`/api/indeks-inovasi`, { query: { provId: id_provinsi, level: 'Provinsi' } })
    inovasiKabupaten.value = (inovasiData.value && Array.isArray((inovasiData.value as any).data) ? (inovasiData.value as any).data : []) as Inovasi[]
    indeksInovasi.value = indeksData.value as IndeksInovasi[]
    selectedProvinsi.value = id_provinsi
  } catch (error) {
    console.error('Error loading kabupaten or inovasi data:', error)
  }
}

const loadInovasi = async (id_kabkot: number) => {
  try {
    const { data: inovasiData } = await useFetch(`/api/inolands`, { query: { kabkotId: id_kabkot } })
    const { data: indeksData } = await useFetch(`/api/indeks-inovasi`, { query: { kabkotId: id_kabkot } })
    inovasiKabupaten.value = (inovasiData.value && Array.isArray((inovasiData.value as any).data) ? (inovasiData.value as any).data : []) as Inovasi[]
    indeksInovasi.value = indeksData.value as IndeksInovasi[]
    selectedKabkot.value = id_kabkot
    currentPage.value = 1
  } catch (error) {
    console.error('Error loading inovasi data:', error)
  }
}

// Mouse event handlers for tooltip
function handleMouseEnter(event: MouseEvent, text: string) {
  hoveredArea.value = {
    visible: true,
    text,
    x: 0,
    y: 0
  }
}

function handleMouseLeave() {
  hoveredArea.value = { ...hoveredArea.value, visible: false }
}

const svgWidth = 981; // Sesuaikan dengan viewBox SVG utama
</script>

<style scoped>
.app {
  font-family: 'Poppins', sans-serif;
}

svg path {
  cursor: pointer;
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup-box {
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 15px;
  background: #ff4444;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  font-size: 16px;
}

.close-btn:hover {
  background: #cc0000;
}

.inovasi-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
  word-break: break-word;
}

.inovasi-table th,
.inovasi-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.inovasi-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.inovasi-table button {
  background: none;
  border: none;
  color: #16578d;
  cursor: pointer;
  font-size: 0.9em;
  margin-left: 4px;
  padding: 0;
}

.inovasi-table button:hover {
  text-decoration: underline;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 8px;
}

.pagination button {
  padding: 8px 12px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  border-radius: 4px;
}

.pagination button:hover {
  background: #f0f0f0;
}

.pagination button.active {
  background: #16578d;
  color: white;
  border-color: #16578d;
}

.legend {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #f9f9f9;
  max-width: 100%;
  font-size: 0.95rem;
}

.legend h3 {
  margin: 0 0 10px 0;
  font-size: 16px;
  font-weight: bold;
}

.legend-item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.legend-color {
  width: 20px;
  height: 20px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.map-kabupaten {
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #f9f9f9;
}

foreignObject > div {
  pointer-events: none;
  z-index: 9999;
}
</style>