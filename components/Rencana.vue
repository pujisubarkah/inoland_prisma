<template>
  <div class="p-5">
    <h1 class="text-center text-3xl font-bold mb-5">FORM RENCANA AKSI INOVASI</h1>
    <form @submit.prevent="handleSubmit">
      <div class="flex flex-col gap-4 mb-5">
        <InputField label="Nama OPD" v-model="formData.opdName" />
        <InputField label="Contact Person" v-model="formData.contactPerson" />
        <InputField label="Telp/HP" v-model="formData.phone" />
        <InputField label="Email OPD" v-model="formData.email" type="email" />
        <InputField label="Judul Inovasi" v-model="formData.innovationTitle" />
      </div>

      <div class="flex justify-end mb-5">
        <button type="submit" class="bg-blue-800 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded flex items-center gap-2">
          <PaperAirplaneIcon class="w-5 h-5 inline-block" /> Kirim
        </button>
      </div>

      <div class="space-y-4">
        <h2 class="text-xl font-medium">Persiapan</h2>
        <button type="button" @click="showModal = true" class="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-500">
          Tambah Kegiatan
        </button>
        <div class="overflow-x-auto mt-4">
          <table class="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th class="px-4 py-2 border">Kegiatan</th>
                <th class="px-4 py-2 border">Pelaksana</th>
                <th class="px-4 py-2 border">Output</th>
                <th class="px-4 py-2 border">Metode</th>
                <th class="px-4 py-2 border">Timeline (Jan-Des)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(activity, index) in formData.activities.preparation" :key="index" class="text-center">
                <td class="border p-2">{{ activity.activity }}</td>
                <td class="border p-2">{{ activity.executor }}</td>
                <td class="border p-2">{{ activity.output }}</td>
                <td class="border p-2">{{ activity.method }}</td>
                <td class="border p-2">
                  <input type="checkbox" v-for="(checked, month) in activity.timeline" :key="month" class="mr-1"
                    :checked="checked" @change="toggleTimeline('preparation', index, month)" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </form>

    <!-- Modal -->
    <Dialog v-model:open="showModal">
      <template #content>
        <div class="dialog-content">
          <h2 class="text-xl font-bold mb-4">Tambah Kegiatan</h2>
          <div class="flex flex-col gap-2">
            <label>Phase</label>
            <select v-model="newActivity.phase" class="border p-2 rounded">
              <option value="preparation">Persiapan</option>
              <option value="implementation">Pelaksanaan</option>
              <option value="monitoring">Monitoring</option>
              <option value="evaluation">Evaluasi</option>
            </select>
            <input type="text" placeholder="Kegiatan" v-model="newActivity.activity" class="border p-2 rounded" />
            <input type="text" placeholder="Pelaksana" v-model="newActivity.executor" class="border p-2 rounded" />
            <input type="text" placeholder="Output" v-model="newActivity.output" class="border p-2 rounded" />
            <input type="text" placeholder="Metode" v-model="newActivity.method" class="border p-2 rounded" />

            <div>
              <p class="mb-2 font-semibold">Timeline (Centang bulan pelaksanaan)</p>
              <div class="grid grid-cols-6 gap-1">
                <label v-for="(checked, idx) in newActivity.timeline" :key="idx" class="flex items-center space-x-1 text-sm">
                  <input type="checkbox" :checked="checked" @change="toggleNewTimeline(idx)" />
                  <span>{{ idx + 1 }}</span>
                </label>
              </div>
            </div>
          </div>
          <div class="flex justify-end gap-2 mt-4">
            <button @click="showModal = false" class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-400">Batal</button>
            <button type="button" @click="saveNewActivity" class="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-500">Simpan</button>
          </div>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { PaperAirplaneIcon } from '@heroicons/vue/24/outline'
import Dialog from '@/components/ui/dialog/Dialog.vue'
import InputField from '@/components/InputField.vue'



const showModal = ref(false)

const formData = reactive({
  opdName: '',
  contactPerson: '',
  phone: '',
  email: '',
  innovationTitle: '',
  activities: {
    preparation: [],
    implementation: [],
    monitoring: [],
    evaluation: []
  }
})

const newActivity = reactive({
  phase: 'preparation',
  activity: '',
  executor: '',
  output: '',
  method: '',
  timeline: Array(12).fill(false)
})

function handleSubmit() {
  // Validasi sebelum submit
  if (!formData.opdName || !formData.contactPerson || !formData.phone || !formData.email || !formData.innovationTitle) {
    alert('Lengkapi semua data utama!')
    return
  }
  console.log(formData)
}

function toggleTimeline(phase, index, month) {
  formData.activities[phase][index].timeline[month] = !formData.activities[phase][index].timeline[month]
}

function toggleNewTimeline(month) {
  newActivity.timeline[month] = !newActivity.timeline[month]
}

function saveNewActivity() {
  if (!newActivity.activity || !newActivity.executor || !newActivity.output || !newActivity.method) {
    alert('Lengkapi semua data kegiatan!')
    return
  }
  formData.activities[newActivity.phase].push({
    activity: newActivity.activity,
    executor: newActivity.executor,
    output: newActivity.output,
    method: newActivity.method,
    timeline: [...newActivity.timeline]
  })
  newActivity.phase = 'preparation'
  newActivity.activity = ''
  newActivity.executor = ''
  newActivity.output = ''
  newActivity.method = ''
  newActivity.timeline = Array(12).fill(false)
  showModal.value = false
}
</script>

<style scoped>
.dialog-content {
  background: rgba(255,255,255,0.92);
  backdrop-filter: blur(10px) saturate(160%);
  box-shadow: 0 8px 32px rgba(60,130,246,0.18), 0 2px 8px rgba(0,0,0,0.10);
  border-radius: 18px;
  padding: 32px 24px 24px 24px;
  width: 100%;
  max-width: 420px;
  animation: dialogFadeIn 0.35s cubic-bezier(.4,2,.3,1);
  border: 2px solid #3b82f6;
  transition: box-shadow 0.2s, border 0.2s;
}

@keyframes dialogFadeIn {
  from { opacity: 0; transform: translateY(40px) scale(0.96);}
  to   { opacity: 1; transform: translateY(0) scale(1);}
}

.dialog-content h2 {
  text-align: center;
  font-size: 1.35rem;
  font-weight: 700;
  color: #2563eb;
  margin-bottom: 18px;
  letter-spacing: 0.5px;
}

.dialog-content label {
  font-weight: 500;
  color: #2563eb;
  margin-bottom: 2px;
}

.dialog-content select,
.dialog-content input[type="text"] {
  background: #f8fafc;
  border: 1.5px solid #3b82f6;
  font-size: 1rem;
  padding: 8px 12px;
  border-radius: 8px;
  margin-bottom: 8px;
  transition: border 0.2s;
}

.dialog-content select:focus,
.dialog-content input[type="text"]:focus {
  border-color: #2563eb;
  outline: none;
}

.dialog-content .grid label {
  background: #f1f5f9;
  border-radius: 6px;
  padding: 2px 6px;
  margin-bottom: 2px;
}

.dialog-content .flex.justify-end button {
  min-width: 90px;
  font-weight: 600;
  font-size: 1rem;
  box-shadow: 0 2px 8px rgba(60,130,246,0.08);
}

.dialog-content .flex.justify-end button:last-child {
  background: linear-gradient(90deg, #2563eb 0%, #38bdf8 100%);
  border: none;
}

.dialog-content .flex.justify-end button:last-child:hover {
  background: linear-gradient(90deg, #38bdf8 0%, #2563eb 100%);
}

@media (max-width: 500px) {
  .dialog-content {
    max-width: 98vw;
    padding: 18px 8px 12px 8px;
  }
}
</style>
