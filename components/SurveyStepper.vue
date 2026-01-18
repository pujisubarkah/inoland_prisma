<template>
  <div class="bg-white p-8 rounded-xl shadow">
    <!-- STEPPER INDICATOR -->
    <div class="flex justify-center mb-8">
      <div class="flex items-center space-x-4">
        <div
          v-for="(component, index) in surveyData"
          :key="component.id"
          class="flex items-center"
        >
          <div
            :class="[
              'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors',
              index === currentStep ? 'bg-blue-600 text-white' : index < currentStep ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'
            ]"
          >
            {{ index + 1 }}
          </div>
          <span v-if="index < surveyData.length - 1" class="w-8 h-1 bg-gray-300 mx-2"></span>
        </div>
      </div>
    </div>

    <!-- INFO (Hanya di Step Pertama) -->
    <div v-if="currentStep === 0" class="bg-gray-50 p-6 rounded-lg mb-8">
      <h3 class="font-semibold mb-4">Informasi Pengisi</h3>
      <div class="grid md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Instansi</label>
          <select
            :value="form.instansiId"
            @change="emit('update:form', { ...form, instansiId: ($event.target as HTMLSelectElement)?.value ?? '' })"
            class="input"
            required
          >
            <option value="">Pilih Instansi</option>
            <option v-for="instansi in instansiList" :key="instansi.id" :value="instansi.id">
              {{ instansi.nama_instansi }}
            </option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nama Pengisi</label>
          <input :value="form.pengisi" @input="emit('update:form', { ...form, pengisi: ($event.target as HTMLInputElement).value })" type="text" placeholder="Nama lengkap" class="input" required />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Jabatan</label>
          <input :value="form.jabatanPengisi" @input="emit('update:form', { ...form, jabatanPengisi: ($event.target && ($event.target as HTMLInputElement).value) || '' })" type="text" placeholder="Jabatan dalam instansi" class="input" required />
        </div>
      </div>
    </div>

    <!-- CURRENT STEP COMPONENT -->
    <div v-if="currentComponent" class="space-y-6">
      <div class="bg-blue-50 p-4 rounded-lg">
        <h2 class="text-xl font-bold text-blue-800">
          {{ currentComponent.kode }}. {{ currentComponent.nama }}
        </h2>
        <p v-if="currentComponent.deskripsi" class="text-blue-600 text-sm mt-1">{{ currentComponent.deskripsi }}</p>
      </div>

      <div
        v-for="indicator in currentComponent.indicators"
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
                  :checked="answers[indicator.id] === option.skor"
                  @change="emit('update:answers', { ...answers, [indicator.id]: option.skor })"
                  required
                  class="text-blue-600 focus:ring-blue-500"
                />
                <span class="text-sm">{{ option.skor }} - {{ option.label }}</span>
              </label>
            </div>

            <div class="mt-3">
              <label class="block text-sm font-medium text-gray-700 mb-1">Catatan (Opsional)</label>
              <textarea
                :value="notes[indicator.id]"
                @input="emit('update:notes', { ...notes, [indicator.id]: ($event.target && ($event.target as HTMLTextAreaElement).value) || '' })"
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
    <div v-if="!isStepValid" class="bg-red-50 border border-red-200 p-4 rounded-lg mt-6">
      <p class="text-red-800 text-sm">
        ⚠️ Mohon lengkapi semua pertanyaan di langkah ini sebelum melanjutkan.
      </p>
    </div>

    <!-- NAVIGATION -->
    <div class="flex justify-between pt-6 border-t mt-8">
      <button
        type="button"
        @click="emit('prev')"
        :disabled="currentStep === 0"
        class="btn-secondary"
      >
        Previous
      </button>

      <div class="flex gap-4">
        <button
          v-if="currentStep < totalSteps - 1"
          type="button"
          @click="emit('next')"
          :disabled="!isStepValid"
          class="btn-primary"
        >
          Next
        </button>
        <button
          v-else
          type="button"
          @click="emit('submit')"
          :disabled="!isFormValid || isSubmitting"
          class="btn-primary"
        >
          <span v-if="isSubmitting" class="flex items-center gap-2">
            <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            Mengirim...
          </span>
          <span v-else>Kirim Survey</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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

const props = defineProps<{
  surveyData: Component[]
  currentStep: number
  form: { instansiId: string, pengisi: string, jabatanPengisi: string }
  answers: Record<number, number>
  notes: Record<number, string>
  isStepValid: boolean
  isFormValid: boolean
  isSubmitting: boolean
  instansiList: Instansi[]
  currentComponent: Component | null
  totalSteps: number
}>()

const emit = defineEmits<{
  'update:currentStep': [value: number]
  'update:form': [value: { instansiId: string, pengisi: string, jabatanPengisi: string }]
  'update:answers': [value: Record<number, number>]
  'update:notes': [value: Record<number, string>]
  next: []
  prev: []
  submit: []
}>()
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