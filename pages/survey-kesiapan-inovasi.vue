<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-10 px-4">
    <div class="max-w-4xl mx-auto">
      <!-- HEADER -->
      <div class="flex justify-between items-center mb-10">
        <div class="text-center flex-1">
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
      </div>

      <!-- Button to Fill Survey -->
      <div class="text-center">
        <button @click="navigateTo('/survey-form')" class="btn-primary">
          Isi Survey
        </button>
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

        <!-- Chart Spiderweb for each instansi -->
        <template v-if="surveyData.length > 0">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div v-for="inst in surveyData" :key="inst.instansi.id" class="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h3 class="text-lg font-semibold mb-2 text-center">{{ inst.instansi.nama_instansi }}</h3>
              <apexchart
                type="radar"
                :options="getChartOptions(inst.components)"
                :series="getChartSeries(inst.components)"
                height="350"
              />
            </div>
          </div>
        </template>

        <!-- No Data Message -->
        <div v-else class="text-center py-10">
          <p class="text-gray-600 mb-4">Belum ada hasil survey. Silakan isi survey terlebih dahulu.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useCurrentUser } from '~/composables/useCurrentUser'

interface Periode {
  id: number
  tahun: string
  is_active?: boolean
  created_at?: string | null
}

interface SurveyResponseDetail {
  id: number
  indicator: {
    id: number
    kode: string
    pertanyaan: string
    component: {
      id: number
      kode: string
      nama: string
    }
  }
  skor: number
}

interface ComponentData {
  component: {
    id: string
    kode: string
    nama: string
  }
  averageSkor: number
}

interface InstansiData {
  instansi: {
    id: number
    nama_instansi: string
  }
  periode: {
    id: number
    tahun: number
    is_active: boolean
  }
  components: ComponentData[]
}

interface ResponseData {
  success: boolean
  data: InstansiData[]
}

const { user } = useCurrentUser()

const isLoading = ref(true)
const error = ref('')
const activePeriode = ref<Periode | null>(null)
const surveyDetails = ref<SurveyResponseDetail[]>([])
const surveyData = ref<InstansiData[]>([])
const chartSeries = ref([{ name: 'Skor Indikator', data: [] as number[] }])
const chartOptions = ref({
  chart: { type: 'radar' },
  xaxis: { categories: [] as string[] },
  yaxis: { min: 0, max: 4 },
  colors: ['#2563eb']
})

const hasChartData = computed(() => chartSeries.value.length > 0 && chartSeries.value[0]!.data.length > 0)

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

    // Load survey response details for chart
    await loadSurveyResponseDetails()

  } catch (err: any) {
    error.value = err.message || 'Gagal memuat data'
    console.error('Load data error:', err)
  } finally {
    isLoading.value = false
  }
}

const loadSurveyResponseDetails = async () => {
  try {
    // Fetch detail hasil survey
    const responseRes = await $fetch<ResponseData>('/api/response')
    if (responseRes.success && Array.isArray(responseRes.data)) {
      surveyData.value = responseRes.data
      // Charts will be handled in template
    }
  } catch (err: any) {
    console.error('Load survey response error:', err)
  }
}

// Lifecycle
onMounted(() => {
  loadData()
})

useHead({
  title: 'Dashboard Survey Kesiapan Inovasi - INOLAND'
})

const getChartOptions = (components: ComponentData[]) => ({
  chart: { type: 'radar' },
  xaxis: { categories: components.map(c => c.component.kode) },
  yaxis: { min: 0, max: 4 },
  colors: ['#2563eb']
})

const getChartSeries = (components: ComponentData[]) => ([{
  name: 'Average Skor',
  data: components.map(c => c.averageSkor)
}])
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
