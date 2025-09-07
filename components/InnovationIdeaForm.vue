<template>
  <div ref="formRef" class="bg-gradient-to-br from-blue-700 via-blue-400 to-cyan-400 rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto">
    <!-- Latar Belakang -->
    <div class="border border-white/40 rounded-xl mt-4 bg-white/80 shadow-lg">
      <div class="bg-blue-700 p-3 text-center rounded-t-xl">
        <strong class="text-white text-xl tracking-wide">LATAR BELAKANG</strong><br>
        <span class="text-sm text-blue-100">(Masalah yang dihadapi...)</span>
      </div>
      <Label for="latarBelakang" class="block mt-3 text-blue-700 font-semibold px-6">Latar Belakang</Label>
      <Textarea
        id="latarBelakang"
        v-model="local.formData.latarBelakang"
        placeholder="Tuliskan Latar Belakang"
        rows="4"
        :class="['w-full mt-2 rounded-b-xl px-6 py-3 bg-white/90 border border-blue-300 text-blue-700 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-400', bgColor]"
      />
    </div>

    <!-- Ide Inovasi Terpilih -->
    <div class="border border-white/40 rounded-xl mt-6 bg-white/80 shadow-lg">
      <div class="bg-blue-600 p-3 text-center rounded-t-xl">
        <strong class="text-white text-xl tracking-wide">IDE INOVASI TERPILIH</strong>
      </div>
      <Label for="ideInovasi" class="block mt-3 text-blue-700 font-semibold px-6">Ide Inovasi Terpilih</Label>
      <Textarea
        id="ideInovasi"
        v-model="local.formData.ideInovasi"
        placeholder="Tuliskan Ide Inovasi"
        rows="4"
        :class="['w-full mt-2 rounded-b-xl px-6 py-3 bg-white/90 border border-blue-300 text-blue-700 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-400', bgColor]"
      />
    </div>

    <!-- Grid Tujuan & Target -->
    <div class="border border-white/40 rounded-xl mt-6 bg-white/80 shadow-lg grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <div class="bg-blue-600 p-3 text-center text-white font-bold rounded-t-xl">TUJUAN INOVASI</div>
        <Label for="tujuanInovasi" class="block mt-3 text-blue-700 font-semibold px-6">Tujuan Inovasi</Label>
        <Textarea
          id="tujuanInovasi"
          v-model="local.formData.tujuanInovasi"
          placeholder="Tuliskan Tujuan Inovasi"
          rows="4"
          :class="['w-full mt-2 rounded-b-xl px-6 py-3 bg-white/90 border border-blue-300 text-blue-700 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-400', bgColor]"
        />
      </div>
      <div>
        <div class="bg-blue-600 p-3 text-center text-white font-bold rounded-t-xl">TARGET PERUBAHAN</div>
        <Label for="targetPerubahan" class="block mt-3 text-blue-700 font-semibold px-6">Target Perubahan</Label>
        <Textarea
          id="targetPerubahan"
          v-model="local.formData.targetPerubahan"
          placeholder="Tuliskan Target Perubahan"
          rows="4"
          :class="['w-full mt-2 rounded-b-xl px-6 py-3 bg-white/90 border border-blue-300 text-blue-700 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-400', bgColor]"
        />
      </div>
    </div>

    <!-- Grid 4 kolom -->
    <div class="border border-white/40 rounded-xl mt-6 bg-white/80 shadow-lg grid grid-cols-1 md:grid-cols-4 gap-6">
      <div v-for="field in ['stakeholderInovasi','sumberDayaInovasi','penerimaManfaat','kebaruan']" :key="field">
        <div class="bg-blue-600 p-3 text-center text-white font-bold rounded-t-xl">
          {{ labels[field] }}
        </div>
        <Label :for="field" class="block mt-3 text-blue-700 font-semibold px-6">{{ labels[field] }}</Label>
        <Textarea
          :id="field"
          v-model="local.formData[field]"
          rows="4"
          :class="['w-full mt-2 rounded-b-xl px-6 py-3 bg-white/90 border border-blue-300 text-blue-700 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-400', bgColor]"
          :placeholder="'Tuliskan ' + labels[field]"
        />
      </div>
    </div>

    <!-- Deskripsi Singkat -->
    <div class="border border-white/40 rounded-xl mt-6 bg-white/80 shadow-lg">
      <div class="bg-blue-600 p-3 text-center rounded-t-xl">
        <strong class="text-white text-xl">DESKRIPSI SINGKAT INOVASI</strong>
      </div>
      <Label for="deskripsiSingkat" class="block mt-3 text-blue-700 font-semibold px-6">Deskripsi Singkat Inovasi</Label>
      <Textarea
        id="deskripsiSingkat"
        v-model="local.formData.deskripsiSingkat"
        rows="4"
        :class="['w-full mt-2 rounded-b-xl px-6 py-3 bg-white/90 border border-blue-300 text-blue-700 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-400', bgColor]"
        placeholder="Penjelasan singkat..."
      />
    </div>

    <!-- Keterangan -->
    <div class="border border-white/40 rounded-xl mt-6 bg-white/80 shadow-lg">
      <div class="bg-blue-600 p-3 text-center rounded-t-xl">
        <strong class="text-white text-xl">KETERANGAN</strong>
      </div>
      <Label for="keterangan" class="block mt-3 text-blue-700 font-semibold px-6">Keterangan</Label>
      <Textarea
        id="keterangan"
        v-model="local.formData.keterangan"
        rows="4"
        :class="['w-full mt-2 rounded-b-xl px-6 py-3 bg-white/90 border border-blue-300 text-blue-700 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-400', bgColor]"
        placeholder="Waktu Pelaksanaan..."
      />
    </div>

    <!-- Tombol Kirim & Download -->
    <div class="flex flex-col md:flex-row justify-end mt-8 gap-4">
      <Button class="bg-green-600 text-white px-8 py-3 rounded-xl font-bold shadow hover:bg-green-700 transition"
              @click="submitIdea" :disabled="loading">
        <span v-if="loading">Mengirim...</span>
        <span v-else>Kirim & Lanjut</span>
      </Button>
      <Button class="bg-blue-700 text-white px-8 py-3 rounded-xl font-bold shadow hover:bg-blue-800 transition"
              @click="generatePDF">
        Download PDF
      </Button>
    </div>
    <div v-if="error" class="mt-4 text-red-600 font-semibold">{{ error }}</div>
    <div v-if="success" class="mt-4 text-green-600 font-semibold">Ide inovasi berhasil dikirim!</div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import html2canvas from 'html2canvas'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

const props = defineProps({
  formData: Object,
  nextStep: Function
})
const emit = defineEmits(['update:formData'])

const local = reactive({ formData: { ...props.formData } })
const formRef = ref(null)

const labels = {
  stakeholderInovasi: 'Stakeholder Inovasi',
  sumberDayaInovasi: 'Sumber Daya Inovasi',
  penerimaManfaat: 'Penerima Manfaat',
  kebaruan: 'Kebaruan'
}

const bgColor = computed(() => local.formData.status === 'Draft' ? 'bg-red-200' : 'bg-white')

const loading = ref(false)
const error = ref('')
const success = ref(false)

const generatePDF = () => {
  if (!formRef.value) return
  html2canvas(formRef.value, { scale: 2 }).then(canvas => {
    const imgData = canvas.toDataURL('image/png')
    const pdf = new window.jspdf.jsPDF('p','mm','a4')
    const imgW = 190
    const imgH = (canvas.height * imgW) / canvas.width
    pdf.addImage(imgData, 'PNG', 10, 10, imgW, imgH)
    pdf.save('InnovationForm.pdf')
  })
}

async function submitIdea() {
  loading.value = true
  error.value = ''
  success.value = false
  try {
    const res = await fetch('/api/ide_inovasi', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(local.formData),
    })
    if (!res.ok) throw new Error('Gagal mengirim ide inovasi')
    success.value = true
    emit('update:formData', local.formData)
    props.nextStep()
  } catch (e) {
    error.value = e.message || 'Terjadi kesalahan'
  } finally {
    loading.value = false
  }
}

const onNext = () => {
  emit('update:formData', local.formData)
  props.nextStep()
}
</script>

<style>
.loader {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
