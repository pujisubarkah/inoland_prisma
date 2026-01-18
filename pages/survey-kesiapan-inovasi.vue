<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-10 px-4">
    <div class="max-w-4xl mx-auto">
      <!-- HEADER -->
      <div class="text-center mb-10">
        <h1 class="text-3xl font-bold text-blue-800">
          Dashboard Survey Kesiapan Inovasi
        </h1>
        <p class="text-blue-600 mt-2">
          Ringkasan Hasil Survey Ekosistem Inovasi Instansi
        </p>
        <p v-if="activePeriode" class="text-sm text-gray-600 mt-1">
          Periode Survey: {{ activePeriode.tahun }}
        </p>
      </div>

      <!-- LOADING -->
      <div v-if="isLoading" class="text-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p class="mt-4 text-gray-600">Memuat data...</p>
      </div>

      <!-- ERROR -->
      <div v-else-if="error" class="text-center py-20">
        <div class="text-red-500 text-6xl mb-4">⚠️</div>
        <h3 class="text-xl font-semibold text-gray-800 mb-2">Terjadi Kesalahan</h3>
        <p class="text-gray-600">{{ error }}</p>
        <button @click="loadData" class="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Coba Lagi
        </button>
      </div>

      <!-- DASHBOARD -->
      <div v-else class="bg-white p-8 rounded-xl shadow">
        <h2 class="text-xl font-bold mb-4">Hasil Survey Kesiapan Inovasi</h2>

        <!-- Chart Spiderweb -->
        <div v-if="chartSeries[0].data.length > 0" class="mb-8">
          <apexchart
            type="radar"
            :options="chartOptions"
            :series="chartSeries"
            height="400"
          />
        </div>

        <!-- No Data Message -->
        <div v-else class="text-center py-10">
          <p class="text-gray-600 mb-4">Belum ada hasil survey. Silakan isi survey terlebih dahulu.</p>
        </div>

        <!-- Button to Fill Survey -->
        <div class="text-center">
          <button @click="navigateTo('/survey-form')" class="btn-primary">
            Isi Survey
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCurrentUser } from '~/composables/useCurrentUser'

interface Periode {
  id: number
  tahun: string
  is_active?: boolean
  created_at?: string | null
}

interface SurveyResult {
  id: number
  nama: string
  averageScore: number
}

interface SurveyResultsResponse {
  success: boolean
  data: Array<{
    id: number
    nama: string
    averageScore: number
  }>
}

const { user } = useCurrentUser()

const isLoading = ref(true)
const error = ref('')
const activePeriode = ref<Periode | null>(null)
const surveyResults = ref<SurveyResult[]>([])
const chartSeries = ref([{ name: 'Skor Rata-rata', data: [] as number[] }])
const chartOptions = ref({
  chart: { type: 'radar' },
  xaxis: { categories: [] as string[] },
  yaxis: { min: 0, max: 4 },
  colors: ['#2563eb']
})

// Methods
const loadData = async () => {
  try {
    isLoading.value = true
    error.value = ''

    // Load active periode
    const periodeRes = await $fetch('/api/survey_periode/active')
    if (periodeRes.success && periodeRes.data) {
      const data = periodeRes.data
      activePeriode.value = {
        id: data.id,
        tahun: String(data.tahun),
        is_active: data.is_active ?? undefined,
        created_at: data.created_at
      }
    }

    // Load survey results for chart
    await loadSurveyResults()

  } catch (err: any) {
    error.value = err.message || 'Gagal memuat data'
    console.error('Load data error:', err)
  } finally {
    isLoading.value = false
  }
}

const loadSurveyResults = async () => {
  try {
    // Fetch hasil survey berdasarkan instansi pengguna
    const resultsRes = await $fetch<SurveyResultsResponse>('/api/survey/results', {
      query: { instansiId: user.value?.instansi_id }
    })
    if (resultsRes.success && Array.isArray(resultsRes.data)) {
      surveyResults.value = resultsRes.data.map((item: any) => ({
        id: item.id,
        nama: item.nama,
        averageScore: item.averageScore || 0
      }))
      // Update chart
      chartSeries.value[0].data = surveyResults.value.map(r => r.averageScore)
      chartOptions.value.xaxis.categories = surveyResults.value.map(r => r.nama)
    }
  } catch (err: any) {
    console.error('Load survey results error:', err)
  }
}

// Lifecycle
onMounted(() => {
  loadData()
})

useHead({
  title: 'Dashboard Survey Kesiapan Inovasi - INOLAND'
})
</script>

<style scoped lang="postcss">
.btn-primary {
  @apply px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700;
}

/* Loading animation */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
