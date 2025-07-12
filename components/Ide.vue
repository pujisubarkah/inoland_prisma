<template>
  <div class="w-full px-5 py-10">
    <!-- ShadCN stepper -->
    <Stepper-root value="step{{activeStep}}">
      <Stepper-navigation>
        <div v-for="(s, idx) in steps" :key="idx" class="stepper-step">
          <Stepper-step value="step{{idx}}" :class="{'step-active': activeStep === idx}">
            <Stepper-step-indicator />
            <Stepper-step-title>{{ s }}</Stepper-step-title>
          </Stepper-step>
          <Stepper-line v-if="idx < steps.length -1" />
        </div>
      </Stepper-navigation>
    </Stepper-root>

    <form @submit.prevent="handleSubmit">
      <div class="mt-6">
        <ContactInformation
          v-if="activeStep === 0"
          :formData="formData"
          @update:formData="updateFormData"
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
import {
  StepperRoot as StepperRoot, StepperNavigation, StepperStep, StepperStepIndicator,
  StepperStepTitle, StepperLine
} from '@/components/ui/stepper';
import { Button } from '@/components/ui/button';
import ContactInformation from './ContactInformation.vue';
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

function updateFormData(newData) {
  Object.assign(formData, newData);
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
.stepper-step {
  display: flex;
  align-items: center;
}
.step-active .stepper-step-indicator {
  background-color: #2563eb;
  border-color: #2563eb;
  color: #fff;
}
/* Tentukan style ShadCN sesuai desain tema kamu */
</style>
