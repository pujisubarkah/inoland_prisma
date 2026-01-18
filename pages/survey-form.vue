<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-10 px-4">
    <div class="max-w-4xl mx-auto">

      <!-- HEADER -->
      <div class="flex justify-between items-center mb-10">
        <button @click="navigateTo('/survey-kesiapan-inovasi')" class="btn-secondary flex items-center gap-2">
          ← Kembali
        </button>
        <div class="text-center flex-1">
          <h1 class="text-3xl font-bold text-blue-800">
            Survey Kesiapan Inovasivasi
          </h1>
          <p class="text-blue-600 mt-1">
            Self-Assessment Ekosistem Inovasi Instansi
          </p>
          <p v-if="activePeriode" class="text-sm text-gray-600 mt-1">
            Periode {{ activePeriode.tahun }}
          </p>
        </div>
        <div class="w-20"></div> <!-- Spacer untuk balance -->
      </div>

      <!-- LOADING -->
      <div v-if="isLoading" class="text-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p class="mt-4 text-gray-600">Memuat survey…</p>
      </div>

      <!-- ERROR -->
      <div v-else-if="error" class="text-center py-20 text-red-600">
        <div class="text-red-500 text-6xl mb-4">⚠️</div>
        <h3 class="text-xl font-semibold text-gray-800 mb-2">Terjadi Kesalahan</h3>
        <p class="text-gray-600">{{ error }}</p>
      </div>
      <!-- SURVEY -->
      <form v-else @submit.prevent="submitSurvey" class="bg-white p-8 rounded-xl shadow space-y-10">
        <!-- PROGRESS -->
        <div>
          <div class="flex justify-between text-xs text-gray-500 mb-2">
            <span>Langkah {{ currentStep + 1 }} dari {{ totalSteps }}</span>
            <span>{{ progressPercent }}%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div
              class="bg-blue-600 h-2 rounded-full transition-all duration-300"
              :style="{ width: progressPercent + '%' }"
            ></div>
          </div>
        </div>

        <!-- INFO (STEP 1) -->
        <div v-if="currentStep === 0" class="bg-gray-50 p-6 rounded-lg space-y-4">
          <h3 class="font-semibold text-gray-800">Informasi Pengisi</h3>
          <select v-model="form.instansiId" class="input" required>
            <option value="">Pilih Instansi</option>
            <option v-for="i in instansiList" :key="i.id" :value="i.id">
              {{ i.nama_instansi }}
            </option>
          </select>

          <input v-model="form.pengisi" class="input" placeholder="Nama Pengisi" required />
          <input v-model="form.jabatanPengisi" class="input" placeholder="Jabatan" required />
        </div>

        <!-- COMPONENT -->
        <div v-if="currentComponent" class="space-y-6">

          <div class="component-header">
            <h2 class="component-title">
              {{ currentComponent.kode }}. {{ currentComponent.nama }}
            </h2>
            <p v-if="currentComponent.deskripsi" class="component-desc">
              {{ currentComponent.deskripsi }}
            </p>
          </div>

          <!-- INDICATORS -->
          <div
            v-for="indicator in currentComponent.indicators"
            :key="indicator.id"
            class="border rounded-xl p-5 space-y-4"
          >
            <p class="font-medium text-gray-800">
              {{ indicator.pertanyaan }}
            </p>

            <!-- OPTIONS -->
            <div class="space-y-3">
              <label
                v-for="option in indicator.options"
                :key="option.id"
                class="flex items-center gap-4 p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all"
                :class="answers[indicator.id] === option.skor ? 'border-blue-600 bg-blue-50' : ''"
              >
                <input
                  type="radio"
                  :name="`indicator-${indicator.id}`"
                  :value="option.skor"
                  v-model="answers[indicator.id]"
                  required
                  class="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <div class="flex items-center gap-4">
                  <div class="score-badge">
                    {{ option.skor }}
                  </div>
                  <p class="option-label">
                    {{ option.label }}
                  </p>
                </div>
              </label>
            </div>

            <!-- NOTE -->
            <textarea
              v-model="notes[indicator.id]"
              rows="2"
              class="input"
              placeholder="Catatan (opsional)"
            />
          </div>
        </div>

        <!-- VALIDATION -->
        <div v-if="!isStepValid" class="bg-red-50 border border-red-200 p-4 rounded-lg">
          <p class="text-red-700 text-sm">
            Mohon lengkapi semua pertanyaan pada langkah ini.
          </p>
        </div>

        <!-- NAVIGATION -->
        <div class="flex justify-between pt-8 border-t">
          <button
            type="button"
            @click="prevStep"
            :disabled="currentStep === 0"
            class="btn-secondary"
          >
            ← Sebelumnya
          </button>
          <button
            v-if="currentStep < totalSteps - 1"
            type="button"
            @click="nextStep"
            :disabled="!isStepValid"
            class="btn-primary"
          >
            Lanjut →
          </button>
          <button
            v-else
            type="submit"
            :disabled="!isFormValid || isSubmitting"
            class="btn-primary"
          >
            {{ isSubmitting ? 'Mengirim…' : 'Kirim Survey' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { toast } from 'vue-sonner'
import { useCurrentUser } from '~/composables/useCurrentUser'  // Tambahkan import ini

interface Periode {
  id: number
  tahun: string
  created_at?: string | null
}

interface Component {
  id: number
  kode: string
  nama: string
  deskripsi?: string
  indicators: {
    id: number
    pertanyaan: string
    options: {
      id: number
      skor: number
      label: string
      urutan?: number
      indicatorId?: number
    }[]
  }[]
}

const isLoading = ref(true)
const error = ref('')
const surveyData = ref<Component[] | null>(null)
const instansiList = ref<any[]>([])
const activePeriode = ref<Periode | null>(null)
const isSubmitting = ref(false)
const form = ref({
  instansiId: '',
  pengisi: '',
  jabatanPengisi: ''
})
const answers = ref<Record<number, number>>({})
const notes = ref<Record<number, string>>({})
const currentStep = ref(0)

const { user } = useCurrentUser()  // Tambahkan ini untuk akses data user

const totalSteps = computed(() => surveyData.value?.length || 0)
const currentComponent = computed(() => surveyData.value?.[currentStep.value] || null)
const progressPercent = computed(() => {
  if (!surveyData.value) return 0
  return Math.round(((currentStep.value + 1) / totalSteps.value) * 100)
})
const isStepValid = computed(() => {
  if (currentStep.value === 0) {
    // Validasi untuk langkah informasi pengisi
    return form.value.instansiId && form.value.pengisi && form.value.jabatanPengisi
  }
  if (!currentComponent.value) return false
  // Validasi untuk langkah komponen
  return currentComponent.value.indicators.every(
    (indicator) => answers.value[indicator.id] !== undefined
  )
})
const isFormValid = computed(() => {
  const totalIndicators = surveyData.value?.reduce((total, component) => total + component.indicators.length, 0) || 0
  const answeredIndicators = Object.keys(answers.value).length
  return (
    answeredIndicators === totalIndicators &&
    form.value.instansiId &&
    form.value.pengisi &&
    form.value.jabatanPengisi
  )
})

const loadSurvey = async () => {
  try {
    isLoading.value = true
    error.value = ''
    
    // Auto-fill informasi pengisi dari data user
    if (user.value) {
      form.value.pengisi = user.value.nama_lengkap || ''
      form.value.jabatanPengisi = ''  // Kosongkan jabatan, biar user isi manual
      form.value.instansiId = user.value.instansi_id || ''  // Set instansi dari user
    }
    
    const surveyRes: any = await $fetch('/api/survey/structure')
    surveyData.value = surveyRes.data.map((component: any) => ({
      id: component.id,
      kode: component.kode,
      nama: component.nama,
      deskripsi: component.deskripsi,
      indicators: component.indicators.map((indicator: any) => ({
        id: indicator.id,
        pertanyaan: indicator.pertanyaan,
        options: Array.isArray(indicator.options)
          ? indicator.options.map((option: any) => ({
              id: option.id,
              skor: option.skor ?? 0,
              label: option.label,
              urutan: option.urutan ?? 0,
              indicatorId: option.indicatorId ?? indicator.id
            }))
          : []
      }))
    }))
    const instansiRes: any = await $fetch('/api/instansi')
    if (instansiRes.success) {
      instansiList.value = Array.isArray(instansiRes.data)
        ? instansiRes.data.map((item: any) => ({
            id: item.id,
            nama_instansi: item.agency_name || item.nama_instansi || ''
          }))
        : []
    }
    const periodeRes: any = await $fetch('/api/survey_periode/active')
    if (periodeRes.data) {
      activePeriode.value = {
        id: periodeRes.data.id,
        tahun: periodeRes.data.tahun,
        created_at: periodeRes.data.created_at
      }
    }
  } catch (err: any) {
    console.error(err)
    error.value = 'Gagal memuat data'
  } finally {
    isLoading.value = false
  }
}

const nextStep = () => {
  if (isStepValid.value && currentStep.value < totalSteps.value - 1) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

const submitSurvey = async () => {
  if (!activePeriode.value) return
  isSubmitting.value = true
  try {
    const details = Object.entries(answers.value).map(([indicatorId, skor]) => ({
      indicatorId: Number(indicatorId),
      skor,
      catatan: notes.value[Number(indicatorId)] || ''
    }))
    await $fetch('/api/survey_response', {
      method: 'POST',
      body: {
        instansiId: Number(form.value.instansiId),
        periodeId: activePeriode.value.id,
        pengisi: form.value.pengisi,
        jabatanPengisi: form.value.jabatanPengisi,
        details
      }
    })
    toast.success('🎉 Survey Berhasil Dikirim!', {
      description: 'Terima kasih atas partisipasi Anda dalam meningkatkan ekosistem inovasi instansi.',
      action: {
        label: 'Lihat Hasil',
        onClick: () => navigateTo('/survey-kesiapan-inovasi'),
      },
    })
    // Reset or redirect
  } catch (err: any) {
    console.error('Submit survey error:', err)
    toast.error(err.message || 'Gagal mengirim survey. Silakan coba lagi.')
  } finally {
    isSubmitting.value = false
  }
}

onMounted(loadSurvey)
</script>

<style scoped lang="postcss">
.input {
  @apply w-full px-4 py-3 border border-gray-300 rounded-lg
         focus:ring-2 focus:ring-blue-500 focus:border-blue-500;
}
.btn-primary {
  @apply px-6 py-3 bg-blue-600 text-white rounded-lg
         hover:bg-blue-700 disabled:opacity-50;
}
.btn-secondary {
  @apply px-6 py-3 border border-gray-300 rounded-lg
         hover:bg-gray-50 disabled:opacity-50;
}
.component-header {
  @apply bg-gradient-to-r from-blue-600 to-blue-700
         text-white p-5 rounded-xl shadow;
}
.component-title {
  @apply text-xl font-bold;
}
.component-desc {
  @apply text-sm text-blue-100 mt-1;
}
.option-card {
  @apply border border-gray-200 rounded-xl p-4 cursor-pointer
         hover:border-blue-400 hover:shadow-md transition-all bg-white;
}
.option-card-active {
  @apply border-blue-600 bg-blue-50 shadow-md;
}
.score-badge {
  @apply w-10 h-10 rounded-full bg-blue-600 text-white
         flex items-center justify-center font-bold text-lg;
}
.option-label {
  @apply text-sm text-gray-700 leading-relaxed;
}
</style>
