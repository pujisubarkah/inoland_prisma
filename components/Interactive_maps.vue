<template>
  <div class="app">
    <!-- Header -->
<header class="bg-white shadow-md p-4 mb-6">
  <h1 class="text-2xl font-bold text-center">SEBARAN IDE INOVASI</h1>
  <p class="text-center text-black mt-4 max-w-4xl mx-auto text-base leading-relaxed">
    Sejak 2015, ribuan ide bermunculan dari berbagai penjuru instansi. 
    Peta ini bukan sekadar tampilan visual, tapi bukti nyata bahwa semangat inovasi di sektor publik terus hidup dan berkembang.  
    Ribuan ide telah terpetakan—dan setiap titiknya menyimpan kisah perubahan yang nyata.
  </p>
  <p class="text-center text-black mt-2 max-w-4xl mx-auto text-base leading-relaxed">
    Dari satu gagasan sederhana hingga solusi berdampak besar, setiap titik di peta ini menyimpan kisah tentang keberanian untuk 
    berubah, berkreasi, dan melayani lebih baik. Siapa tahu, titik berikutnya akan berasal dari instansimu, memberi warna baru 
    bagi ekosistem inovasi kita bersama.
  </p>

  <hr class="w-1/4 h-1 bg-gradient-to-r from-blue-700 via-blue-400 to-cyan-400 mx-auto my-4" />
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

    <!-- Popup Kabupaten dengan Dialog shadcn -->
    <Dialog v-model:open="dialogOpen">
      <template #content>
        <div class="popup-box relative">
          <button class="close-btn absolute top-2 right-2" @click="dialogOpen = false; selectedProvinsi = null; dialogKabkotIndeks = []; dialogKabkotName = ''">
            ✖
          </button>
          <h1 class="text-xl font-bold mb-2">Peta Kabupaten di Provinsi {{ selectedProvinceName }}</h1>
          <hr class="my-2" />
          <!-- Table kiri, peta & chart kanan -->
          <div class="flex flex-col md:flex-row gap-6 mb-6">
            <!-- Table Inovasi Kabupaten -->
            <div class="w-full md:w-1/2">
              <h2 class="font-bold mb-2 text-blue-700">
                Daftar Ide Inovasi  {{ dialogKabkotName }}
              </h2>
              <div style="max-height:340px;overflow:auto;">
                <div style="overflow-x:auto;">
                  <Table class="inovasi-table w-full">
                    <thead>
                      <tr>
                        <th>Tahun</th>
                        <th>Judul Inovasi</th>
                        <th>Urusan</th>
                        <th>Inovator</th>
                        <th>Deskripsi</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in dialogKabkotInovasi" :key="item.id">
                        <td>{{ item.tahun }}</td>
                        <td>{{ item.judul_inovasi }}</td>
                        <td>{{ item.urusan }}</td>
                        <td>{{ item.inovator || '-' }}</td>
                        <td>{{ item.deskripsi }}</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
            <!-- Peta & Chart Kabupaten -->
            <div class="w-full md:w-1/2 flex flex-col gap-4 items-center justify-center">
              <div class="overflow-hidden rounded-lg shadow-md mb-2">
                <svg viewBox="-100 0 1000 600" height="350" preserveAspectRatio="xMidYMid meet" class="map-kabupaten">
                  <path
                    v-for="kab in kabupaten"
                    :key="kab.id_kabkot"
                    :d="cleanSvgPath(kab.svg_path)"
                    :fill="getChoroplethColor(kab.jumlah_inovasi || 0)"
                    stroke="black"
                    stroke-width="1"
                    @click="showKabupatenChart(kab)"
                  />
                </svg>
              </div>
              <div v-if="dialogKabkotIndeks.length" class="bg-white rounded-lg shadow p-4 animate-fadeIn w-full">
                <h2 class="font-bold mb-2 text-blue-700">Indeks {{ getIndexLabel(dialogSelectedIndex) }} {{ dialogKabkotName }}</h2>
                <select v-model="dialogSelectedIndex" class="mb-4 p-2 border border-blue-300 rounded-lg w-full">
                  <option value="indeks_skor">Indeks Inovasi Daerah</option>
                  <option value="ipp_skor">Indeks Pelayanan Publik</option>
                  <option value="idsd_skor">Indeks Daya Saing Daerah</option>
                  <option value="rb_level">Indeks Reformasi Birokrasi</option>
                </select>
                <Line
                  :data="{
                    labels: dialogKabkotIndeks.slice().sort((a, b) => a.indeks_tahun - b.indeks_tahun).map(i => i.indeks_tahun),
                    datasets: [
                      {
                        label: getIndexLabel(dialogSelectedIndex),
                        data: dialogKabkotIndeks.slice().sort((a, b) => a.indeks_tahun - b.indeks_tahun).map(i => i[dialogSelectedIndex]),
                        borderColor: dialogChartColor,
                        backgroundColor: dialogChartColor + '20',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4
                      }
                    ]
                  }"
                  :options="{
                    responsive: true,
                    plugins: { legend: { display: false } }
                  }"
                  style="height:160px"
                />
              </div>
            </div>
          </div>
        </div>
      </template>
    </Dialog>

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

    <!-- Indeks Inovasi Chart on Hover -->
    <div v-if="hoveredIndeks.length" class="mt-4 bg-white rounded-lg shadow p-4">
      <h2 class="font-bold mb-2">Indeks Inovasi {{ hoveredKabkotName }}</h2>
      <Line
        :data="{
          labels: hoveredIndeks.map(i => i.indeks_tahun),
          datasets: [
            {
              label: 'Indeks Inovasi',
              data: hoveredIndeks.map(i => i.indeks_skor),
              borderColor: '#3B82F6',
              backgroundColor: '#3B82F620',
              borderWidth: 3,
              fill: true,
              tension: 0.4
            }
          ]
        }"
        :options="{
          responsive: true,
          plugins: { legend: { display: false } }
        }"
        style="height:200px"
      />
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
import axios from 'axios'
import Dialog from '@/components/ui/dialog/Dialog.vue'
import Table from '@/components/ui/table/Table.vue'

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
  id: number
  id_kabkot: number
  nama_kabkot: string
  id_provinsi: number
  jumlah_inovasi: number
  svg_path: string
}

interface Inovasi {
  id: number
  judul_inovasi: string
  tahun: number
  inovator: string
  deskripsi: string
  id_kabkot: number
  urusan?: string
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
const dialogOpen = ref(false)
const hoveredArea = ref({ visible: false, text: '', x: 0, y: 0 })
const inovasiKabupaten = ref<Inovasi[]>([])
const indeksInovasi = ref<IndeksInovasi[]>([])
const hoveredIndeks = ref<IndeksInovasi[]>([])
const hoveredKabkotName = ref('')
const dialogKabkotIndeks = ref<IndeksInovasi[]>([])
const dialogKabkotName = ref('')
const dialogSelectedIndex = ref<'indeks_skor' | 'ipp_skor' | 'idsd_skor' | 'rb_level'>('indeks_skor')
const dialogKabkotInovasi = ref<Inovasi[]>([])

// Dialog chart color based on selected index
const dialogChartColor = computed(() => {
  switch (dialogSelectedIndex.value) {
    case 'indeks_skor':
      return '#3B82F6'
    case 'ipp_skor':
      return '#10B981'
    case 'idsd_skor':
      return '#F59E0B'
    case 'rb_level':
      return '#EF4444'
    default:
      return '#3B82F6'
  }
})

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
    const res = await axios.get(`/api/inovasiPerKabkot/${id_provinsi}`)
    kabupaten.value = Array.isArray(res.data)
      ? res.data.map((item: any) => ({
          id: item.id,
          id_kabkot: item.id_kabkot,
          nama_kabkot: item.nama_kabkot,
          id_provinsi: item.id_provinsi,
          jumlah_inovasi: Number(item.jumlah_inovasi ?? 0),
          svg_path: item.svg_path ?? ''
        }))
      : []
    selectedProvinsi.value = id_provinsi
    dialogOpen.value = true
  } catch (error) {
    console.error('Error fetching kabupaten:', error)
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

async function handleKabupatenHover(kab: Kabupaten) {
  hoveredKabkotName.value = kab.nama_kabkot
  try {
    const { data } = await useFetch(`/api/indeks_inovasi/${kab.id_kabkot}`)
    hoveredIndeks.value = (data.value && Array.isArray((data.value as any).data)) ? (data.value as any).data : []
  } catch (error) {
    hoveredIndeks.value = []
  }
}

function handleKabupatenLeave() {
  hoveredIndeks.value = []
  hoveredKabkotName.value = ''
}

const svgWidth = 981; // Sesuaikan dengan viewBox SVG utama

async function showKabupatenChart(kab: Kabupaten) {
  dialogKabkotName.value = kab.nama_kabkot
  try {
    const { data: indeksData } = await useFetch(`/api/indeks_inovasi/${kab.id_kabkot}`)
    dialogKabkotIndeks.value = (indeksData.value && Array.isArray((indeksData.value as any).data)) ? (indeksData.value as any).data : []
    const { data: inovasiData } = await useFetch(`/api/inolands/${kab.id_kabkot}`)
    dialogKabkotInovasi.value = (inovasiData.value && 'data' in inovasiData.value && Array.isArray((inovasiData.value as any).data)) ? (inovasiData.value as any).data : []
  } catch (error) {
    dialogKabkotIndeks.value = []
    dialogKabkotInovasi.value = []
  }
}
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
  position: relative;
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(12px) saturate(180%);
  box-shadow: 0 12px 32px rgba(60,130,246,0.18), 0 2px 8px rgba(0,0,0,0.10);
  border-radius: 22px;
  padding: 40px 32px 32px 32px;
  max-width: 100vw;
  width: 100vw;
  max-height: 92vh;
  overflow-y: auto;
  animation: popupFadeIn 0.35s cubic-bezier(.4,2,.3,1);
  border: 2px solid #3b82f6;
  transition: box-shadow 0.2s, border 0.2s;
}

@media (min-width: 768px) {
  .popup-box {
    max-width: 1200px;
    width: 1200px;
    padding: 48px 40px 36px 40px;
  }
}

@keyframes popupFadeIn {
  from { opacity: 0; transform: translateY(40px) scale(0.96);}
  to   { opacity: 1; transform: translateY(0) scale(1);}
}

.close-btn {
  position: absolute;
  top: 22px;
  right: 22px;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  font-size: 22px;
  box-shadow: 0 2px 12px rgba(60,130,246,0.18);
  transition: background 0.2s, transform 0.2s;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  transform: scale(1.12) rotate(10deg);
}

.popup-box h1 {
  text-align: center;
  font-size: 1.7rem;
  font-weight: 800;
  color: #2563eb;
  margin-bottom: 16px;
  letter-spacing: 0.5px;
  text-shadow: 0 2px 8px #e0e7ff;
}

.popup-box hr {
  border: none;
  border-top: 2px solid #3b82f6;
  margin: 16px 0 28px 0;
  opacity: 0.18;
}

.map-kabupaten {
  border: 2px solid #3b82f6;
  border-radius: 14px;
  background: #f1f5f9;
  margin: 0 auto;
  box-shadow: 0 2px 16px rgba(60,130,246,0.10);
  transition: box-shadow 0.2s;
}

svg {
  max-width: 100%;
  height: auto;
}

foreignObject > div {
  pointer-events: none;
  z-index: 9999;
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

.inovasi-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 1rem;
  background: rgba(255,255,255,0.96);
  box-shadow: 0 2px 12px rgba(60,130,246,0.08);
  border-radius: 12px;
  overflow: hidden;
  min-width: 600px;
}

.inovasi-table th,
.inovasi-table td {
  padding: 10px 10px;
  border-bottom: 1px solid #e5e7eb;
  background: rgba(248,250,252,0.98);
  transition: background 0.2s;
}

.inovasi-table tr:nth-child(even) {
  background: #f1f5f9;
}

.inovasi-table tr:hover {
  background: #e0e7ff;
}

.inovasi-table th:first-child,
.inovasi-table td:first-child {
  border-radius: 8px 0 0 8px;
}

.inovasi-table th:last-child,
.inovasi-table td:last-child {
  border-radius: 0 8px 8px 0;
}

@media (max-width: 600px) {
  .table, .inovasi-table {
    font-size: 0.92rem;
  }
  .table th, .inovasi-table th,
  .table td, .inovasi-table td {
    padding: 8px 6px;
  }
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

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px);}
  to   { opacity: 1; transform: translateY(0);}
}
.animate-fadeIn {
  animation: fadeIn 0.4s;
}
</style>