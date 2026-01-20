<!-- pages/layanan.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Video Learning Section -->
    <div class="flex flex-col lg:flex-row min-h-screen">
      <!-- Mobile Menu Button (only visible on mobile) -->
      <div class="lg:hidden bg-gray-800 p-4 flex justify-between items-center">
        <h2 class="text-white font-bold text-lg">Pembelajaran Inovasi</h2>
        <button 
          @click="toggleSidebar"
          class="bg-gray-700 text-white border-none p-2 cursor-pointer rounded-md hover:bg-gray-600 transition-colors"
        >
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>

      <!-- Sidebar -->
      <div 
        class="transition-all duration-300 overflow-y-auto bg-gray-800 text-white"
        :class="{ 
          // Desktop
          'lg:w-64': isSidebarOpen, 
          'lg:w-16': !isSidebarOpen,
          // Mobile - overlay when open, hidden when closed
          'fixed inset-y-0 left-0 z-50 w-64 lg:relative lg:z-auto': true,
          'transform -translate-x-full lg:translate-x-0': !isSidebarOpen,
          'transform translate-x-0': isSidebarOpen
        }"
      >
        <!-- Mobile overlay backdrop -->
        <div 
          v-if="isSidebarOpen" 
          class="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          @click="toggleSidebar"
        ></div>
        
        <div class="relative z-50 bg-gray-800 h-full p-3">
          <!-- Desktop toggle button -->
          <button 
            @click="toggleSidebar"
            class="hidden lg:flex bg-gray-700 text-white border-none p-3 cursor-pointer rounded-md w-full mb-3 justify-center hover:bg-gray-600 transition-colors"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path v-if="isSidebarOpen" fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
              <path v-else fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
          </button>

          <!-- Mobile close button -->
          <button 
            @click="toggleSidebar"
            class="lg:hidden absolute top-4 right-4 text-white hover:text-gray-300"
          >
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>          <ul class="list-none p-0 mt-8 lg:mt-0">
            <li v-for="(video, index) in videos" :key="video.id" class="mb-3">              <button 
                @click="handleVideoSelect(video)"
                class="bg-gray-700 text-white border-none p-3 cursor-pointer rounded-md w-full flex items-center hover:bg-gray-600 transition-colors min-h-[48px]"
                :class="{ 
                  'justify-center lg:justify-center': !isSidebarOpen && windowWidth >= 1024, 
                  'justify-start': isSidebarOpen || windowWidth < 1024,
                  'bg-blue-600 border-2 border-blue-400': selectedVideo.id === video.id
                }"
              ><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <!-- Lab Inovasi - Laboratory Beaker Icon -->
                <path v-if="video.icon === 'lab'" fill-rule="evenodd" d="M6 2a1 1 0 011-1h6a1 1 0 110 2v.5c0 1.5-.5 3.5-2 5.086L8 10.914C6.5 9.5 6 7.5 6 6V2zm4 14c-4 0-6-1.5-6-4 0-1.5 1-3 2.5-4.5L8 6v4c0 2.5 1.5 4 2 4s2-1.5 2-4V6l1.5 1.5C15 9 16 10.5 16 12c0 2.5-2 4-6 4z" clip-rule="evenodd"/>
                
                <!-- Drum Up - Megaphone/Speaker Icon -->
                <path v-if="video.icon === 'drum'" fill-rule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h3.763l7.79 3.894A1 1 0 0018 15V3zM5 8a1 1 0 100 2h.764l.236-.118V8.118L5.764 8H5z" clip-rule="evenodd"/>
                
                <!-- Diagnose - Search/Magnifying Glass Icon -->
                <path v-if="video.icon === 'diagnose'" fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
                
                <!-- Design - Pencil/Drawing Icon -->
                <path v-if="video.icon === 'design'" d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                
                <!-- Deliver - Truck/Delivery Icon -->
                <path v-if="video.icon === 'deliver'" d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
                <path v-if="video.icon === 'deliver'" d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z"/>
                
                <!-- Display - Monitor/Screen Icon -->
                <path v-if="video.icon === 'display'" fill-rule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clip-rule="evenodd"/>
              </svg>              <span v-if="isSidebarOpen || windowWidth < 1024" class="ml-3 flex items-center text-sm">
                {{ video.title }}
                <svg v-if="completedQuizzes[index]" class="w-4 h-4 ml-2 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </span>
            </button>
          </li>
        </ul>
        </div>
      </div>      <!-- Main Content -->
      <div class="flex-1 p-3 sm:p-5 bg-gray-100">
        <section class="video-section p-3 sm:p-4 w-full max-w-5xl mx-auto bg-white shadow-lg rounded-lg">
          <h1 class="font-poppins font-bold text-xl sm:text-2xl lg:text-3xl text-center mb-2 text-gray-800">
            {{ selectedVideo.title }}
          </h1>
          <hr class="w-16 sm:w-24 h-0.5 bg-gradient-to-r from-blue-700 via-black to-blue-700 mx-auto mb-4 sm:mb-5 border-none" />
    
          <p class="text-sm sm:text-base lg:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed">{{ selectedVideo.description }}</p>
            <!-- Video Player -->
          <div class="video-wrapper mb-4 sm:mb-6">
            <!-- Video Navigation Buttons (for multiple videos) -->
            <div v-if="Array.isArray(selectedVideo.src)" class="flex flex-col sm:flex-row justify-between items-center mb-4 bg-gray-50 p-3 sm:p-4 rounded-lg gap-3 sm:gap-0">
              <button 
                @click="handlePreviousVideo"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 sm:px-4 rounded flex items-center w-full sm:w-auto justify-center sm:justify-start order-2 sm:order-1"
                :disabled="currentSrcIndex === 0"
              >
                <svg class="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                Sebelumnya
              </button>
              
              <div class="text-center order-1 sm:order-2">
                <span class="text-gray-600 font-medium text-sm sm:text-base">
                  Video {{ currentSrcIndex + 1 }} dari {{ selectedVideo.src.length }}
                </span>
                <div class="flex justify-center mt-2 space-x-1">
                  <div 
                    v-for="(src, index) in selectedVideo.src" 
                    :key="index"
                    class="w-2 h-2 rounded-full"
                    :class="index === currentSrcIndex ? 'bg-blue-500' : 'bg-gray-300'"
                  ></div>
                </div>
              </div>
              
              <button 
                @click="handleNextVideo"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 sm:px-4 rounded flex items-center w-full sm:w-auto justify-center sm:justify-start order-3"
                :disabled="currentSrcIndex === selectedVideo.src.length - 1"
              >
                Selanjutnya
                <svg class="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>

            <div class="relative">
              <iframe
                width="100%"
                :height="getVideoHeight()"
                :src="currentVideoSrc"
                :title="selectedVideo.title"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                class="rounded-lg shadow-md"
              ></iframe>
            </div>            <div class="video-info mt-3 sm:mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
              <p class="text-gray-600 text-sm sm:text-base">
                <svg class="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                  <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
                </svg>
                {{ selectedVideo.views }} views
              </p>
              <div class="flex items-center text-xs sm:text-sm text-gray-500">
                Progress: {{ completedQuizzes.filter(Boolean).length }}/{{ videos.length }}
              </div>
            </div>

            <!-- Quiz Component -->
            <div class="mt-4 sm:mt-6">
              <Quiz
                :quiz="selectedVideo.quiz"
                :is-completed="completedQuizzes[selectedVideo.id - 1]"
                @quiz-complete="() => handleQuizComplete(selectedVideo.id - 1)"
              />
            </div>
          </div>

          <!-- Certificate Section -->
          <div v-if="allQuizzesCompleted" class="certificate-section mt-6 sm:mt-8 bg-green-50 border border-green-200 rounded-lg p-4 sm:p-6">
            <div class="text-center mb-4">
              <svg class="w-12 h-12 sm:w-16 sm:h-16 text-green-500 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              <h3 class="text-lg sm:text-xl font-bold text-green-800">Selamat! Anda telah menyelesaikan semua pembelajaran</h3>
              <p class="text-sm sm:text-base text-green-600">Unduh sertifikat Anda sebagai bukti penyelesaian</p>
            </div>
            
            <input 
              v-model="userName"
              type="text" 
              placeholder="Masukkan Nama Lengkap" 
              class="border border-gray-300 p-3 mb-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
            />
            <button 
              @click="handleDownloadCertificate" 
              :disabled="!userName"
              class="bg-green-500 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg w-full transition-colors flex items-center justify-center text-sm sm:text-base"
            >
              <svg class="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
              Unduh Sertifikat
            </button>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import Quiz from '~/components/Quiz.vue'

// Set page title
useHead({
  title: 'Pembelajaran Inovasi | INOLAND',
  meta: [
    { name: 'description', 
    content: 'Pembelajaran mandiri Ekosistem Inovasi dengan 6 tahap inovasi lengkap dengan quiz dan sertifikat' }
  ]
})


// Data
const videos = [
  {
    id: 1,
    title: "EKOSISTEM INOVASI",
    views: 2678,
    src: "https://www.youtube.com/embed/TsYq9s8mH_Y",
    description: "Banyak inovasi pelayanan publik lahir setiap tahun, namun hanya sedikit yang mampu bertahan dan memberi dampak nyata. Masalahnya bukan pada ide atau inovatornya, melainkan pada ekosistem inovasi yang belum terbentuk. Inovasi membutuhkan dukungan kepemimpinan, regulasi, sumber daya, budaya, dan kolaborasi agar bisa tumbuh dan berkelanjutan.",
    icon: "lab",
    quiz: {
      question: "apa penyebab utama banyak inovasi pelayanan publik tidak bertahan lama?",
      options: [
        "A. Kurangnya ide kreatif",
        "B. Keterbatasan teknologi",
        "C. Belum terbentuknya ekosistem inovasi",
        "D. Rendahnya kemampuan inovator"
      ],
      correctAnswer: "C",
    },
  },
  {
    id: 2,
    title: "KOMPONEN",
    views: 2615,
    src: "https://www.youtube.com/embed/d2zC2LiMc8I",
    description: "Episode ini membahas enam komponen utama dalam ekosistem inovasi pelayanan publik yang saling terhubung seperti roda gigi. Keenamnya adalah sumber daya manusia, regulasi, modal inovasi, budaya inovasi, kepemimpinan, dan infrastruktur. Jika satu komponen lemah, proses inovasi akan terhambat. Ekosistem inovasi hanya dapat berjalan efektif jika seluruh komponen berfungsi dan saling menguatkan secara berkelanjutan.",
    icon: "design",
    quiz: [
      {
        question: "Budaya inovasi yang baik ditandai dengan…",
        options: [
          "A. Menghindari risiko",
          "B. Fokus pada hasil cepat",
          "C. Menghargai ide dan menjadikan kegagalan sebagai pembelajaran",
          "D. Menunggu arahan pimpinan"
        ],
        correctAnswer: "C",
      },
      {
        question: "Modal inovasi dalam episode ini tidak hanya dimaknai sebagai…",
        options: [
          "A. Jejaring",
          "B. Teknologi",
          "C. Infrastruktur digital",
          "D. Anggaran keuangan saja"
        ],
        correctAnswer: "D",
      }
    ],
  },
  {
    id: 3,
    title: "AKTOR",
    views: 2517,
    src: "https://www.youtube.com/embed/mlY6LeRzFGw",
    description: "Episode ini membahas para aktor utama dalam ekosistem inovasi pelayanan publik. Inovasi tidak bisa berjalan sendiri, melainkan membutuhkan kolaborasi antara pemerintah, akademisi, swasta, masyarakat, NGO, dan media. Masing-masing aktor memiliki peran yang saling melengkapi agar inovasi dapat tumbuh, berdampak, dan berkelanjutan.",
    icon: "drum",
    quiz: {
      question: "Mengapa ekosistem inovasi tidak dapat berjalan sendiri?",
      options: [
        "A. Karena inovasi selalu mahal",
        "B. Karena teknologi belum siap",
        "C. Karena membutuhkan kolaborasi banyak aktor",
        "D. Karena harus mengikuti tren"
      ],
      correctAnswer: "C",
    },
  },
  {
    id: 4,
    title: "PRAKTIK",
    views: 2493,
    src: "https://www.youtube.com/embed/uTc65P1yzwY",
    description: "Episode ini menampilkan praktik nyata ekosistem inovasi pelayanan publik melalui studi kasus Kabupaten Banyuwangi. Transformasi layanan publik terjadi karena ekosistem inovasi yang matang: kepemimpinan berkomitmen, budaya inovasi yang kuat, regulasi yang mendukung, pengembangan SDM, serta modal dan infrastruktur yang terintegrasi. Ekosistem yang sehat melahirkan inovasi berkelanjutan dan berdampak nyata bagi masyarakat.",
    icon: "deliver",
    quiz: {
      question: "Mengapa Banyuwangi dijadikan studi kasus dalam episode ini?",
      options: [
        "A. Karena memiliki anggaran terbesar",
        "B. Karena banyak bekerja sama dengan swasta",
        "C. Karena ekosistem inovasinya matang dan konsisten",
        "D. Karena memiliki teknologi tercanggih"
      ],
      correctAnswer: "C",
    },
  },
  {
    id: 5,
    title: "KEPEMIMPINAN",
    views: 2394,
    src: "https://www.youtube.com/embed/cacH0BvrCM4",
    description: "Episode ini menekankan peran kunci pimpinan dalam keberhasilan inovasi. Pimpinan berperan menumbuhkan budaya inovasi, menciptakan ruang aman untuk bereksperimen, serta mengomunikasikan dan mengadvokasikan ide inovasi. Dukungan pimpinan membuat inovasi berkembang dari ide kecil menjadi dampak nyata bagi masyarakat.",
    icon: "diagnose",
    quiz: {
      question: "Sikap pimpinan yang tepat terhadap kegagalan dalam inovasi adalah…",
      options: [
        "A. Menghindari eksperimen",
        "B. Memberi hukuman tegas",
        "C. Melaporkan sebagai kesalahan",
        "D. Melihatnya sebagai proses belajar"
      ],
      correctAnswer: "D",
    },
  },
  {
    id: 6,
    title: "KEBERLANJUTAN",
    views: 2337,
    src: "https://www.youtube.com/embed/-CDkgeCjv1g",
    description: "Episode ini menegaskan bahwa inovasi tidak berhenti saat solusi ditemukan, tetapi harus dipelihara agar tetap hidup dan berkembang. Salah satu kunci menjaga keberlanjutan inovasi adalah melalui proposal inovasi, yang berperan mendokumentasikan pembelajaran sekaligus menghubungkan inovasi dengan dukungan seperti budaya inovasi dan modal inovasi. Proposal menjadi instrumen penting agar inovasi dapat diperluas, direplikasi, dan terus memberi manfaat.",
    icon: "display",
    quiz: {
      question: "Mengapa inovasi perlu dipelihara setelah solusi ditemukan?",
      options: [
        "A. Karena inovasi harus selalu berubah",
        "B. Karena inovasi perlu dipertahankan dan diperluas",
        "C. Karena inovasi wajib dilaporkan",
        "D. Karena tuntutan regulasi"
      ],
      correctAnswer: "B",
    },
  },
]

// Reactive state
const selectedVideo = ref(videos[0])
const completedQuizzes = ref(new Array(videos.length).fill(false))
const userName = ref('')
const isSidebarOpen = ref(false) // Default to closed on mobile
const currentSrcIndex = ref(0)
const windowWidth = ref(1024) // Default to desktop width

// Methods
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const handleVideoSelect = (video) => {
  selectedVideo.value = video
  currentSrcIndex.value = 0
  // Close sidebar on mobile after selection
  if (windowWidth.value < 1024) {
    isSidebarOpen.value = false
  }
}

const getVideoHeight = () => {
  // Responsive video height based on screen size
  if (windowWidth.value < 640) return 200 // mobile
  if (windowWidth.value < 1024) return 300 // tablet
  return isSidebarOpen.value ? 500 : 400 // desktop
}

const updateWindowWidth = () => {
  if (process.client && typeof window !== 'undefined') {
    windowWidth.value = window.innerWidth
    // Auto-open sidebar on desktop, auto-close on mobile
    if (windowWidth.value >= 1024) {
      isSidebarOpen.value = true
    } else {
      isSidebarOpen.value = false
    }
  }
}

// Computed
const allQuizzesCompleted = computed(() => {
  return completedQuizzes.value.every(completed => completed)
})

const currentVideoSrc = computed(() => {
  return Array.isArray(selectedVideo.value.src)
    ? selectedVideo.value.src[currentSrcIndex.value]
    : selectedVideo.value.src
})

const handleNextVideo = () => {
  if (Array.isArray(selectedVideo.value.src)) {
    currentSrcIndex.value = (currentSrcIndex.value + 1) % selectedVideo.value.src.length
  }
}

const handlePreviousVideo = () => {
  if (Array.isArray(selectedVideo.value.src)) {
    currentSrcIndex.value = (currentSrcIndex.value - 1 + selectedVideo.value.src.length) % selectedVideo.value.src.length
  }
}

const handleQuizComplete = (videoIndex) => {
  completedQuizzes.value[videoIndex] = true
  // Save to localStorage
  if (process.client) {
    localStorage.setItem('quizProgress', JSON.stringify(completedQuizzes.value))
  }
}

const handleDownloadCertificate = async () => {
  try {
    // Dynamic import untuk jsPDF (client-side only)
    const { jsPDF } = await import('jspdf')
    
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [600, 400],
    })

    // Simple certificate without image background
    doc.setFontSize(28)
    doc.setTextColor('#1F2937')
    doc.setFont('helvetica', 'bold')
    doc.text('SERTIFIKAT', 300, 80, { align: 'center' })
    
    doc.setFontSize(18)
    doc.setFont('helvetica', 'normal')
    doc.text('Pembelajaran Mandiri Ekosistem Inovasi', 300, 110, { align: 'center' })
    
    doc.setFontSize(14)
    doc.setFont('helvetica', 'normal')
    doc.text('Diberikan Kepada', 300, 140, { align: 'center' })
    
    doc.setFontSize(24)
    doc.setFont('helvetica', 'bold')
    doc.text(userName.value, 300, 180, { align: 'center' })
    
    doc.setFontSize(14)
    doc.setFont('helvetica', 'normal')
    doc.text('Telah Mengikuti Pembelajaran Mandiri Ekosistem Inovasi', 300, 220, { align: 'center' })
    doc.text('6 Tahap Inovasi (Drum Up, Diagnose, Design, Deliver, Display)', 300, 240, { align: 'center' })
    
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    const formattedDate = new Date().toLocaleDateString('id-ID', options)
    doc.text('pada tanggal ' + formattedDate, 300, 270, { align: 'center' })
    
    doc.setFontSize(12)
    doc.text('Jakarta, ' + formattedDate, 450, 320, { align: 'center' })
    doc.text('Kepala Pusat Inovasi Administrasi Negara', 450, 340, { align: 'center' })
    
    doc.save(`Sertifikat-Ekosistem-Inovasi-${userName.value}.pdf`)
  } catch (error) {
    console.error('Error generating certificate:', error)
    alert('Terjadi kesalahan saat membuat sertifikat')
  }
}

// Lifecycle
onMounted(() => {
  // Load progress from localStorage
  if (process.client) {
    const savedProgress = localStorage.getItem('quizProgress')
    if (savedProgress) {
      try {
        completedQuizzes.value = JSON.parse(savedProgress)
      } catch (error) {
        console.error('Error loading quiz progress:', error)
      }
    }
    
    // Initialize window width and add resize listener
    updateWindowWidth()
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', updateWindowWidth)
    }
  }
})

// Cleanup on unmount
onUnmounted(() => {
  if (process.client && typeof window !== 'undefined') {
    window.removeEventListener('resize', updateWindowWidth)
  }
})

// Watch for changes in completedQuizzes
watch(completedQuizzes, (newValue) => {
  if (process.client) {
    localStorage.setItem('quizProgress', JSON.stringify(newValue))
  }
}, { deep: true })
</script>

<style scoped>
.font-poppins {
  font-family: 'Poppins', sans-serif;
}

/* Custom scrollbar for sidebar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #374151;
}

::-webkit-scrollbar-thumb {
  background: #6B7280;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #9CA3AF;
}

/* Mobile-specific improvements */
@media (max-width: 640px) {
  .video-wrapper iframe {
    height: 200px !important;
  }
}

@media (min-width: 641px) and (max-width: 1023px) {
  .video-wrapper iframe {
    height: 300px !important;
  }
}

/* Ensure sidebar overlay works properly on mobile */
@media (max-width: 1023px) {
  .sidebar-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 40;
  }
}

/* Touch targets for mobile */
@media (max-width: 767px) {
  button {
    min-height: 44px;
    touch-action: manipulation;
  }
  
  .video-section {
    padding: 12px !important;
  }
}

/* Responsive iframe container */
.video-wrapper {
  position: relative;
}

.video-wrapper iframe {
  width: 100%;
  border-radius: 8px;
}
</style>