<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-10 px-4">
    <div class="max-w-4xl mx-auto">

      <!-- HEADER -->
      <div class="text-center mb-10">
        <h1 class="text-3xl font-bold text-blue-800">
          Survey Kesiapan Inovasi
        </h1>
        <p class="text-blue-600 mt-2">
          Self-Assessment Ekosistem Inovasi Instansi
        </p>
        <p v-if="activePeriode" class="text-sm text-gray-600 mt-1">
          Periode Survey: {{ activePeriode.tahun }}
        </p>
      </div>

      <!-- LOADING -->
      <div v-if="isLoading" class="text-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p class="mt-4 text-gray-600">Memuat survey...</p>
      </div>

      <!-- ERROR -->
      <div v-else-if="error" class="text-center py-20">
        <div class="text-red-500 text-6xl mb-4">⚠️</div>
        <h3 class="text-xl font-semibold text-gray-800 mb-2">Terjadi Kesalahan</h3>
        <p class="text-gray-600">{{ error }}</p>
        <button @click="loadSurvey" class="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Coba Lagi
        </button>
      </div>

      <!-- FORM -->
      <form v-else-if="surveyData" @submit.prevent="submitSurvey" class="space-y-10 bg-white p-8 rounded-xl shadow">

        <!-- INFO -->
        <div class="bg-gray-50 p-6 rounded-lg">
          <h3 class="font-semibold mb-4">Informasi Pengisi</h3>

          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Instansi</label>
              <select v-model="form.instansiId" class="input" required>
                <option value="">Pilih Instansi</option>
                <option v-for="instansi in instansiList" :key="instansi.id" :value="instansi.id">
                  {{ instansi.nama_instansi }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nama Pengisi</label>
              <input v-model="form.pengisi" type="text" placeholder="Nama lengkap" class="input" required />
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">Jabatan</label>
              <input v-model="form.jabatanPengisi" type="text" placeholder="Jabatan dalam instansi" class="input" required />
            </div>
          </div>
        </div>

        <!-- SURVEY -->
        <div v-for="component in surveyData" :key="component.id" class="space-y-6">
          <div class="bg-blue-50 p-4 rounded-lg">
            <h2 class="text-xl font-bold text-blue-800">
              {{ component.kode }}. {{ component.nama }}
            </h2>
            <p v-if="component.deskripsi" class="text-blue-600 text-sm mt-1">{{ component.deskripsi }}</p>
          </div>

          <div
            v-for="indicator in component.indicators"
            :key="indicator.id"
            class="border p-5 rounded-lg hover:shadow-md transition-shadow"
          >
            <div class="flex items-start gap-3">
              <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium flex-shrink-0">
                {{ indicator.kode }}
              </span>
              <div class="flex-1">
                <p class="font-medium mb-4 text-gray-800">
                  {{ indicator.pertanyaan }}
                </p>

                <div class="flex flex-col gap-3">
                  <label v-for="option in indicator.options" :key="option.id" class="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      :name="`indicator-${indicator.id}`"
                      :value="option.skor"
                      v-model="answers[indicator.id]"
                      required
                      class="text-blue-600 focus:ring-blue-500"
                    />
                    <span class="text-sm">{{ option.skor }} - {{ option.label }}</span>
                  </label>
                </div>

                <div class="mt-3">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Catatan (Opsional)</label>
                  <textarea
                    v-model="notes[indicator.id]"
                    placeholder="Tambahkan catatan jika diperlukan..."
                    class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                    rows="2"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- VALIDATION -->
        <div v-if="!isFormValid" class="bg-red-50 border border-red-200 p-4 rounded-lg">
          <p class="text-red-800 text-sm">
            ⚠️ Mohon lengkapi semua pertanyaan sebelum mengirim survey.
          </p>
        </div>

        <!-- ACTION -->
        <div class="flex justify-end gap-4 pt-6 border-t">
          <button type="button" @click="resetSurvey" class="btn-secondary" :disabled="isSubmitting">
            Reset
          </button>
          <button type="submit" :disabled="isSubmitting || !isFormValid" class="btn-primary">
            <span v-if="isSubmitting" class="flex items-center gap-2">
              <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Mengirim...
            </span>
            <span v-else>Kirim Survey</span>
          </button>
        </div>

      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { toast } from 'vue-sonner'

interface Periode {
  id: number
  tahun: string
  is_active?: boolean
  created_at?: string | null
}

interface Instansi {
  id: number
  nama_instansi: string
}

interface Indicator {
  id: number
  kode: string | null
  pertanyaan: string
  options?: Option[]
}

interface Option {
  id: number
  skor: number
  label: string
  urutan: number
  indicatorId: number
}

interface Component {
  id: number
  kode: string
  nama: string
  deskripsi?: string | null
  indicators: Indicator[]
}

const isLoading = ref(true)
const error = ref('')
const surveyData = ref<Component[] | null>(null)
const activePeriode = ref<Periode | null>(null)
const instansiList = ref<Instansi[]>([])

const isSubmitting = ref(false)

const form = ref({
  instansiId: '',
  pengisi: '',
  jabatanPengisi: ''
})

const answers = ref<Record<number, number>>({})
const notes = ref<Record<number, string>>({})

// Computed properties
const isFormValid = computed(() => {
  if (!surveyData.value) return false

  const totalQuestions = surveyData.value.reduce((total: number, component: any) =>
    total + component.indicators.length, 0)

  const answeredQuestions = Object.keys(answers.value).length

  return answeredQuestions === totalQuestions && form.value.instansiId && form.value.pengisi && form.value.jabatanPengisi
})

// Methods
const loadSurvey = async () => {
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

    // Load survey structure
    const surveyRes = await $fetch('/api/survey/structure')
    if (surveyRes.success) {
      surveyData.value = Array.isArray(surveyRes.data)
        ? surveyRes.data.map((component: any) => ({
            id: component.id,
            kode: component.kode ?? '',
            nama: component.nama ?? '',
            deskripsi: component.deskripsi ?? null,
            indicators: Array.isArray(component.indicators)
              ? component.indicators.map((indicator: any) => ({
                  id: indicator.id,
                  kode: indicator.kode ?? '',
                  pertanyaan: indicator.pertanyaan ?? '',
                  options: Array.isArray(indicator.options)
                    ? indicator.options.map((option: any) => ({
                        id: option.id,
                        skor: option.skor ?? 0,
                        label: option.label ?? '',
                        urutan: option.urutan ?? 0,
                        indicatorId: option.indicatorId ?? indicator.id
                      }))
                    : []
                }))
              : []
          }))
        : null
      // Ensure each indicator has options, fallback if not
      surveyData.value?.forEach(component => {
        component.indicators.forEach(indicator => {
          if (!indicator.options || indicator.options.length === 0) {
            indicator.options = [
              { id: 1, skor: 1, label: 'Sangat Rendah', urutan: 1, indicatorId: indicator.id },
              { id: 2, skor: 2, label: 'Rendah', urutan: 2, indicatorId: indicator.id },
              { id: 3, skor: 3, label: 'Tinggi', urutan: 3, indicatorId: indicator.id },
              { id: 4, skor: 4, label: 'Sangat Tinggi', urutan: 4, indicatorId: indicator.id }
            ]
          }
        })
      })
    }

    // Load instansi list
    const instansiRes = await $fetch('/api/instansi')
    if (instansiRes.success) {
      instansiList.value = Array.isArray(instansiRes.data) 
        ? instansiRes.data.map((item: any) => ({
            id: item.id,
            nama_instansi: item.agency_name || item.nama_instansi || ''
          }))
        : []
    }

  } catch (err: any) {
    error.value = err.message || 'Gagal memuat data survey'
    console.error('Load survey error:', err)
  } finally {
    isLoading.value = false
  }
}

const resetSurvey = () => {
  form.value = { instansiId: '', pengisi: '', jabatanPengisi: '' }
  answers.value = {}
  notes.value = {}
}

const submitSurvey = async () => {
  if (!isFormValid.value || !activePeriode.value) return

  isSubmitting.value = true

  try {
    const details = Object.entries(answers.value).map(([indicatorId, skor]) => ({
      indicatorId: Number(indicatorId),
      skor,
      catatan: notes.value[Number(indicatorId)] || ''
    }))

    await $fetch('/api/survey/submit', {
      method: 'POST',
      body: {
        instansiId: Number(form.value.instansiId),
        periodeId: activePeriode.value.id,
        pengisi: form.value.pengisi,
        jabatanPengisi: form.value.jabatanPengisi,
        details
      }
    })

    toast.success('Survey berhasil dikirim! Terima kasih atas partisipasi Anda.')
    resetSurvey()

  } catch (err: any) {
    console.error('Submit survey error:', err)
    toast.error(err.message || 'Gagal mengirim survey. Silakan coba lagi.')
  } finally {
    isSubmitting.value = false
  }
}

// Lifecycle
onMounted(() => {
  loadSurvey()
})

useHead({
  title: 'Survey Kesiapan Inovasi - INOLAND'
})
</script>

<style scoped lang="postcss">
.input {
  @apply w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors;
}

.btn-primary {
  @apply px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium;
}

.btn-secondary {
  @apply px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium;
}

/* Radio button styling */
input[type="radio"] {
  @apply w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2;
}

input[type="radio"]:checked {
  @apply bg-blue-600 border-blue-500;
}

/* Custom scrollbar for textarea */
textarea {
  resize: vertical;
  min-height: 60px;
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

/* Hover effects */
.border:hover {
  @apply border-blue-300;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .grid-cols-2.md\:grid-cols-4 {
    grid-template-columns: repeat(2, 1fr);
  }

  .md\:col-span-2 {
    grid-column: span 2;
  }
}
</style>
