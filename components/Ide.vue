<template>
  <div class="w-full px-5 py-10">
    <!-- Simple Stepper -->
    <div class="simple-stepper flex gap-4 mb-8 justify-center">
      <div
        v-for="(s, idx) in steps"
        :key="idx"
        class="stepper-step flex flex-col items-center"
      >
        <div
          class="stepper-circle"
          :class="{ 'active': activeStep === idx }"
        >{{ idx + 1 }}</div>
        <div
          class="stepper-label"
          :class="{ 'active-label': activeStep === idx }"
        >{{ s }}</div>
      </div>
    </div>

    <form @submit.prevent="handleSubmit">
      <div class="mt-6">
        <InputField
          v-if="activeStep === 0"
          :formData="formData"
          :handleChange="updateFormData"
          :autoFill="true"
        />
        <InnovationIdeaForm
          v-if="activeStep === 1"
          :formData="formData"
          @update:formData="updateFormData"
        />
        <InnovationResponseForm
          v-if="activeStep === 2 && roleId === 'admin'"
          :formData="formData"
          @update:formData="updateFormData"
        />
      </div>

      <div class="flex justify-end gap-2 mt-8">
        <Button variant="outline" :disabled="activeStep === 0" @click="handleBack">
          Sebelumnya
        </Button>
        <Button variant="primary" @click="handleNext"
                :disabled="activeStep === 2 && roleId !== 'admin'">
          {{ activeStep === steps.length - 1 ? 'Kirim' : 'Berikutnya' }}
        </Button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { Button } from '@/components/ui/button';
import InputField from './InputField.vue';
import InnovationIdeaForm from './InnovationIdeaForm.vue';
import InnovationResponseForm from './InnovationResponseForm.vue';

const steps = ['Informasi Kontak','Ide Inovasi','Tanggapan Ide Inovasi'];
const activeStep = ref(0);
const roleId = ref('user');

const formData = reactive({
  namaOPD: '',
  contactPerson: '',
  telp: '',
  email: '',
  latarBelakang: '',
  ideInovasi: '',
  stakeholderInovasi: '',
  sumberDaya: '',
  penerimaManfaat: '',
  deskripsiSingkat: '',
  keterangan: '',
});

function updateFormData(event) {
  if (event && event.target) {
    // Handle event dari InputField
    const { name, value } = event.target;
    formData[name] = value;
  } else {
    // Handle object langsung (untuk backward compatibility)
    Object.assign(formData, event);
  }
}

function handleNext() {
  if (activeStep.value < steps.length -1) activeStep.value++;
}

function handleBack() {
  if (activeStep.value > 0) activeStep.value--;
}

function handleSubmit(){
  console.log('Submitted data:', formData);
}
</script>

<style scoped>
/* Custom styles for the stepper can be added here if needed */
.stepper-step {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.stepper-circle {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e5e7eb;
  font-weight: bold;
}
.stepper-label {
  margin-top: 0.5rem;
  font-size: 0.875rem;
}
.stepper-line {
  position: absolute;
  width: 2px;
  height: calc(100% + 1rem);
  background-color: #e5e7eb;
  top: 2rem;
  left: calc(50% - 1px);
}
.active {
  background-color: #2563eb;
  color: #fff;
}
.active-label {
  font-weight: bold;
  color: #2563eb;
}
/* Tentukan style tambahan sesuai desain tema kamu */
</style>
