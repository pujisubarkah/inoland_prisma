<template>
  <nav class="flex justify-between items-center p-4 bg-gradient-to-r from-blue-700 via-blue-400 to-cyan-400 shadow-lg">
    <!-- Logo -->
    <div class="flex items-center">
      <img src="/lanri.png" alt="Logo" class="h-12 mr-3 p-2 sm:h-16 drop-shadow-lg" />
      <span class="text-white font-extrabold text-xl sm:text-2xl tracking-wide drop-shadow" aria-label="Inolands">INOLAND</span>
    </div>

    <!-- Desktop Menu -->
    <div class="hidden md:flex items-center gap-6">
      <ul class="flex gap-6 list-none font-poppins font-bold text-lg text-white">
        <li v-for="item in menu" :key="item.name" class="my-2 md:my-0">
          <NuxtLink
            :to="item.path"
            class="no-underline px-4 py-2 rounded transition font-semibold
              hover:bg-white/80 hover:text-blue-700 hover:shadow-md
              focus:outline-none focus:ring-2 focus:ring-cyan-400"
            :class="{ 'bg-white/90 text-blue-700 shadow font-bold': $route.path === item.path }"
          >
            {{ item.name }}
          </NuxtLink>
        </li>
      </ul>
    </div>

    <!-- Right Side -->
    <div class="flex items-center gap-4">
      <!-- Hamburger Menu -->
      <button class="md:hidden text-white" @click="toggleMenu">
        <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <!-- Mobile Menu -->
      <ul
        v-show="isMenuOpen"
        class="absolute top-full left-0 w-full bg-gradient-to-r from-blue-700 via-blue-400 to-cyan-400 shadow-lg rounded-b-lg p-4 md:hidden list-none font-poppins font-bold text-lg text-white z-30 transition-all duration-300"
      >
        <li v-for="item in menu" :key="item.name" class="my-2 md:my-0">
          <NuxtLink
            :to="item.path"
            class="no-underline px-4 py-2 rounded block transition font-semibold hover:bg-white/80 hover:text-blue-700 hover:shadow-md"
            @click="toggleMenu"
          >
            {{ item.name }}
          </NuxtLink>
        </li>
      </ul>

      <!-- Profile Menu -->
      <div v-if="userProfile" class="relative">
        <button
          class="flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-blue-700 to-cyan-400 shadow-lg border-2 border-white hover:scale-105 transition"
          @click="toggleProfile"
        >
          <UserCircleIcon class="w-9 h-9 text-blue-200 border-2 border-blue-300 rounded-full shadow" />
          <span class="text-white font-semibold text-sm truncate max-w-[120px]">{{ userProfile.nama_lengkap }}</span>
          <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div
          v-if="isProfileOpen"
          class="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl py-2 z-40 border border-blue-200"
        >
          <div class="flex items-center gap-3 px-4 py-2">
            <UserCircleIcon class="w-10 h-10 text-blue-300 border-2 border-blue-300 rounded-full shadow" />
            <div>
              <div class="font-bold text-blue-700 text-sm">{{ userProfile.nama_lengkap }}</div>
              <div class="text-xs text-gray-500">{{ userProfile.instansi }}</div>
            </div>
          </div>
          <hr class="my-2 border-blue-100" />
          <NuxtLink
            v-if="userProfile.role_id === 1"
            to="/admin"
            class="block px-4 py-2 text-sm text-blue-700 hover:bg-blue-50"
          >Admin</NuxtLink>
          <NuxtLink
            v-if="userProfile.role_id === 2"
            to="/pengguna"
            class="block px-4 py-2 text-sm text-blue-700 hover:bg-blue-50"
          >Pengguna</NuxtLink>
          <button @click="handleLogout" class="block w-full text-left px-4 py-2 text-sm text-blue-700 hover:bg-blue-50">Logout</button>
        </div>
      </div>

      <!-- Login Button -->
      <button
        v-if="!userProfile"
        @click="isLoginModalOpen = true"
        class="border-2 border-white bg-gradient-to-r from-cyan-400 to-blue-700 text-white py-2 px-4 rounded-lg cursor-pointer text-lg font-bold shadow hover:bg-white hover:text-blue-700 transition"
      >
        Masuk
      </button>

      <!-- Language Flags -->
      <div class="flex gap-2">
        <button @click="changeLanguage('en')" class="bg-transparent border-none cursor-pointer">
          <img src="/uk_flag.png" alt="English" class="border border-gray-300 rounded-md shadow" width="30" height="20" />
        </button>
        <button @click="changeLanguage('id')" class="bg-transparent border-none cursor-pointer">
          <img src="/indonesia_flag.png" alt="Bahasa Indonesia" class="border border-gray-300 rounded-md shadow" width="30" height="20" />
        </button>
      </div>
    </div>

    <!-- Login Modal -->
    <div v-if="isLoginModalOpen" class="fixed inset-0 z-50 flex items-center justify-center">
      <!-- Overlay -->
      <div
        class="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        @click="isLoginModalOpen = false"
        aria-hidden="true"
        style="z-index:51"
      ></div>

      <!-- Modal content -->
      <div
        class="relative bg-white rounded-xl shadow-2xl border-2 border-blue-300 max-w-lg w-full mx-4 p-0 overflow-hidden z-60 animate-fadeIn"
        style="z-index:52"
      >
        <div class="flex justify-between items-start">
          <!-- Gambar ino di samping hanya untuk login -->
          <div v-if="!showRegister" class="w-1/3 flex justify-center bg-white p-6">
            <img src="/ino.png" alt="Logo" class="w-28 h-auto" />
          </div>
          <div :class="showRegister ? 'w-full p-6' : 'w-2/3 p-6'">
            <button @click="isLoginModalOpen = false" class="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-xl font-bold z-60">
              &times;
            </button>
            <!-- Gambar ino di atas form registrasi -->
            <div v-if="showRegister" class="flex justify-center mb-4">
              <img src="/ino.png" alt="Logo" class="w-20 h-auto" />
            </div>
            <form v-if="!showRegister" @submit.prevent="submitLogin" class="mt-4">
              <div class="mb-4">
                <label for="email" class="block text-sm font-semibold text-blue-700 mb-1">Email</label>
                <input
                  id="email"
                  v-model="loginForm.email"
                  type="email"
                  required
                  class="w-full border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div class="mb-4">
                <label for="password" class="block text-sm font-semibold text-blue-700 mb-1">Password</label>
                <input
                  id="password"
                  v-model="loginForm.password"
                  type="password"
                  required
                  class="w-full border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <button
                type="submit"
                class="w-full bg-blue-700 text-white font-bold py-2 rounded-lg hover:bg-blue-800 transition"
              >
                Masuk
              </button>
              <div v-if="loginError" class="mt-3 text-red-600 text-sm text-center font-semibold">
                {{ loginError }}
              </div>
              <div class="mt-4 text-sm text-center text-blue-700">
                Belum punya akun?
                <button type="button" class="underline font-semibold hover:text-blue-900" @click="showRegister = true">
                  Daftar di sini
                </button>
              </div>
            </form>

            <!-- Registration Form -->
            <form v-else @submit.prevent="submitRegister" class="mt-4">
              <div class="mb-4 flex items-center gap-4">
                <label for="reg-fullname" class="form-label">Nama Lengkap</label>
                <input
                  id="reg-fullname"
                  v-model="registerForm.nama_lengkap"
                  type="text"
                  required
                  class="form-input"
                />
              </div>
              <div class="mb-4 flex items-center gap-4">
                <label for="reg-username" class="form-label">Username</label>
                <input
                  id="reg-username"
                  v-model="registerForm.username"
                  type="text"
                  required
                  class="form-input"
                />
              </div>
              <div class="mb-4 flex items-center gap-4">
                <label for="reg-instansi" class="form-label">Instansi</label>
                <input
                  id="reg-instansi"
                  v-model="registerForm.instansi"
                  type="text"
                  required
                  class="form-input"
                />
              </div>
              <div class="mb-4 flex items-center gap-4">
                <label for="reg-email" class="form-label">Email</label>
                <input
                  id="reg-email"
                  v-model="registerForm.email"
                  type="email"
                  required
                  class="form-input"
                />
              </div>
              <div class="mb-4 flex items-center gap-4">
                <label for="reg-password" class="form-label">Password</label>
                <input
                  id="reg-password"
                  v-model="registerForm.password"
                  type="password"
                  required
                  class="form-input"
                />
              </div>
              <div class="mb-4 flex items-center gap-4">
                <label for="reg-confirm" class="form-label leading-tight">
                  Konfirmasi<br>Password
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
                class="w-full bg-gradient-to-r from-cyan-400 to-blue-700 text-white font-bold py-2 rounded-lg shadow hover:bg-white hover:text-blue-700 transition"
              >
                Daftar
              </button>
              <div class="mt-4 text-sm text-center text-blue-700">
                Sudah punya akun?
                <button type="button" class="underline font-semibold hover:text-blue-900" @click="showRegister = false">
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
  min-width: 140px;
  font-size: 1rem;
  font-weight: 600;
  color: #2563eb;
  letter-spacing: 0.2px;
  padding-right: 8px;
  text-align: right;
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
}

.form-input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 2px #bae6fd;
  outline: none;
}

button[type="submit"] {
  font-size: 1.08rem;
  letter-spacing: 0.5px;
}

@media (max-width: 600px) {
  .mb-4.flex.items-center.gap-4 {
    flex-direction: column;
    align-items: stretch;
    gap: 2px;
  }
  .form-label {
    text-align: left;
    min-width: 0;
    margin-bottom: 2px;
    padding-right: 0;
  }
}
</style>