<template>
  <div class="dashboard-container">
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
    <div v-else class="space-y-6">
      <!-- Chart Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Pie Chart -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Distribusi Lab Inovasi per Jenis Daerah</h3>
          <div class="h-80 flex justify-center items-center">
            <canvas ref="pieChart" width="300" height="300"></canvas>
          </div>
        </div>

        <!-- Bar Chart -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Lab Inovasi per Session</h3>
          <div class="h-80">
            <canvas ref="barChart"></canvas>
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
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Session
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
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {{ item.session || '-' }}
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
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick, watch } from 'vue'

// Types
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
const data = ref<LabinovData[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const searchTerm = ref('')

// Chart references
const pieChart = ref<HTMLCanvasElement | null>(null)
const barChart = ref<HTMLCanvasElement | null>(null)

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
  
  // Sort each group by kabupaten name
  Object.keys(grouped).forEach(provinsi => {
    grouped[provinsi].sort((a, b) => {
      const nameA = a.kabupaten?.nama_kabkot || ''
      const nameB = b.kabupaten?.nama_kabkot || ''
      return nameA.localeCompare(nameB)
    })
  })
  
  return grouped
})

const chartData = computed(() => {
  // Aggregate data for charts
  const sessionCounts: Record<number, number> = {}
  const typeCounts = { KABUPATEN: 0, KOTA: 0, PROVINSI: 0 }
  
  data.value.forEach(item => {
    // Count by session
    const session = item.session || 0
    sessionCounts[session] = (sessionCounts[session] || 0) + 1
    
    // Count by type (based on kabupaten name)
    const kabName = item.kabupaten?.nama_kabkot || ''
    if (kabName.toLowerCase().includes('kota')) {
      typeCounts.KOTA++
    } else if (kabName.toLowerCase().includes('provinsi')) {
      typeCounts.PROVINSI++
    } else {
      typeCounts.KABUPATEN++
    }
  })
  
  return {
    sessionCounts,
    typeCounts
  }
})

// Methods
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
  const { Chart, ArcElement, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } = await import('chart.js')
  
  Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend)
  
  // Pie Chart
  if (pieChart.value) {
    new Chart(pieChart.value, {
      type: 'pie',
      data: {
        labels: ['Kabupaten', 'Kota', 'Provinsi'],
        datasets: [{
          data: [
            chartData.value.typeCounts.KABUPATEN,
            chartData.value.typeCounts.KOTA,
            chartData.value.typeCounts.PROVINSI
          ],
          backgroundColor: ['#3B82F6', '#10B981', '#F59E0B'],
          borderWidth: 2,
          borderColor: '#fff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    })
  }
  
  // Bar Chart
  if (barChart.value) {
    const sessions = Object.keys(chartData.value.sessionCounts).sort((a, b) => Number(a) - Number(b))
    const counts = sessions.map(session => chartData.value.sessionCounts[Number(session)])
    
    new Chart(barChart.value, {
      type: 'bar',
      data: {
        labels: sessions.map(s => `Session ${s}`),
        datasets: [{
          label: 'Jumlah Lab Inovasi',
          data: counts,
          backgroundColor: '#3B82F6',
          borderColor: '#2563EB',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
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
      'Session',
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
      item.session || '',
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
      'Session',
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
      'Session': item.session || '',
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
    doc.text('Dashboard Lab Inovasi', 14, 22)
    
    // Date
    doc.setFontSize(11)
    doc.text(`Diekspor pada: ${new Date().toLocaleDateString('id-ID')}`, 14, 32)
    
    // Table headers
    const headers = [
      'Provinsi',
      'Kab/Kota', 
      'Session',
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
      item.session || '',
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

// Lifecycle
onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.dashboard-container {
  width: 100%;
}

/* Loading animation */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>