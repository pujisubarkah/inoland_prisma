<template>  <nav class="fixed top-0 left-0 right-0 flex justify-between items-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-800 via-blue-600 to-blue-700 shadow-md backdrop-blur-sm" style="z-index: 9999999;">
    <!-- Logo -->
    <div class="flex items-center flex-shrink-0">
      <img src="/lanri.png" alt="Logo LANRI" class="h-8 mr-2 sm:h-10 sm:mr-3 drop-shadow-lg filter brightness-110 contrast-125" style="filter: drop-shadow(0 0 8px rgba(255,255,255,0.4)) drop-shadow(0 0 16px rgba(255,255,255,0.2))" />
      <img src="/ino.png" alt="Logo INO" class="h-6 mr-2 sm:h-8 sm:mr-3 drop-shadow-md opacity-90" />
      <span class="text-white font-bold text-base sm:text-lg md:text-xl tracking-wide drop-shadow-lg" style="text-shadow: 0 0 8px rgba(255,255,255,0.3), 0 2px 4px rgba(0,0,0,0.3)" aria-label="Inolands">INOLAND</span>
    </div><!-- Desktop Menu -->
    <div class="hidden lg:flex items-center gap-3 xl:gap-4">
      <ul class="flex gap-3 xl:gap-4 list-none font-poppins text-white">
        <li v-for="(item, index) in menu" :key="item.name" class="relative">
          <div v-if="item.submenu" class="relative">
            <button
              @mouseenter="isSubmenuOpen = index"
              @mouseleave="isSubmenuOpen = null"
              class="no-underline px-3 py-2 rounded-lg transition-all duration-200 font-medium text-sm xl:text-base whitespace-nowrap flex items-center gap-2 h-10
                hover:bg-blue-500/30 hover:shadow-sm hover:backdrop-blur-sm
                focus:outline-none focus:ring-2 focus:ring-blue-300/50"
            >
              {{ item.name }}
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <!-- Submenu -->
            <div
              v-if="isSubmenuOpen === index"
              @mouseenter="isSubmenuOpen = index"
              @mouseleave="isSubmenuOpen = null"
              class="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
            >
              <NuxtLink
                v-for="subitem in item.submenu"
                :key="subitem.name"
                :to="subitem.path"
                class="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                :class="{ 'bg-blue-50 text-blue-700': $route.path === subitem.path }"
              >
                {{ subitem.name }}
              </NuxtLink>
            </div>
          </div>
          <NuxtLink
            v-else
            :to="item.path"
            class="no-underline px-3 py-2 rounded-lg transition-all duration-200 font-medium text-sm xl:text-base whitespace-nowrap h-10 flex items-center
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
      </ul>      <!-- CTA Button: Ajukan Pendampingan -->
      <button
        @click="openPendampingan"
        class="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg font-semibold text-sm xl:text-base whitespace-nowrap flex-shrink-0 h-10 flex items-center
          hover:from-orange-600 hover:to-orange-700 hover:shadow-lg hover:scale-105 
          transition-all duration-200 shadow-md border border-orange-400/30
          focus:outline-none focus:ring-2 focus:ring-orange-300"
      >
        {{ $t('ajukanPendampingan') }}
      </button>    </div>    <!-- Right Side -->
    <div class="flex items-center gap-2 sm:gap-3">
      <!-- Language Switcher -->
      <div class="flex items-center gap-1 bg-blue-500/20 rounded-lg p-1">
        <button
          @click="changeLanguage('id')"
          class="p-1 rounded transition-all duration-200"
          :class="locale === 'id' ? 'bg-white/90 shadow-sm' : 'hover:bg-white/20'"
          aria-label="Bahasa Indonesia"
        >
          <img src="https://flagcdn.com/w40/id.png" alt="ID" class="w-6 h-4 object-cover rounded" />
        </button>
        <button
          @click="changeLanguage('en')"
          class="p-1 rounded transition-all duration-200"
          :class="locale === 'en' ? 'bg-white/90 shadow-sm' : 'hover:bg-white/20'"
          aria-label="English"
        >
          <img src="https://flagcdn.com/w40/gb.png" alt="EN" class="w-6 h-4 object-cover rounded" />
        </button>
      </div>

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
        <li v-for="(item, index) in menu" :key="item.name" class="my-1">
          <div v-if="item.submenu">
            <button
              @click="mobileSubmenuOpen = mobileSubmenuOpen === index ? null : index"
              class="no-underline px-4 py-3 rounded-lg transition-all duration-200 font-medium hover:bg-blue-500/30 hover:shadow-sm hover:backdrop-blur-sm touch-manipulation min-h-[44px] flex items-center justify-between w-full"
            >
              <span>{{ item.name }}</span>
              <svg 
                class="w-4 h-4 transition-transform duration-200" 
                :class="{ 'rotate-180': mobileSubmenuOpen === index }"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <!-- Mobile Submenu -->
            <div
              v-if="mobileSubmenuOpen === index"
              class="ml-4 mt-1 space-y-1"
            >
              <NuxtLink
                v-for="subitem in item.submenu"
                :key="subitem.name"
                :to="subitem.path"
                class="px-4 py-2 rounded-lg transition-all duration-200 font-medium hover:bg-blue-500/30 hover:shadow-sm hover:backdrop-blur-sm touch-manipulation min-h-[40px] flex items-center text-sm"
                :class="{
                  'bg-gradient-to-r from-blue-500/40 to-blue-400/30 text-blue-100 shadow-sm border border-blue-400/20 backdrop-blur-sm': $route.path === subitem.path,
                  'text-blue-50': $route.path !== subitem.path
                }"
                @click="toggleMenu"
              >
                {{ subitem.name }}
              </NuxtLink>
            </div>
          </div>
          <NuxtLink
            v-else
            :to="item.path"
            class="no-underline px-4 py-3 rounded-lg transition-all duration-200 font-medium hover:bg-blue-500/30 hover:shadow-sm hover:backdrop-blur-sm touch-manipulation min-h-[44px] flex items-center"
            :class="{
              'bg-gradient-to-r from-blue-500/40 to-blue-400/30 text-blue-100 shadow-sm border border-blue-400/20 backdrop-blur-sm': $route.path === item.path,
              'text-blue-50': $route.path !== item.path
            }"
            @click="toggleMenu"
          >
            {{ item.name }}
          </NuxtLink>
        </li>
        <!-- CTA Button for Mobile -->
        <li class="my-1 mt-3">
          <button
            @click="openPendampingan"
            class="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-3 rounded-lg font-semibold
              hover:from-orange-600 hover:to-orange-700 hover:shadow-lg
              transition-all duration-200 shadow-md border border-orange-400/30 touch-manipulation min-h-[44px]"
          >
            {{ $t('ajukanPendampingan') }}
          </button>
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
            class="px-3 sm:px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 transition-colors touch-manipulation min-h-[44px] flex flex-col items-start relative"
          >
            <span>{{ $t('admin') }}</span>
            <span v-if="adminNotifCount > 0" class="mt-1 inline-block bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5 animate-pulse" style="min-width:20px;">{{ adminNotifCount }}</span>
          </NuxtLink>
          <NuxtLink
            v-if="userProfile.role_id === 4"
            :to="'/' + (userProfile.username || userProfile.instansi || 'admin_instansi')"
            class="px-3 sm:px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 transition-colors touch-manipulation min-h-[44px] flex flex-col items-start relative"
          >
            <span>{{ $t('adminInstansi') }}</span>
            <span v-if="adminNotifCount > 0" class="mt-1 inline-block bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5 animate-pulse" style="min-width:20px;">{{ adminNotifCount }}</span>
          </NuxtLink>
          <NuxtLink
            v-if="userProfile.role_id === 2"
            to="/pengguna"
            class="px-3 sm:px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 transition-colors touch-manipulation min-h-[44px] flex flex-col items-start"
          >
            <span>{{ $t('pengguna') }}
              <span v-if="userNotifCount > 0" class="ml-2 inline-block bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5 animate-pulse align-middle" style="min-width:20px;">{{ userNotifCount }}</span>
            </span>
          </NuxtLink>
          <button @click="handleLogout" class="w-full text-left px-3 sm:px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 transition-colors touch-manipulation min-h-[44px] flex items-center">{{ $t('logout') }}</button>
        </div>
      </div>      <!-- Login Button -->
      <button
        v-if="!userProfile"
        @click="isLoginModalOpen = true"
        class="hidden xs:flex border border-blue-400/30 bg-blue-500/30 backdrop-blur-sm text-blue-50 py-1.5 px-3 sm:py-2 sm:px-4 rounded-lg cursor-pointer text-sm sm:text-base font-medium hover:bg-blue-400/40 hover:border-blue-300/40 transition-all duration-200 touch-manipulation whitespace-nowrap"
      >
        {{ $t('masuk') }}
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
    </div>    <!-- Login Modal -->
    <div v-if="isLoginModalOpen" class="fixed inset-0 flex items-center justify-center min-h-screen pt-[56px] p-4" style="z-index: 99999999;">
      <!-- Overlay -->
      <div
        class="fixed left-0 right-0 bottom-0 top-[56px] bg-black/70 backdrop-blur-sm transition-opacity"
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
          <div v-if="!showRegister" class="hidden sm:block sm:w-1/3 justify-center bg-white p-4 lg:p-6">
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
                <label for="email" class="block text-sm font-semibold text-blue-700 mb-1">{{ $t('email') }}</label>
                <input
                  id="email"
                  v-model="loginForm.email"
                  type="email"
                  required
                  class="w-full border border-blue-300 rounded-lg px-3 py-2.5 sm:py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base touch-manipulation"
                />
              </div>
              <div class="mb-4">
                <label for="password" class="block text-sm font-semibold text-blue-700 mb-1">{{ $t('password') }}</label>
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
                {{ $t('masukButton') }}
              </button>
              <div v-if="loginError" class="mt-3 text-red-600 text-sm text-center font-semibold">
                {{ loginError }}
              </div>
              <div class="mt-4 text-sm text-center text-blue-700">
                {{ $t('belumPunyaAkun') }}
                <button type="button" class="underline font-semibold hover:text-blue-900 touch-manipulation p-1" @click="showRegister = true">
                  {{ $t('daftarDisini') }}
                </button>
              </div>

              <!-- Divider -->
              <div class="relative mb-4 mt-4">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-300"></div>
                </div>
                <div class="relative flex justify-center text-sm">
                  <span class="px-2 bg-white text-gray-500">{{ $t('atau') }}</span>
                </div>
              </div>

              <!-- Google Login Button -->
              <div class="mb-4">
                <button
                  type="button"
                  @click="loginWithGoogle"
                  class="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-700 font-medium hover:bg-gray-50 hover:shadow-md transition-all duration-200 touch-manipulation"
                >
                  <svg class="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  {{ $t('masukDenganGoogle') }}
                </button>
              </div>
            </form>

            <!-- Registration Form -->
            <form v-else @submit.prevent="submitRegister" class="mt-4">
              <div class="mb-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <label for="reg-fullname" class="form-label">{{ $t('namaLengkap') }}</label>
                <input
                  id="reg-fullname"
                  v-model="registerForm.nama_lengkap"
                  type="text"
                  required
                  class="form-input"
                />
              </div>
              <div class="mb-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <label for="reg-username" class="form-label">{{ $t('username') }}</label>
                <input
                  id="reg-username"
                  v-model="registerForm.username"
                  type="text"
                  required
                  class="form-input"
                />
              </div>
              <div class="mb-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <label for="reg-instansi" class="form-label">{{ $t('instansi') }}</label>
                <input
                  id="reg-instansi"
                  v-model="registerForm.instansi"
                  type="text"
                  required
                  class="form-input"
                />
              </div>
              <div class="mb-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <label for="reg-email" class="form-label">{{ $t('email') }}</label>
                <input
                  id="reg-email"
                  v-model="registerForm.email"
                  type="email"
                  required
                  class="form-input"
                />
              </div>
              <div class="mb-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <label for="reg-password" class="form-label">{{ $t('password') }}</label>
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
                  {{ $t('konfirmasiPassword') }}
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
                {{ $t('daftar') }}
              </button>
              <div class="mt-4 text-sm text-center text-blue-700">
                {{ $t('sudahPunyaAkun') }}
                <button type="button" class="underline font-semibold hover:text-blue-900 touch-manipulation p-1" @click="showRegister = false">
                  {{ $t('loginDisini') }}
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
import { onMounted, ref, computed } from 'vue'

const isMenuOpen = ref(false)
const isProfileOpen = ref(false)
const isSubmenuOpen = ref(null) // Track which submenu is open
const mobileSubmenuOpen = ref(null) // Track mobile submenu
const userProfile = ref(null)
const isLoginModalOpen = ref(false)
const showRegister = ref(false)
const loginError = ref('')

const adminNotifCount = ref(0)
const userNotifCount = ref(0)

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

const { locale, t } = useI18n()

const menu = computed(() => [
  { name: t('beranda'), path: '/' },
  { name: t('pembelajaranInovasi'), path: '/layanan' },
  { name: t('cariInovasi'), path: '/cari' },
  { name: t('referensi'), path: '/referensi' },
  { 
    name: t('tentangInoland'), 
    path: '#',
    submenu: [
      { name: t('profilInoland'), path: '/profil-inoland' },
      { name: t('dokumentasiMedia'), path: '/galeri' },
      { name: t('ceritaKeberhasilan'), path: '/cerita-keberhasilan' },
      { name: t('surveyKesiapanInovasi'), path: '/survey-kesiapan-inovasi' }
    ]
  }
])

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
  if (!isMenuOpen.value) {
    mobileSubmenuOpen.value = null // Close mobile submenu when main menu closes
  }
}

function toggleProfile() {
  isProfileOpen.value = !isProfileOpen.value
}

function changeLanguage(lng) {
  console.log('Changing language to:', lng)
  locale.value = lng
  localStorage.setItem('i18n_locale', lng)
  console.log('Current locale:', locale.value)
}

function openPendampingan() {
  // Close mobile menu if open
  isMenuOpen.value = false
  // Navigate to ajukan-pendampingan page
  navigateTo('/ajukan-pendampingan')
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
      loginError.value = data.message || t('loginGagal')
    }
  } catch (error) {
    console.error('Login error:', error)
    loginError.value = t('loginGagal')
  }
}

async function loginWithGoogle() {
  try {
    // Redirect to Google OAuth
    window.location.href = '/api/auth/google'
  } catch (error) {
    console.error('Google login error:', error)
    loginError.value = t('loginDenganGoogleGagal')
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
      toast.success(t('pendaftaranBerhasil'))
    } else {
      alert(data.message || t('registrasiGagal'))
    }
  } catch (error) {
    console.error('Registration error:', error)
    alert(t('registrasiGagal'))
  }
}

async function handleLogout() {
  try {
    userProfile.value = null
    localStorage.removeItem('userProfile')
    toast.success(t('berhasilLogout'))
    // Redirect ke beranda
    window.location.href = '/'
  } catch (error) {
    console.error('Logout error:', error)
    toast.error(t('logoutGagal'))
  }
}

onMounted(async () => {
  // Set bahasa dari localStorage
  const savedLocale = localStorage.getItem('i18n_locale')
  if (savedLocale && (savedLocale === 'id' || savedLocale === 'en')) {
    console.log('Loading saved locale:', savedLocale)
    locale.value = savedLocale
  }
  
  const stored = localStorage.getItem('userProfile')
  if (stored) {
    userProfile.value = JSON.parse(stored)
    if (userProfile.value && userProfile.value.role_id === 1) {
      fetch('/api/notifications?role=admin')
        .then(res => res.json())
        .then(data => {
          adminNotifCount.value = Array.isArray(data) ? data.length : 0
        })
        .catch(() => { adminNotifCount.value = 0 })
    }
    if (userProfile.value && userProfile.value.role_id === 2) {
      fetch('/api/notifications?role=user&id=' + userProfile.value.id)
        .then(res => res.json())
        .then(data => {
          userNotifCount.value = Array.isArray(data) ? data.length : 0
        })
        .catch(() => { userNotifCount.value = 0 })
    }
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