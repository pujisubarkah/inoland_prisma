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

      <!-- Tombol Masuk -->
      <button
        v-else
        @click="openModal"
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

    <!-- Login Modal -->
    <Login v-if="isModalOpen" :show="isModalOpen" @close="closeModal" />
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import Login from '~/components/Login.vue'

// State
const isModalOpen = ref(false)
const isMenuOpen = ref(false)
const isProfileOpen = ref(false)
const userProfile = ref(null)

// Menu navbar
const menu = [
  { name: 'Beranda', path: '/' },
  { name: 'Layanan Inovasi', path: '/layanan' },
  { name: 'Cari Inovasi', path: '/cari' },
  { name: 'Referensi', path: '/referensi' },
  { name: 'Gallery', path: '/gallery' }
]

// Fungsi
function openModal() {
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
}

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
</script>