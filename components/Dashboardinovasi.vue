<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Page Header -->
    <div class="bg-white px-8 py-8 border-b border-gray-200 shadow-sm">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-4xl font-bold mb-2 bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent">
            Dashboard Lab Inovasi
          </h1>
          <p class="text-slate-600 text-lg font-normal">
            Analisis dan visualisasi data lokus laboratorium inovasi daerah
          </p>
        </div>
        
        <!-- Navigation Links -->
        <div class="flex space-x-4">
          <NuxtLink 
            to="/cari/maps_inovasi"
            class="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
          >
            SEBARAN INOVASI
          </NuxtLink>
          <NuxtLink 
            to="/cari/list_inovasi"
            class="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
          >
            LIST INOVASI
          </NuxtLink>
        </div>
      </div>
    </div>    <!-- Stats Cards -->
    <div class="p-8 pb-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-sm p-6">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Lab Inovasi</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats?.totalRecords || 0 }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-6">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Rata-rata Skor</p>
              <p class="text-2xl font-bold text-gray-900">{{ Math.round((stats?.overallStats?.avg_hasil_akhir || 0) * 10) / 10 }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-6">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 16a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"/>
              </svg>
            </div>            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Jilid</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats?.sessionStats?.length || 0 }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-6">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"/>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"/>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Top Performer</p>
              <p class="text-2xl font-bold text-gray-900">{{ Math.round((stats?.topKabupaten?.[0]?.avg_hasil_akhir || 0) * 10) / 10 }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>    <!-- Main Content -->
    <div class="px-8 pb-8">
      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">Error</h3>
            <div class="mt-2 text-sm text-red-700">
              <p>{{ error }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Dashboard Content -->
      <div v-else class="space-y-6">        <!-- Chart Section -->
        <div class="space-y-6">
          <!-- First Row: Pie Chart (Full Width) -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Distribusi Lab Inovasi per Jenis Daerah</h3>
            <div class="h-80 flex justify-center items-center">
              <canvas ref="pieChart" width="400" height="300"></canvas>
            </div>
          </div>

          <!-- Second Row: Two Bar Charts Side by Side -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Bar Chart 1 -->
            <div class="bg-white rounded-lg shadow-sm p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Lokus Lab Inovasi per Tahun dan Jenis Daerah</h3>
              <div class="h-80">
                <canvas ref="barChart1"></canvas>
              </div>
            </div>

            <!-- Bar Chart 2 -->
            <div class="bg-white rounded-lg shadow-sm p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Lokus Lab Inovasi per Tahun dan Jilid</h3>
              <div class="h-80">
                <canvas ref="barChart2"></canvas>
              </div>
            </div>
          </div>
        </div>

        <!-- Table Section -->
        <div class="bg-white rounded-lg shadow-sm">
          <div class="px-6 py-4 border-b border-gray-200">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h3 class="text-lg font-semibold text-gray-900">Data Lab Inovasi</h3>
              
              <!-- Search and Download Controls -->
              <div class="flex flex-col sm:flex-row gap-3">
                <!-- Search Input -->
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <input
                    v-model="searchTerm"
                    type="text"
                    placeholder="Cari provinsi atau kabupaten..."
                    class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <!-- Download Buttons -->
                <div class="flex gap-2">
                  <button
                    @click="downloadCSV"
                    class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                    CSV
                  </button>
                  <button
                    @click="downloadExcel"
                    class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                    XLSX
                  </button>
                  <button
                    @click="downloadPDF"
                    class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                    PDF
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Table -->
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Provinsi
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kabupaten/Kota
                  </th>                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Jilid
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Drum Up
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Diagnose
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Desain
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Deliver Launch
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Deliver Monitor
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Display
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <template v-for="(provinsiGroup, provinsi) in groupedFilteredData" :key="provinsi">
                  <!-- Province Header Row -->
                  <tr class="bg-blue-50">
                    <td colspan="10" class="px-6 py-3 text-sm font-semibold text-blue-900">
                      {{ provinsi }}
                    </td>
                  </tr>
                  <!-- Data Rows -->
                  <tr 
                    v-for="(item, index) in provinsiGroup" 
                    :key="`${provinsi}-${index}`"
                    :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
                  >
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <!-- Empty for kabupaten rows -->
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {{ item.kabupaten?.nama_kabkot || 'N/A' }}
                    </td>                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {{ item.session || 1 }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {{ item.DRUMP_UP || 0 }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {{ item.DIAGNOSE || 0 }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {{ item.DESAIN || 0 }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {{ item.DELIVER_LAUNCHING || 0 }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {{ item.DELIVER_MONITORING || 0 }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {{ item.DISPLAY || 0 }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {{ item.HASIL_AKHIR || 0 }}
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>

          <!-- Empty State -->
          <div v-if="Object.keys(groupedFilteredData).length === 0" class="text-center py-12">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V3a1 1 0 011 1v1M7 4V3a1 1 0 011-1v1m-4 4h16m-1 0v10a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h12a2 2 0 012 2z"/>
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">Tidak ada data</h3>
            <p class="mt-1 text-sm text-gray-500">Data lab inovasi tidak ditemukan atau masih dimuat.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick, watch } from 'vue'

// Define page meta
useHead({
  title: 'Dashboard Lab Inovasi | INOLAND',
  meta: [
    {
      name: 'description',
      content: 'Analisis dan visualisasi data lokus laboratorium inovasi daerah'
    },
    {
      property: 'og:title',
      content: 'Dashboard Lab Inovasi | INOLAND'
    },
    {
      property: 'og:description',
      content: 'Analisis dan visualisasi data lokus laboratorium inovasi daerah'
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      name: 'twitter:title',
      content: 'Dashboard Lab Inovasi | INOLAND'
    },
    {
      name: 'twitter:description',
      content: 'Analisis dan visualisasi data lokus laboratorium inovasi daerah'
    }
  ]
})

// Types
interface StatsData {
  totalRecords: number
  sessionStats: Array<{
    session: number
    count: number
    avg_hasil_akhir: number
  }>
  topKabupaten: Array<{
    kabupaten_nama: string
    provinsi_nama: string
    avg_hasil_akhir: number
    total_records: number
  }>
  overallStats: {
    avg_hasil_akhir: number
    total_hasil_akhir: number
  }
}

interface LabinovData {
  id: number
  created_at: string
  id_kabkot: number
  DRUMP_UP: number | null
  DIAGNOSE: number | null
  DESAIN: number | null
  DELIVER_LAUNCHING: number | null
  DELIVER_MONITORING: number | null
  DISPLAY: number | null
  HASIL_AKHIR: number | null
  session: number | null
  kabupaten: {
    id_kabkot: number
    nama_kabkot: string
    id_provinsi: number
  } | null
  provinsi: {
    id_provinsi: number
    nama_provinsi: string
  } | null
}

interface ApiResponse {
  success: boolean
  data: LabinovData[]
  count: number
}

// Reactive data
const stats = ref<StatsData | null>(null)
const data = ref<LabinovData[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const searchTerm = ref('')

// Chart references
const pieChart = ref<HTMLCanvasElement | null>(null)
const barChart1 = ref<HTMLCanvasElement | null>(null)
const barChart2 = ref<HTMLCanvasElement | null>(null)

// Computed properties
const filteredData = computed(() => {
  if (!searchTerm.value) return data.value
  
  const term = searchTerm.value.toLowerCase()
  return data.value.filter(item => 
    item.provinsi?.nama_provinsi?.toLowerCase().includes(term) ||
    item.kabupaten?.nama_kabkot?.toLowerCase().includes(term)
  )
})

const groupedFilteredData = computed(() => {
  const grouped: Record<string, LabinovData[]> = {}
  
  filteredData.value.forEach(item => {
    const provinsi = item.provinsi?.nama_provinsi || 'Provinsi Tidak Diketahui'
    if (!grouped[provinsi]) {
      grouped[provinsi] = []
    }
    grouped[provinsi].push(item)
  })
  
  // Sort each group by kabupaten name first, then by jilid (session)
  Object.keys(grouped).forEach(provinsi => {
    grouped[provinsi]!.sort((a, b) => {
      const nameA = a.kabupaten?.nama_kabkot || ''
      const nameB = b.kabupaten?.nama_kabkot || ''
      
      // First sort by kabupaten name
      const nameComparison = nameA.localeCompare(nameB)
      if (nameComparison !== 0) {
        return nameComparison
      }
      
      // If kabupaten names are the same, sort by jilid (session)
      // Treat null session as 1
      const sessionA = a.session || 1
      const sessionB = b.session || 1
      return sessionA - sessionB
    })
  })
  
  return grouped
})

const chartData = computed(() => {
  // Static data similar to your example
  const pieData = {
    labels: ['KABUPATEN', 'KOTA', 'PROV'],
    datasets: [
      {
        data: [89, 30, 1],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  }

  const barData = {
    labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
    datasets: [
      {
        label: 'KAB',
        data: [3, 10, 12, 23, 15, 8, 12, 19, 9, 4],
        backgroundColor: '#FF6384',
      },
      {
        label: 'KOTA',
        data: [1, 3, 7, 7, 9, 1, 2, 6, 1, 2],
        backgroundColor: '#36A2EB',
      },
      {
        label: 'PROV',
        data: [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        backgroundColor: '#FFCE56',
      },
    ],
  }

  const barDataJilid = {
    labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
    datasets: [
      {
        label: 'JILID 1',
        data: [4, 13, 20, 27, 21, 7, 11, 18, 6, 0],
        backgroundColor: '#FF6384',
      },
      {
        label: 'JILID 2',
        data: [0, 0, 0, 3, 3, 1, 2, 6, 1, 3],
        backgroundColor: '#36A2EB',
      },
      {
        label: 'JILID 3',
        data: [0, 0, 0, 0, 0, 1, 0, 1, 3, 1],
        backgroundColor: '#FFCE56',
      },
      {
        label: 'JILID 4',
        data: [0, 0, 0, 0, 0, 0, 1, 0, 0, 2],
        backgroundColor: '#4BC0C0',
      },
    ],
  }

  return {
    pieData,
    barData,
    barDataJilid
  }
})

// Methods
const fetchStats = async () => {
  try {
    const response = await $fetch<{ success: boolean; data: StatsData }>('/api/labinov/stats')
    if (response.success) {
      stats.value = response.data
    }
  } catch (error) {
    console.error('Error fetching stats:', error)
  }
}

const fetchData = async () => {
  try {
    loading.value = true
    error.value = null
    
    const response = await $fetch<ApiResponse>('/api/labinov')
    
    if (response.success) {
      data.value = response.data
    } else {
      throw new Error('Failed to fetch data')
    }
  } catch (err) {
    console.error('Error fetching labinov data:', err)
    error.value = 'Gagal memuat data lab inovasi. Silakan coba lagi.'
  } finally {
    loading.value = false
  }
}

const initCharts = async () => {
  await nextTick()
  
  if (typeof window === 'undefined') return
    // Dynamic import untuk Chart.js
  const { Chart, ArcElement, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PieController, BarController } = await import('chart.js')
  
  Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PieController, BarController)
  
  // Pie Chart
  if (pieChart.value) {
    new Chart(pieChart.value, {
      type: 'pie',
      data: chartData.value.pieData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          },
          title: {
            display: true,
            text: 'Distribusi Lab Inovasi per Jenis Daerah'
          }
        }
      }
    })
  }
  
  // Bar Chart 1: Lokus Lab Inovasi per Tahun dan Jenis Daerah
  if (barChart1.value) {
    new Chart(barChart1.value, {
      type: 'bar',
      data: chartData.value.barData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            text: 'Lokus Lab Inovasi Per Tahun dan Jenis Daerah'
          }
        },
        scales: {
          x: {
            stacked: true,
            title: {
              display: true,
              text: 'Tahun'
            }
          },
          y: {
            stacked: true,
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    })
  }
  
  // Bar Chart 2: Lokus Lab Inovasi per Tahun dan Jilid (Horizontal)
  if (barChart2.value) {
    new Chart(barChart2.value, {
      type: 'bar',
      data: chartData.value.barDataJilid,
      options: {
        indexAxis: 'y', // This makes the bar chart horizontal
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            text: 'Lokus Lab Inovasi Per Tahun dan Jilid'
          }
        },
        scales: {
          x: {
            stacked: true,
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          },
          y: {
            stacked: true
          }
        }
      }
    })
  }
}

const downloadCSV = () => {
  try {
    const headers = [
      'Provinsi',
      'Kabupaten/Kota', 
      'Jilid',
      'Drum Up',
      'Diagnose',
      'Desain',
      'Deliver Launch',
      'Deliver Monitor',
      'Display',
      'Total'
    ]
    
    const rows = filteredData.value.map(item => [
      item.provinsi?.nama_provinsi || 'N/A',
      item.kabupaten?.nama_kabkot || 'N/A',
      item.session || 1,
      item.DRUMP_UP || 0,
      item.DIAGNOSE || 0,
      item.DESAIN || 0,
      item.DELIVER_LAUNCHING || 0,
      item.DELIVER_MONITORING || 0,
      item.DISPLAY || 0,
      item.HASIL_AKHIR || 0
    ])
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `dashboard_lab_inovasi_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
    URL.revokeObjectURL(link.href)
  } catch (error) {
    console.error('Error generating CSV:', error)
    alert('Gagal mengunduh CSV. Silakan coba lagi.')
  }
}

const downloadExcel = async () => {
  try {
    // Dynamic import untuk XLSX
    const XLSX = await import('xlsx')
    
    const headers = [
      'Provinsi',
      'Kabupaten/Kota', 
      'Jilid',
      'Drum Up',
      'Diagnose',
      'Desain',
      'Deliver Launch',
      'Deliver Monitor',
      'Display',
      'Total'
    ]
      const rows = filteredData.value.map(item => ({
      'Provinsi': item.provinsi?.nama_provinsi || 'N/A',
      'Kabupaten/Kota': item.kabupaten?.nama_kabkot || 'N/A',
      'Jilid': item.session || 1,
      'Drum Up': item.DRUMP_UP || 0,
      'Diagnose': item.DIAGNOSE || 0,
      'Desain': item.DESAIN || 0,
      'Deliver Launch': item.DELIVER_LAUNCHING || 0,
      'Deliver Monitor': item.DELIVER_MONITORING || 0,
      'Display': item.DISPLAY || 0,
      'Total': item.HASIL_AKHIR || 0
    }))
    
    const worksheet = XLSX.utils.json_to_sheet(rows)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Lab Inovasi')
    XLSX.writeFile(workbook, `dashboard_lab_inovasi_${new Date().toISOString().split('T')[0]}.xlsx`)
  } catch (error) {
    console.error('Error generating Excel:', error)
    alert('Gagal mengunduh Excel. Silakan coba lagi.')
  }
}

const downloadPDF = async () => {
  try {
    // Dynamic import untuk jsPDF
    const { jsPDF } = await import('jspdf')
    
    // Import autotable plugin
    const autoTable = await import('jspdf-autotable')
    
    const doc = new jsPDF()
    
    // Title
    doc.setFontSize(18)
    doc.text('Dashboard Laboratorium Inovasi', 14, 22)
    
    // Date
    doc.setFontSize(11)
    doc.text(`Diekspor pada: ${new Date().toLocaleDateString('id-ID')}`, 14, 32)
      // Table headers
    const headers = [
      'Provinsi',
      'Kab/Kota', 
      'Jilid',
      'Drum Up',
      'Diagnose',
      'Desain',
      'Deliver Launch',
      'Deliver Monitor',
      'Display',
      'Total'
    ]
      // Table data
    const rows = filteredData.value.map(item => [
      item.provinsi?.nama_provinsi || 'N/A',
      item.kabupaten?.nama_kabkot || 'N/A',
      item.session || 1,
      item.DRUMP_UP || 0,
      item.DIAGNOSE || 0,
      item.DESAIN || 0,
      item.DELIVER_LAUNCHING || 0,
      item.DELIVER_MONITORING || 0,
      item.DISPLAY || 0,
      item.HASIL_AKHIR || 0
    ])
    
    // Generate table using autoTable
    ;(doc as any).autoTable({
      head: [headers],
      body: rows,
      startY: 40,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [59, 130, 246] },
      margin: { left: 14, right: 14 }
    })
    
    doc.save(`dashboard_lab_inovasi_${new Date().toISOString().split('T')[0]}.pdf`)
  } catch (error) {
    console.error('Error generating PDF:', error)
    alert('Gagal mengunduh PDF. Silakan coba lagi.')
  }
}

// Watch for data changes to update charts
watch(data, () => {
  if (data.value.length > 0) {
    initCharts()
  }
}, { deep: true })

// Initialize charts when component loads
watch(() => chartData.value, () => {
  initCharts()
}, { immediate: true })

// Lifecycle
onMounted(() => {
  fetchStats()
  fetchData()
})
</script>

<style scoped>
/* Loading animation */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
