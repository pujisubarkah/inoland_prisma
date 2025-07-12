<template>
  <nav class="flex justify-between items-center p-4 bg-gradient-to-r from-blue-700 via-blue-400 to-cyan-400 shadow-lg">
    <!-- Logo -->
    <div class="flex items-center">
      <img src="/lanri.png" alt="Logo" class="h-12 mr-3 p-2 sm:h-16 drop-shadow-lg" />
      <span class="text-white font-extrabold text-xl sm:text-2xl tracking-wide drop-shadow">INOLAND</span>
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

    <!-- Right Side (Profile, Language, Hamburger) -->
    <div class="flex items-center gap-4">
      <!-- Hamburger Menu for Mobile -->
      <button class="md:hidden text-white" @click="toggleMenu">
        <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>

      <!-- Mobile Menu -->
      <ul
        class="absolute top-full left-0 w-full bg-gradient-to-r from-blue-700 via-blue-400 to-cyan-400 shadow-lg rounded-b-lg p-4 md:hidden list-none font-poppins font-bold text-lg text-white z-30"
        :class="{ 'block': isMenuOpen, 'hidden': !isMenuOpen }"
      >
        <li v-for="item in menu" :key="item.name" class="my-2 md:my-0">
          <NuxtLink
            :to="item.path"
            class="no-underline px-4 py-2 rounded block transition font-semibold
              hover:bg-white/80 hover:text-blue-700 hover:shadow-md"
            @click="toggleMenu"
          >
            {{ item.name }}
          </NuxtLink>
        </li>
      </ul>

      <!-- Profile Dropdown -->
      <div v-if="userProfile" class="relative">
        <button
          class="text-white text-lg cursor-pointer border-none bg-transparent hover:text-cyan-100 transition"
          @click="toggleProfile"
        >
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
          </svg>
        </button>

        <div v-if="isProfileOpen" class="absolute right-0 mt-2 w-52 bg-white rounded-md shadow-xl py-2 z-40 border border-blue-200">
          <p class="px-4 py-2 text-sm text-blue-700 font-semibold">
            Selamat Datang, {{ userProfile.nama_lengkap }} dari {{ userProfile.instansi }}!
          </p>
          <NuxtLink to="/admin" class="block px-4 py-2 text-sm text-blue-700 hover:bg-blue-50">
            Admin
          </NuxtLink>
          <NuxtLink to="/dashboard" class="block px-4 py-2 text-sm text-blue-700 hover:bg-blue-50">
            Dashboard
          </NuxtLink>
          <button
            @click="handleLogout"
            class="block w-full text-left px-4 py-2 text-sm text-blue-700 hover:bg-blue-50"
          >
            Logout
          </button>
        </div>
      </div>

      <span
        v-else-if="userProfile"
        class="text-white font-bold px-4 py-2 rounded bg-blue-700/80"
      >
        {{ userProfile.nama_lengkap }}
      </span>
      <button
        v-else
        @click="isModalOpen = true"
        class="border-2 border-white bg-gradient-to-r from-cyan-400 to-blue-700 text-white py-2 px-4 rounded-lg cursor-pointer text-lg font-bold shadow hover:bg-white hover:text-blue-700 transition"
      >
        Masuk
      </button>

      <!-- Language Selector -->
      <div class="flex gap-2">
        <button @click="changeLanguage('en')" class="bg-transparent border-none cursor-pointer">
          <img src="/uk_flag.png" alt="English" class="border border-gray-300 rounded-md shadow" width="30" height="20" />
        </button>
        <button @click="changeLanguage('id')" class="bg-transparent border-none cursor-pointer">
          <img src="/indonesia_flag.png" alt="Bahasa Indonesia" class="border border-gray-300 rounded-md shadow" width="30" height="20" />
        </button>
      </div>
    </div>

    <!-- Login Modal dengan tampilan custom -->
<Dialog v-model:open="isModalOpen">
  <DialogContent class="p-0 max-w-lg w-full bg-white shadow-lg rounded-lg overflow-hidden">
    <div class="relative flex">
      <!-- Tombol Close -->
    

      <!-- Logo -->
      <div class="bg-transparent p-6 flex flex-col justify-center items-center w-1/3">
        <img src="/ino.png" alt="Logo" class="w-32 h-auto mb-4" />
      </div>

      <!-- Form Login -->
      <div class="p-6 w-2/3 flex flex-col justify-center">
        <form v-if="!showRegister" @submit.prevent="submitLogin" class="flex flex-col gap-4">
          <div>
            <label for="email" class="block text-sm font-semibold text-blue-700 mb-1">Email</label>
            <input
              id="email"
              v-model="loginForm.email"
              type="email"
              required
              class="w-full border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              autocomplete="email"
            />
          </div>
          <div>
            <label for="password" class="block text-sm font-semibold text-blue-700 mb-1">Password</label>
            <input
              id="password"
              v-model="loginForm.password"
              type="password"
              required
              class="w-full border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              autocomplete="current-password"
            />
          </div>
          <button
            type="submit"
            class="w-full bg-blue-700 text-white font-bold py-2 rounded-lg hover:bg-blue-800 transition"
          >
            Masuk
          </button>
          <div class="mt-4 text-sm text-center text-blue-700">
            Belum punya akun?
            <button type="button" class="underline font-semibold hover:text-blue-900" @click="showRegister = true">
              Daftar di sini
            </button>
          </div>
        </form>

        <!-- Form Registrasi -->
        <form v-else @submit.prevent="submitRegister" class="flex flex-col gap-4">
          <div>
            <label for="reg-username" class="block text-sm font-semibold text-blue-700 mb-1">Username</label>
            <input
              id="reg-username"
              v-model="registerForm.username"
              type="text"
              required
              class="w-full border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              autocomplete="username"
            />
          </div>
          <div>
            <label for="reg-instansi" class="block text-sm font-semibold text-blue-700 mb-1">Instansi</label>
            <input
              id="reg-instansi"
              v-model="registerForm.instansi"
              type="text"
              required
              class="w-full border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              autocomplete="organization"
            />
          </div>
          <div>
            <label for="reg-email" class="block text-sm font-semibold text-blue-700 mb-1">Email</label>
            <input
              id="reg-email"
              v-model="registerForm.email"
              type="email"
              required
              class="w-full border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              autocomplete="email"
            />
          </div>
          <div>
            <label for="reg-password" class="block text-sm font-semibold text-blue-700 mb-1">Password</label>
            <input
              id="reg-password"
              v-model="registerForm.password"
              type="password"
              required
              class="w-full border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              autocomplete="new-password"
            />
          </div>
          <div>
            <label for="reg-confirm" class="block text-sm font-semibold text-blue-700 mb-1">Konfirmasi Password</label>
            <input
              id="reg-confirm"
              v-model="registerForm.confirm"
              type="password"
              required
              class="w-full border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              autocomplete="new-password"
            />
          </div>
          <button
            type="submit"
            class="w-full bg-blue-700 text-white font-bold py-2 rounded-lg hover:bg-blue-800 transition"
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
  </DialogContent>
</Dialog>

  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { toast } from 'sonner'

const router = useRouter()

// State
const isModalOpen = ref(false)
const isMenuOpen = ref(false)
const isProfileOpen = ref(false)
const userProfile = ref(null)
const showRegister = ref(false)

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

// Menu navbar
const menu = [
  { name: 'Beranda', path: '/' },
  { name: 'Layanan Inovasi', path: '/layanan' },
  { name: 'Cari Inovasi', path: '/cari' },
  { name: 'Referensi', path: '/referensi' },
  { name: 'Gallery', path: '/gallery' }
]

// Fungsi
function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function toggleProfile() {
  isProfileOpen.value = !isProfileOpen.value
}

function changeLanguage(lng) {
  // Implementasi change language nanti jika diperlukan
}

async function handleLogout() {
  try {
    const res = await $fetch('/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (res.success) {
      userProfile.value = null
    }
  } catch (error) {
    // Optional: handle error
  }
}

function handleLoginSuccess(profile) {
  userProfile.value = profile
  isModalOpen.value = false
  // Redirect sesuai role_id
  if (profile.role_id === 1) {
    router.push('/admin')
  } else if (profile.role_id === 2) {
    router.push('/penguna')
  }
}

async function submitLogin() {
  try {
    const res = await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        email: loginForm.value.email,
        password: loginForm.value.password
      }
    })
    if (res.success && res.profile) {
      handleLoginSuccess(res.profile)
      loginForm.value.email = ''
      loginForm.value.password = ''
      toast.success('Login berhasil! Selamat datang, ' + res.profile.nama_lengkap)
    } else {
      toast.error(res.message || 'Login gagal')
    }
  } catch (error) {
    toast.error('Login gagal')
  }
}

async function submitRegister() {
  if (registerForm.value.password !== registerForm.value.confirm) {
    toast.error('Password dan konfirmasi tidak sama')
    return
  }
  try {
    const res = await $fetch('/api/auth/register', {
      method: 'POST',
      body: {
        username: registerForm.value.username,
        instansi: registerForm.value.instansi,
        email: registerForm.value.email,
        password: registerForm.value.password
      }
    })
    if (res.success) {
      toast.success('Registrasi berhasil, silakan login')
      showRegister.value = false
      registerForm.value.username = ''
      registerForm.value.instansi = ''
      registerForm.value.email = ''
      registerForm.value.password = ''
      registerForm.value.confirm = ''
    } else {
      toast.error(res.message || 'Registrasi gagal')
    }
  } catch (error) {
    toast.error('Registrasi gagal')
  }
}
</script>