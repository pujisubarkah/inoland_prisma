<template>
  <div class="space-y-6 bg-gradient-to-br from-blue-700 via-blue-400 to-cyan-400 rounded-xl shadow-lg p-8">
    <!-- Nama OPD -->
    <div class="flex flex-col md:flex-row items-center gap-4">
      <Label class="w-full md:w-[220px] shrink-0 bg-white/80 text-blue-700 font-bold px-4 py-2 rounded-lg shadow border border-blue-300">
        Nama OPD
      </Label>
      <Input
        v-model="localFormData.namaOPD"
        name="namaOPD"
        class="w-full bg-white/90 border border-blue-300 rounded-lg px-4 py-2 text-blue-700 font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow"
        @input="emitHandleChange('namaOPD', localFormData.namaOPD)"
      />
    </div>

    <!-- Penanggung Jawab -->
    <div class="flex flex-col md:flex-row items-center gap-4">
      <Label class="w-full md:w-[220px] shrink-0 bg-white/80 text-blue-700 font-bold px-4 py-2 rounded-lg shadow border border-blue-300">
        Nama Penanggungjawab
      </Label>
      <Input
        v-model="localFormData.contactPerson"
        name="contactPerson"
        class="w-full bg-white/90 border border-blue-300 rounded-lg px-4 py-2 text-blue-700 font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow"
        @input="emitHandleChange('contactPerson', localFormData.contactPerson)"
      />
    </div>

    <!-- Nomor Telp/HP -->
    <div class="flex flex-col md:flex-row items-center gap-4">
      <Label class="w-full md:w-[220px] shrink-0 bg-white/80 text-blue-700 font-bold px-4 py-2 rounded-lg shadow border border-blue-300">
        Nomor Telp/HP
      </Label>
      <Input
        v-model="localFormData.telp"
        name="telp"
        class="w-full bg-white/90 border border-blue-300 rounded-lg px-4 py-2 text-blue-700 font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow"
        @input="emitHandleChange('telp', localFormData.telp)"
      />
    </div>

    <!-- Alamat Email -->
    <div class="flex flex-col md:flex-row items-center gap-4">
      <Label class="w-full md:w-[220px] shrink-0 bg-white/80 text-blue-700 font-bold px-4 py-2 rounded-lg shadow border border-blue-300">
        Alamat Email
      </Label>
      <Input
        v-model="localFormData.email"
        name="email"
        class="w-full bg-white/90 border border-blue-300 rounded-lg px-4 py-2 text-blue-700 font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow"
        @input="emitHandleChange('email', localFormData.email)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const props = defineProps({
  formData: Object,
  handleChange: Function,
  autoFill: {
    type: Boolean,
    default: false
  }
})

const localFormData = ref({ ...props.formData })

watch(
  () => props.formData,
  (newVal) => {
    localFormData.value = { ...newVal }
  }
)

const emitHandleChange = (field, value) => {
  props.handleChange?.({
    target: {
      name: field,
      value,
    },
  })
}

// Auto-fill data dari user_instansi jika enabled
const autoFillUserData = async () => {
  if (!props.autoFill) return;
  
  try {
    // Ambil user ID dari localStorage
    let userId = null;
    if (process.client) {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        const userData = JSON.parse(savedUser);
        userId = userData?.id;
      }
    }
    
    if (!userId) {
      console.log('No user ID found in localStorage for auto-fill');
      return;
    }
    
    console.log('Auto-filling data for user ID:', userId);
    
    // Fetch data dari API
    const response = await $fetch(`/api/user_instansi/me?user_id=${userId}`);
    console.log('Auto-fill response:', response);
    
    if (response && !response.error) {
      // Update local form data
      localFormData.value = {
        ...localFormData.value,
        namaOPD: response.nama_opd || '',
        contactPerson: response.contact_person || '',
        telp: response.telp || '',
        email: response.email || ''
      };
      
      // Emit changes untuk update parent component
      emitHandleChange('namaOPD', localFormData.value.namaOPD);
      emitHandleChange('contactPerson', localFormData.value.contactPerson);
      emitHandleChange('telp', localFormData.value.telp);
      emitHandleChange('email', localFormData.value.email);
      
      console.log('Auto-fill completed:', localFormData.value);
    }
  } catch (error) {
    console.error('Error auto-filling user data:', error);
  }
}

onMounted(() => {
  if (props.autoFill) {
    autoFillUserData();
  }
})
</script>
