<template>
  <div class="app">
    <div style="display: flex; flex-direction: column; align-items: center;">
      <!-- Peta Provinsi -->
      <div style="border: 1px solid #ccc; padding: 10px; border-radius: 5px; width: 100%; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h1 style="font-family: 'Poppins', sans-serif; font-weight: bold; font-size: 2rem; text-align: center; margin: 20px 0 10px 0;">
          SEBARAN LABORATORIUM INOVASI
        </h1>
        <hr style="width: 100px; border: none; height: 2px; background: linear-gradient(to right, #16578d, black, #16578d); margin: 0 auto 20px auto;" />
        <svg baseProfile="tiny" viewBox="0 0 981.98602 441.06508" width="100%" height="auto" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="grad-red" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#ff0000" stop-opacity="1" />
              <stop offset="100%" stop-color="#ffcccc" stop-opacity="1" />
            </linearGradient>
            <linearGradient id="grad-orange" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#ff9900" stop-opacity="1" />
              <stop offset="100%" stop-color="#ffe5b5" stop-opacity="1" />
            </linearGradient>
            <linearGradient id="grad-green" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#00ff00" stop-opacity="1" />
              <stop offset="100%" stop-color="#ccffcc" stop-opacity="1" />
            </linearGradient>
          </defs>

          <path
            v-for="provinsi in provinsis"
            :key="provinsi.id_provinsi"
            :d="cleanSvgPath(provinsi.svg_path)"
            :fill="getChoroplethColor(provinsi.jumlah_inovasi || 0)"
            stroke="black"
            stroke-width="0.5"
            @click="loadKabupaten(provinsi.id_provinsi)"
            @mouseenter="handleMouseEnter($event, `${provinsi.nama} ${provinsi.jumlah_inovasi} inovasi`)"
            @mouseleave="handleMouseLeave"
          >
            <title>{{ provinsi.nama }}</title>
          </path>

          <!-- Tooltip Hover -->
          <foreignObject v-if="hoveredArea.visible" :x="hoveredArea.x" :y="hoveredArea.y" width="200" height="75">
            <div style="background: white; border: solid #ccc; border-radius: 5px; padding: 5px;">
              <strong>{{ hoveredArea.text.split('  ')[0] }}</strong><br/>
              {{ hoveredArea.text.split('  ')[1] }}
            </div>
          </foreignObject>
        </svg>
      </div>

      <!-- Popup Kabupaten -->
      <div v-if="selectedProvinsi !== null" class="popup-overlay">
        <div class="popup-box">
          <button class="close-btn" @click="selectedProvinsi = null">✖</button>
          <h1>Daftar Inovasi di Provinsi {{ selectedProvinceName }}</h1>
          <hr />

          <div style="display: flex; gap: 20px;">
            <!-- Left Side: Map & Chart -->
            <div style="width: 45%;">
              <!-- Kabupaten Map -->
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

              <!-- Chart -->
              <div style="margin-top: 10px;">
                <select v-model="selectedIndex" style="width: 100%; padding: 8px; margin-bottom: 10px;">
                  <option value="indeks_skor">Indeks Inovasi Daerah</option>
                  <option value="ipp_skor">Indeks Pelayanan Publik</option>
                  <option value="idsd_skor">Indeks Daya Saing Daerah</option>
                  <option value="rb_level">Indeks Reformasi Birokrasi</option>
                </select>
                
                <!-- Vue Chart.js Line Chart -->
                <div style="height: 300px;">
                  <Line 
                    :data="chartData" 
                    :options="chartOptions"
                    style="max-height: 300px;"
                  />
                </div>
              </div>
            </div>

            <!-- Right Side: Table -->
            <div style="width: 55%;">
              <table class="inovasi-table">
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
              <div class="pagination">
                <button v-if="currentPage > 1" @click="handlePageChange(currentPage - 1)">Prev</button>
                <button v-for="page in totalPages" :key="page" :class="{ active: page === currentPage }" @click="handlePageChange(page)">
                  {{ page }}
                </button>
                <button v-if="currentPage < totalPages" @click="handlePageChange(currentPage + 1)">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Legend -->
    <div class="legend">
      <h3>LEGENDA</h3>
      <div class="legend-item" v-for="(color, label) in legendColors" :key="label">
        <div class="legend-color" :style="{ backgroundColor: color }"></div>
        <span>{{ label }}</span>
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
  'Tinggi (≥20)': '#ff0000',
  'Sedang (10-19)': '#ff9900', 
  'Rendah (1-9)': '#00ff00',
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
  if (jumlah >= 20) return 'url(#grad-red)'
  if (jumlah >= 10) return 'url(#grad-orange)'
  if (jumlah > 0) return 'url(#grad-green)'
  return '#e0e0e0'
}

// Load initial data
onMounted(async () => {
  const { data } = await useFetch('/api/provinsis')
  provinsis.value = (data.value ?? []).map((item: any) => ({
    id_provinsi: item.id_provinsi ?? item.id ?? 0,
    nama: item.nama ?? '',
    svg_path: item.svg_path ?? '',
    jumlah_inovasi: item.jumlah_inovasi ?? 0
  })) as Provinsi[]
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
}

const loadInovasi = async (id_kabkot: number) => {
  const { data: inovasiData } = await useFetch(`/api/inolands`, { query: { kabkotId: id_kabkot } })
  const { data: indeksData } = await useFetch(`/api/indeks-inovasi`, { query: { kabkotId: id_kabkot } })

  inovasiKabupaten.value = (inovasiData.value && Array.isArray((inovasiData.value as any).data) ? (inovasiData.value as any).data : []) as Inovasi[]
  indeksInovasi.value = indeksData.value as IndeksInovasi[]
  selectedKabkot.value = id_kabkot
  currentPage.value = 1
}

// Mouse event handlers for tooltip
function handleMouseEnter(event: MouseEvent, text: string) {
  const svg = (event.target as SVGElement).ownerSVGElement
  let x = 0
  let y = 0
  if (svg) {
    const pt = svg.createSVGPoint()
    pt.x = event.clientX
    pt.y = event.clientY
    const cursorpt = pt.matrixTransform(svg.getScreenCTM()?.inverse())
    x = cursorpt.x
    y = cursorpt.y
  }
  hoveredArea.value = {
    visible: true,
    text,
    x,
    y
  }
}

function handleMouseLeave() {
  hoveredArea.value = { ...hoveredArea.value, visible: false }
}
</script>

<style scoped>
.app {
  font-family: 'Poppins', sans-serif;
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
  max-width: 90%;
  max-height: 90%;
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
  margin-top: 10px;
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

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 5px;
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
  max-width: 300px;
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
</style>