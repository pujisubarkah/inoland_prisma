<template>
  <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="relative max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg w-full">
      <!-- Tombol Close -->
      <button
        @click="onClose"
        class="absolute top-2 right-4 text-4xl text-gray-700 hover:text-gray-900"
      >
        &times;
      </button>

      <div class="flex">
        <!-- Logo -->
        <div class="bg-transparent p-6 flex flex-col justify-center items-center w-1/3 rounded-l-lg">
          <img src="/ino.png" alt="Logo" class="w-32 h-auto mb-4" />
        </div>

        <!-- Form Login -->
        <div class="p-6 w-2/3">
          <form @submit.prevent="handleSubmit">
            <h2 class="text-2xl font-bold mb-4">Login</h2>

            <!-- Email -->
            <div class="mb-4">
              <label class="block text-gray-700">Email</label>
              <input
                v-model="email"
                type="email"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <!-- Password -->
            <div class="mb-4">
              <label class="block text-gray-700">Password</label>
              <input
                v-model="password"
                type="password"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <!-- Simple Captcha Replacement -->
            <div class="mb-4">
              <label class="block text-gray-700 mb-2">Verifikasi: {{ captchaQuestion }}</label>
              <input
                v-model="captchaAnswer"
                type="number"
                required
                placeholder="Masukkan jawaban"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <!-- Error Message -->
            <div v-if="error" class="mb-4 text-red-500">{{ error }}</div>

            <!-- Submit Button -->
            <button
              type="submit"
              class="w-full bg-[#3781c8] text-white py-2 rounded-md hover:bg-blue-800 transition duration-200"
            >
              Masuk
            </button>

            <!-- Daftar Link -->
            <p class="mt-4 text-sm text-gray-600">
              Belum punya akun?
              <button
                @click="openRegisterModal"
                type="button"
                class="text-blue-600 hover:underline ml-1 cursor-pointer"
              >
                Daftar di sini
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close'])

const email = ref('')
const password = ref('')
const error = ref(null)
const isRegisterOpen = ref(false)

// Simple Math Captcha
const num1 = ref(0)
const num2 = ref(0)
const captchaAnswer = ref('')

const captchaQuestion = computed(() => {
  return `${num1.value} + ${num2.value} = ?`
})

const correctAnswer = computed(() => {
  return num1.value + num2.value
})

// Generate random captcha
function generateCaptcha() {
  num1.value = Math.floor(Math.random() * 10) + 1
  num2.value = Math.floor(Math.random() * 10) + 1
}

// Fungsi close modal
function onClose() {
  emit('close')
}

// Fungsi handleSubmit (login)
async function handleSubmit() {
  error.value = null

  // Validate captcha
  if (parseInt(captchaAnswer.value) !== correctAnswer.value) {
    error.value = 'Jawaban verifikasi salah'
    generateCaptcha() // Generate new captcha
    captchaAnswer.value = ''
    return
  }

  try {
    const res = await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value
      }
    })

    if (res && res.user) {
      // Simpan user ke Pinia
      const userStore = useUserStore()
      console.log('Login response user:', res.user)
      console.log('Setting user_id to Pinia:', res.user.id)
      userStore.setUser({
        user_id: res.user.id,
        nama_lengkap: res.user.nama_lengkap,
        email: res.user.email,
        role_id: res.user.role_id,
        instansi: res.user.instansi || ''
      })
      
      // Verify user data was saved to Pinia
      console.log('Pinia user_id after setUser:', userStore.user_id)

      if (res.user.role_id === '1') {
        navigateTo('/dashboard')
      } else {
        navigateTo('/')
      }
      emit('close')
    }
  } catch (err) {
    console.error('Login error:', err)
    error.value = 'Email atau password salah'
    generateCaptcha() // Generate new captcha on error
    captchaAnswer.value = ''
  }
}

// Fungsi untuk membuka modal register
function openRegisterModal(e) {
  e.preventDefault()
  isRegisterOpen.value = true
}

// Generate captcha when component mounted
onMounted(() => {
  generateCaptcha()
})
</script>