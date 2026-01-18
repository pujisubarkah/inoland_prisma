<template>
  <div>
    <div
      v-for="field in fields"
      :key="field"
      class="border border-black rounded-lg mt-4 p-4"
    >
      <!-- Judul -->
      <div class="bg-[#16578D] p-2 text-center text-white font-bold rounded-t-lg">
        {{ formatField(field) }}
      </div>

      <!-- Input shadcn jika tipe field input -->
      <Input
        v-if="isInputField(field)"
        :name="field"
        :placeholder="'Masukkan ' + formatField(field)"
        v-model="localFormData[field]"
        @input="(e) => emitHandleChange(e, field)"
        :class="[
          'w-full mt-2 rounded-b-lg',
          getBgColor(localFormData.status)
        ]"
      />

      <!-- Textarea shadcn jika tipe field textarea -->
      <Textarea
        v-else
        :name="field"
        :placeholder="'Tuliskan ' + formatField(field)"
        v-model="localFormData[field]"
        @input="(e) => emitHandleChange(e, field)"
        :class="[
          'w-full mt-2 rounded-b-lg',
          getBgColor(localFormData.status)
        ]"
        rows="4"
      />

      <!-- Approval Section -->
      <div class="flex items-center justify-between mt-2">
        <input
          type="checkbox"
          class="w-6 h-6 cursor-pointer"
          :checked="localFormData.status === 'Approved'"
          @change="() => emitHandleApproval(field)"
        />
        <Textarea
          placeholder="Tanggapan..."
          class="rounded w-2/3"
          rows="4"
          @blur="(e) => emitHandleComment(field, e.target.value)"
        />
      </div>
    </div>

    <!-- Tombol -->
    <div class="flex justify-end mt-4">
      <button
        class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-all"
        @click="nextStep"
      >
        Kembalikan
      </button>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'
import { Textarea } from '@/components/ui/_exports/textarea'
import { Input } from '@/components/ui/_exports/input' // pastikan path sesuai setup shadcn-vue

const props = defineProps({
  formData: {
    type: Object,
    default: () => ({}),
  },
  handleChange: Function,
  handleApproval: Function,
  handleComment: Function,
  nextStep: Function,
})

const fields = [
  'latarBelakang',
  'ideInovasi',
  'tujuanInovasi',
  'targetPerubahan',
  'stakeholderInovasi',
  'sumberDayaInovasi',
  'penerimaManfaat',
  'kebaruan',
  'deskripsiSingkat',
  'keterangan',
]

// Tentukan field mana yang pakai input
function isInputField(field) {
  // Contoh: hanya 'keterangan' pakai input, sisanya textarea
  return field === 'keterangan'
}

const localFormData = reactive({ ...props.formData })

watch(() => props.formData, (newVal) => {
  Object.assign(localFormData, newVal)
})

// === Helpers ===
const getBgColor = (status) => {
  return status === 'Draft' ? 'bg-red-200' : 'bg-white'
}

const formatField = (field) => {
  return field.toUpperCase().replace(/_/g, ' ')
}

// === Emit ke parent ===
const emitHandleChange = (e, field) => {
  if (props.handleChange) {
    const fakeEvent = {
      target: {
        name: field,
        value: e.target.value,
      },
    }
    props.handleChange(fakeEvent)
  }
}

const emitHandleApproval = (field) => {
  props.handleApproval?.(field)
}

const emitHandleComment = (field, comment) => {
  props.handleComment?.(field, comment)
}
</script>
