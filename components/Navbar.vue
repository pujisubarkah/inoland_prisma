<template>  <nav class="fixed top-0 left-0 right-0 flex justify-between items-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-800 via-blue-600 to-blue-700 shadow-md backdrop-blur-sm" style="z-index: 9999999;">
    <!-- Logo -->
    <div class="flex items-center flex-shrink-0">
      <img src="/lanri.png" alt="Logo LANRI" class="h-8 mr-2 sm:h-10 sm:mr-3 drop-shadow-lg filter brightness-110 contrast-125" style="filter: drop-shadow(0 0 8px rgba(255,255,255,0.4)) drop-shadow(0 0 16px rgba(255,255,255,0.2))" />
      <img src="/ino.png" alt="Logo INO" class="h-6 mr-2 sm:h-8 sm:mr-3 drop-shadow-md opacity-90" />
      <span class="text-white font-bold text-base sm:text-lg md:text-xl tracking-wide drop-shadow-lg" style="text-shadow: 0 0 8px rgba(255,255,255,0.3), 0 2px 4px rgba(0,0,0,0.3)" aria-label="Inolands">INOLAND</span>
    </div><!-- Desktop Menu -->
    <div class="hidden lg:flex items-center gap-3 xl:gap-4">
      <ul class="flex gap-3 xl:gap-4 list-none font-poppins text-white">
        <li v-for="item in menu" :key="item.name" class="my-1 lg:my-0">
          <NuxtLink
            :to="item.path"
            class="no-underline px-3 py-2 rounded-lg transition-all duration-200 font-medium text-sm xl:text-base whitespace-nowrap
              hover:bg-blue-500/30 hover:shadow-sm hover:backdrop-blur-sm
              focus:outline-none focus:ring-2 focus:ring-blue-300/50"
            :class="{ 
              'bg-gradient-to-r from-blue-500/40 to-blue-400/30 text-blue-100 shadow-sm border border-blue-400/20 backdrop-blur-sm': $route.path === item.path,
              'text-blue-50': $route.path !== item.path
            }"
          >
            {{ item.name }}
          </NuxtLink>
        </li>
      </ul>
    </div>    <!-- Right Side -->
    <div class="flex items-center gap-2 sm:gap-3">
      <!-- Hamburger Menu -->
      <button 
        class="lg:hidden text-white p-2 rounded-md hover:bg-blue-500/30 transition-colors touch-manipulation" 
        @click="toggleMenu"
        aria-label="Toggle menu"
      >
        <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>      <!-- Mobile Menu -->
      <ul
        v-show="isMenuOpen"
        class="fixed top-[52px] sm:top-[56px] left-0 right-0 bg-gradient-to-r from-blue-800/95 via-blue-600/95 to-blue-700/95 backdrop-blur-md shadow-lg border-t border-blue-500/20 p-3 lg:hidden list-none font-poppins text-white transition-all duration-300 max-h-screen overflow-y-auto" style="z-index: 9999998;"
      >
        <li v-for="item in menu" :key="item.name" class="my-1">
          <NuxtLink
            :to="item.path"
            class="no-underline px-4 py-3 rounded-lg block transition-all duration-200 font-medium hover:bg-blue-500/30 hover:shadow-sm hover:backdrop-blur-sm touch-manipulation min-h-[44px] flex items-center"
            :class="{
              'bg-gradient-to-r from-blue-500/40 to-blue-400/30 text-blue-100 shadow-sm border border-blue-400/20 backdrop-blur-sm': $route.path === item.path,
              'text-blue-50': $route.path !== item.path
            }"
            @click="toggleMenu"
          >
            {{ item.name }}
          </NuxtLink>
        </li>
      </ul>      <!-- Profile Menu -->
      <div v-if="userProfile" class="relative">
        <button
          class="flex items-center gap-1 sm:gap-2 px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg bg-blue-500/30 border border-blue-400/30 shadow-sm backdrop-blur-sm hover:bg-blue-400/40 hover:scale-105 transition-all duration-200 touch-manipulation"
          @click="toggleProfile"
        >
          <UserCircleIcon class="w-6 h-6 sm:w-7 sm:h-7 text-blue-100 flex-shrink-0" />
          <span class="text-blue-50 font-medium text-xs sm:text-sm truncate max-w-[80px] sm:max-w-[120px] hidden xs:block">{{ userProfile.nama_lengkap }}</span>
          <svg class="w-3 h-3 sm:w-4 sm:h-4 text-blue-100 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div
          v-if="isProfileOpen"
          class="absolute right-0 mt-2 w-48 sm:w-56 bg-white rounded-xl shadow-xl py-2 border border-gray-200" style="z-index: 9999997;"
        >
          <div class="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2">
            <UserCircleIcon class="w-8 h-8 sm:w-10 sm:h-10 text-blue-400 flex-shrink-0" />
            <div class="min-w-0 flex-1">
              <div class="font-semibold text-blue-700 text-xs sm:text-sm truncate">{{ userProfile.nama_lengkap }}</div>
              <div class="text-xs text-gray-500 truncate">{{ userProfile.instansi }}</div>
            </div>
          </div>
          <hr class="my-2 border-gray-100" />
          <NuxtLink
            v-if="userProfile.role_id === 1"
            to="/admin"
            class="block px-3 sm:px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 transition-colors touch-manipulation min-h-[44px] flex items-center"
          >Admin</NuxtLink>
          <NuxtLink
            v-if="userProfile.role_id === 2"
            to="/pengguna"
            class="block px-3 sm:px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 transition-colors touch-manipulation min-h-[44px] flex items-center"
          >Pengguna</NuxtLink>
          <button @click="handleLogout" class="block w-full text-left px-3 sm:px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 transition-colors touch-manipulation min-h-[44px] flex items-center">Logout</button>
        </div>
      </div>      <!-- Login Button -->
      <button
        v-if="!userProfile"
        @click="isLoginModalOpen = true"
        class="hidden xs:flex border border-blue-400/30 bg-blue-500/30 backdrop-blur-sm text-blue-50 py-1.5 px-3 sm:py-2 sm:px-4 rounded-lg cursor-pointer text-sm sm:text-base font-medium hover:bg-blue-400/40 hover:border-blue-300/40 transition-all duration-200 touch-manipulation whitespace-nowrap"
      >
        Masuk
      </button>

      <!-- Mobile Login Button (Icon only) -->
      <button
        v-if="!userProfile"
        @click="isLoginModalOpen = true"
        class="xs:hidden border border-blue-400/30 bg-blue-500/30 backdrop-blur-sm text-blue-50 p-2 rounded-lg cursor-pointer hover:bg-blue-400/40 hover:border-blue-300/40 transition-all duration-200 touch-manipulation"
        aria-label="Login"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
        </svg>
      </button>

      <!-- Language Flags -->
      <div class="flex gap-1">
        <button @click="changeLanguage('en')" class="bg-transparent border-none cursor-pointer touch-manipulation p-1 rounded hover:bg-blue-500/30 transition-colors">
          <img src="/uk_flag.png" alt="English" class="border border-blue-300/30 rounded-sm shadow w-5 h-3 sm:w-6 sm:h-4" />
        </button>
        <button @click="changeLanguage('id')" class="bg-transparent border-none cursor-pointer touch-manipulation p-1 rounded hover:bg-blue-500/30 transition-colors">
          <img src="/indonesia_flag.png" alt="Bahasa Indonesia" class="border border-blue-300/30 rounded-sm shadow w-5 h-3 sm:w-6 sm:h-4" />
        </button>
      </div>
    </div>    <!-- Login Modal -->
    <div v-if="isLoginModalOpen" class="fixed inset-0 flex items-center justify-center p-4" style="z-index: 99999999;">
      <!-- Overlay -->
      <div
        class="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        @click="isLoginModalOpen = false"
        aria-hidden="true"
        style="z-index: 99999998;"
      ></div>

      <!-- Modal content -->
      <div
        class="relative bg-white rounded-xl shadow-2xl border-2 border-blue-300 max-w-lg w-full mx-4 p-0 overflow-hidden animate-fadeIn max-h-[90vh] overflow-y-auto"
        style="z-index: 99999999;"
      >
        <div class="flex flex-col sm:flex-row justify-between items-start">
          <!-- Gambar ino di samping hanya untuk login -->
          <div v-if="!showRegister" class="hidden sm:block sm:w-1/3 flex justify-center bg-white p-4 lg:p-6">
            <img src="/ino.png" alt="Logo" class="w-20 sm:w-24 lg:w-28 h-auto" />
          </div>
          <div :class="showRegister ? 'w-full p-4 sm:p-6' : 'w-full sm:w-2/3 p-4 sm:p-6'">            <button @click="isLoginModalOpen = false" class="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-red-500 text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors touch-manipulation" style="z-index: 999999999;">
              &times;
            </button>
            <!-- Gambar ino di atas form registrasi atau mobile login -->
            <div v-if="showRegister || !showRegister" class="flex justify-center mb-4 sm:hidden">
              <img src="/ino.png" alt="Logo" class="w-16 sm:w-20 h-auto" />
            </div>            <form v-if="!showRegister" @submit.prevent="submitLogin" class="mt-4">
              <div class="mb-4">
                <label for="email" class="block text-sm font-semibold text-blue-700 mb-1">Email</label>
                <input
                  id="email"
                  v-model="loginForm.email"
                  type="email"
                  required
                  class="w-full border border-blue-300 rounded-lg px-3 py-2.5 sm:py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base touch-manipulation"
                />
              </div>
              <div class="mb-4">
                <label for="password" class="block text-sm font-semibold text-blue-700 mb-1">Password</label>
                <input
                  id="password"
                  v-model="loginForm.password"
                  type="password"
                  required
                  class="w-full border border-blue-300 rounded-lg px-3 py-2.5 sm:py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base touch-manipulation"
                />
              </div>
              <button
                type="submit"
                class="w-full bg-blue-700 text-white font-bold py-3 sm:py-2 rounded-lg hover:bg-blue-800 transition touch-manipulation"
              >
                Masuk
              </button>
              <div v-if="loginError" class="mt-3 text-red-600 text-sm text-center font-semibold">
                {{ loginError }}
              </div>
              <div class="mt-4 text-sm text-center text-blue-700">
                Belum punya akun?
                <button type="button" class="underline font-semibold hover:text-blue-900 touch-manipulation p-1" @click="showRegister = true">
                  Daftar di sini
                </button>
              </div>
            </form>

            <!-- Registration Form -->
            <form v-else @submit.prevent="submitRegister" class="mt-4">
              <div class="mb-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <label for="reg-fullname" class="form-label">Nama Lengkap</label>
                <input
                  id="reg-fullname"
                  v-model="registerForm.nama_lengkap"
                  type="text"
                  required
                  class="form-input"
                />
              </div>
              <div class="mb-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <label for="reg-username" class="form-label">Username</label>
                <input
                  id="reg-username"
                  v-model="registerForm.username"
                  type="text"
                  required
                  class="form-input"
                />
              </div>
              <div class="mb-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <label for="reg-instansi" class="form-label">Instansi</label>
                <input
                  id="reg-instansi"
                  v-model="registerForm.instansi"
                  type="text"
                  required
                  class="form-input"
                />
              </div>
              <div class="mb-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <label for="reg-email" class="form-label">Email</label>
                <input
                  id="reg-email"
                  v-model="registerForm.email"
                  type="email"
                  required
                  class="form-input"
                />
              </div>
              <div class="mb-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <label for="reg-password" class="form-label">Password</label>
                <input
                  id="reg-password"
                  v-model="registerForm.password"
                  type="password"
                  required
                  class="form-input"
                />
              </div>
              <div class="mb-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <label for="reg-confirm" class="form-label leading-tight">
                  Konfirmasi<br class="hidden sm:block">Password
                </label>
                <input
                  id="reg-confirm"
                  v-model="registerForm.confirm"
                  type="password"
                  required
                  class="form-input"
                />
              </div>
              <button
                type="submit"
                class="w-full bg-gradient-to-r from-cyan-400 to-blue-700 text-white font-bold py-3 sm:py-2 rounded-lg shadow hover:bg-white hover:text-blue-700 transition touch-manipulation"
              >
                Daftar
              </button>
              <div class="mt-4 text-sm text-center text-blue-700">
                Sudah punya akun?
                <button type="button" class="underline font-semibold hover:text-blue-900 touch-manipulation p-1" @click="showRegister = false">
                  Login di sini
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { UserCircleIcon } from '@heroicons/vue/24/solid'
import { toast } from 'vue-sonner'
import { onMounted } from 'vue'

const isMenuOpen = ref(false)
const isProfileOpen = ref(false)
const userProfile = ref(null)
const isLoginModalOpen = ref(false)
const showRegister = ref(false)
const loginError = ref('')

const loginForm = ref({
  email: '',
  password: ''
})

const registerForm = ref({
  username: '',
  instansi: '',
  email: '',
  password: '',
  confirm: ''
})

const menu = [
  { name: 'Beranda', path: '/' },
  { name: 'Layanan Inovasi', path: '/layanan' },
  { name: 'Cari Inovasi', path: '/cari' },
  { name: 'Referensi', path: '/referensi' },
  { name: 'Galeri', path: '/galeri' }
]

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function toggleProfile() {
  isProfileOpen.value = !isProfileOpen.value
}

function changeLanguage(lng) {
  // Implementasi perubahan bahasa
}

async function submitLogin() {
  loginError.value = ''
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginForm.value)
    })
    const data = await res.json()
    if (res.ok && data.user) {
      localStorage.setItem('userProfile', JSON.stringify(data.user))
      userProfile.value = data.user
      isLoginModalOpen.value = false
      loginError.value = ''
    } else {
      loginError.value = data.message || 'Login gagal'
    }
  } catch (error) {
    console.error('Login error:', error)
    loginError.value = 'Login gagal, silakan coba lagi.'
  }
}

async function submitRegister() {
  try {
    const res = await fetch('/api/auth/registrasi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registerForm.value)
    })
    const data = await res.json()
    if (res.ok) {
      // Registrasi sukses, tutup modal dan reset form
      showRegister.value = false
      isLoginModalOpen.value = false
      registerForm.value = {
        namalengkap: '',
        username: '',
        instansi: '',
        email: '',
        password: '',
        confirm: ''
      }
      toast.success('Pendaftaran berhasil! Admin akan memverifikasi akun Anda')
    } else {
      alert(data.message || 'Registrasi gagal')
    }
  } catch (error) {
    console.error('Registration error:', error)
    alert('Registrasi gagal, silakan coba lagi.')
  }
}

async function handleLogout() {
  try {
    userProfile.value = null
    localStorage.removeItem('userProfile')
    // Redirect ke beranda
    window.location.href = '/'
  } catch (error) {
    console.error('Logout error:', error)
  }
}

onMounted(() => {
  const stored = localStorage.getItem('userProfile')
  if (stored) {
    userProfile.value = JSON.parse(stored)
  }
})
</script>

<style scoped>
/* Tambahan styling jika diperlukan */
.animate-fadeIn {
  animation: fadeInModal 0.3s cubic-bezier(.4,2,.3,1);
}
@keyframes fadeInModal {
  from { opacity: 0; transform: translateY(40px) scale(0.96);}
  to   { opacity: 1; transform: translateY(0) scale(1);}
}

.form-label {
  min-width: 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: #2563eb;
  letter-spacing: 0.2px;
  padding-right: 0;
  text-align: left;
}

@media (min-width: 640px) {
  .form-label {
    min-width: 140px;
    font-size: 1rem;
    padding-right: 8px;
    text-align: right;
  }
}

.form-input {
  flex: 1;
  border: 2px solid #38bdf8;
  border-radius: 10px;
  padding: 10px 14px;
  font-size: 1rem;
  background: linear-gradient(90deg, #f8fafc 80%, #e0f2fe 100%);
  transition: border 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(37,99,235,0.08);
  min-height: 44px;
  touch-action: manipulation;
}

.form-input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 2px #bae6fd;
  outline: none;
}

button[type="submit"] {
  font-size: 1rem;
  letter-spacing: 0.5px;
  min-height: 44px;
  touch-action: manipulation;
}

@media (min-width: 640px) {
  button[type="submit"] {
    font-size: 1.08rem;
    min-height: auto;
  }
}

/* Mobile-specific adjustments */
@media (max-width: 639px) {
  .mb-4.flex.flex-col.sm\\:flex-row.sm\\:items-center.gap-2.sm\\:gap-4 {
    align-items: stretch;
    gap: 0.5rem;
  }
  
  .form-label {
    margin-bottom: 2px;
  }
}
</style>