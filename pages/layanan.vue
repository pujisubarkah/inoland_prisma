<!-- pages/layanan.vue -->
<template>
  <div class="min-h-screen bg-gray-50">


    <!-- Video Learning Section -->
    <div class="flex min-h-screen">
      <!-- Sidebar -->
      <div 
        class="transition-all duration-300 overflow-hidden bg-gray-800 text-white p-3"
        :class="{ 'w-64': isSidebarOpen, 'w-16': !isSidebarOpen }"
      >
        <button 
          @click="toggleSidebar"
          class="bg-gray-700 text-white border-none p-3 cursor-pointer rounded-md w-full mb-3 flex justify-center hover:bg-gray-600 transition-colors"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path v-if="isSidebarOpen" fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
            <path v-else fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>
        </button>
        
        <ul class="list-none p-0">
          <li v-for="(video, index) in videos" :key="video.id" class="mb-3">
            <button 
              @click="handleVideoSelect(video)"
              class="bg-gray-700 text-white border-none p-3 cursor-pointer rounded-md w-full flex items-center hover:bg-gray-600 transition-colors"
              :class="{ 
                'justify-center': !isSidebarOpen, 
                'justify-start': isSidebarOpen,
                'bg-blue-600': selectedVideo.id === video.id
              }"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clip-rule="evenodd"/>
              </svg>
              <span v-if="isSidebarOpen" class="ml-3 flex items-center text-sm">
                {{ video.title }}
                <svg v-if="completedQuizzes[index]" class="w-4 h-4 ml-2 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </span>
            </button>
          </li>
        </ul>
      </div>

      <!-- Main Content -->
      <div class="flex-1 p-5 bg-gray-100">
        <section class="video-section p-6 w-full max-w-5xl mx-auto bg-white shadow-lg rounded-lg">
          <h1 class="font-poppins font-bold text-3xl text-center mb-2 text-gray-800">
            {{ selectedVideo.title }}
          </h1>
          <hr class="w-24 h-0.5 bg-gradient-to-r from-red-500 via-black to-red-500 mx-auto mb-5 border-none" />
          
          <p class="text-lg text-gray-700 mb-6 leading-relaxed">{{ selectedVideo.description }}</p>
          
          <!-- Video Player -->
          <div class="video-wrapper mb-6">
            <!-- Video Navigation Buttons (for multiple videos) -->
            <div v-if="Array.isArray(selectedVideo.src)" class="flex justify-between items-center mb-4 bg-gray-50 p-4 rounded-lg">
              <button 
                @click="handlePreviousVideo"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
                :disabled="currentSrcIndex === 0"
              >
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                Sebelumnya
              </button>
              
              <div class="text-center">
                <span class="text-gray-600 font-medium">
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
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
                :disabled="currentSrcIndex === selectedVideo.src.length - 1"
              >
                Selanjutnya
                <svg class="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>

            <div class="relative">
              <iframe
                width="100%"
                height="500"
                :src="currentVideoSrc"
                :title="selectedVideo.title"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                class="rounded-lg shadow-md"
              ></iframe>
            </div>

            <div class="video-info mt-4 flex justify-between items-center">
              <p class="text-gray-600">
                <svg class="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                  <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
                </svg>
                {{ selectedVideo.views }} views
              </p>
              <div class="flex items-center text-sm text-gray-500">
                Progress: {{ completedQuizzes.filter(Boolean).length }}/{{ videos.length }}
              </div>
            </div>

            <!-- Quiz Component -->
            <div class="mt-6">
              <Quiz 
                :quiz="selectedVideo.quiz" 
                @quiz-complete="() => handleQuizComplete(selectedVideo.id - 1)" 
                :is-completed="completedQuizzes[selectedVideo.id - 1]"
              />
            </div>
          </div>

          <!-- Certificate Section -->
          <div v-if="allQuizzesCompleted" class="certificate-section mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
            <div class="text-center mb-4">
              <svg class="w-16 h-16 text-green-500 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              <h3 class="text-xl font-bold text-green-800">Selamat! Anda telah menyelesaikan semua pembelajaran</h3>
              <p class="text-green-600">Unduh sertifikat Anda sebagai bukti penyelesaian</p>
            </div>
            
            <input 
              v-model="userName"
              type="text" 
              placeholder="Masukkan Nama Lengkap" 
              class="border border-gray-300 p-3 mb-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <button 
              @click="handleDownloadCertificate" 
              :disabled="!userName"
              class="bg-green-500 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg w-full transition-colors flex items-center justify-center"
            >
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
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
import { ref, computed, onMounted, watch } from 'vue'

// Set page title
useHead({
  title: 'Layanan Pembelajaran Inovasi - Inolands',
  meta: [
    { name: 'description', content: 'Pembelajaran mandiri Laboratorium Inovasi dengan 6 tahap inovasi lengkap dengan quiz dan sertifikat' }
  ]
})

// Quiz Component
const Quiz = defineComponent({
  props: {
    quiz: Object,
    isCompleted: Boolean
  },
  emits: ['quiz-complete'],
  setup(props, { emit }) {
    const selectedOption = ref('')
    const isSubmitted = ref(false)

    // Reset when quiz changes
    watch(() => props.quiz, () => {
      selectedOption.value = ''
      isSubmitted.value = props.isCompleted
    })

    const handleSubmit = () => {
      isSubmitted.value = true
      if (selectedOption.value === props.quiz.correctAnswer) {
        emit('quiz-complete')
      }
    }

    return {
      selectedOption,
      isSubmitted,
      handleSubmit
    }
  },
  template: `
    <div class="quiz-section p-6 bg-gray-50 rounded-lg border border-gray-200">
      <div class="flex items-center mb-4">
        <svg class="w-6 h-6 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/>
        </svg>
        <h3 class="text-xl font-semibold text-gray-800">Kuis Pemahaman</h3>
        <div v-if="isCompleted" class="ml-auto">
          <span class="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded">Selesai</span>
        </div>
      </div>
      
      <p class="text-lg text-gray-700 mb-6">{{ quiz.question }}</p>
      
      <form @submit.prevent="handleSubmit" v-if="!isCompleted">
        <div v-for="(option, index) in quiz.options" :key="index" class="mb-3">
          <label class="flex items-start cursor-pointer p-3 rounded-lg hover:bg-white transition-colors">
            <input
              type="radio"
              :value="option"
              v-model="selectedOption"
              class="mt-1 mr-3 text-blue-600"
            />
            <span class="text-gray-700 flex-1">{{ option }}</span>
          </label>
        </div>
        <button 
          type="submit" 
          :disabled="!selectedOption" 
          class="bg-blue-500 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg mt-4 transition-colors"
        >
          Kirim Jawaban
        </button>
      </form>
      
      <div v-if="isSubmitted" class="quiz-result mt-6 p-4 rounded-lg" :class="selectedOption === quiz.correctAnswer ? 'bg-green-100 border border-green-300' : 'bg-red-100 border border-red-300'">
        <div v-if="selectedOption === quiz.correctAnswer" class="flex items-center text-green-800">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
          </svg>
          <span class="font-medium">Jawaban Anda Benar!</span>
        </div>
        <div v-else class="text-red-800">
          <div class="flex items-center mb-2">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
            </svg>
            <span class="font-medium">Jawaban Anda Salah</span>
          </div>
          <p class="text-sm">Jawaban yang benar adalah: <strong>{{ quiz.correctAnswer }}</strong></p>
        </div>
      </div>
    </div>
  `
})

// Data
const videos = [
  {
    id: 1,
    title: "LABORATORIUM INOVASI",
    views: 169,
    src: "https://youtube.com/embed/n9JVaNiQ8Rg",
    description: "Laboratorium Inovasi merupakan salah satu terobosan Lembaga Administrasi Negara (LAN) dalam mendorong Reformasi Birokrasi di tingkat daerah. Hal ini sejalan dengan pesan Presiden RI Joko Widodo yang meminta seluruh elemen pemerintah untuk bekerja tidak menggunakan cara-cara biasa namun menggagas terobosan baru untuk mempercepat pelayanan kepada masyarakat.",
    quiz: {
      question: "Apa tujuan utama dari Laboratorium Inovasi yang digagas oleh LAN?",
      options: [
        "Meningkatkan anggaran pemerintah daerah",
        "Mendorong Reformasi Birokrasi di tingkat daerah",
        "Mengadakan pelatihan bagi pegawai pemerintah",
        "Menambah jumlah pegawai pemerintah daerah"
      ],
      correctAnswer: "Mendorong Reformasi Birokrasi di tingkat daerah",
    },
  },
  {
    id: 2,
    title: "DRUM UP",
    views: 169,
    src: "https://youtube.com/embed/gJ0jAmLssjc",
    description: "Tahap Drum Up adalah tahap membangun kesadaran dan keinginan untuk berinovasi. Tahapan Drum Up bertujuan untuk menginspirasi dan mengembangkan semangat inovasi peserta Labinov baik secara individu maupun kolektif. Dengan demikian, willingness to innovate atau kemauan berinovasi akan terbentuk yang merupakan modal awal untuk melanjutkan ke tahap-tahap Labinov berikutnya.",
    quiz: {
      question: "Apa tujuan dari Tahap Drum Up dalam Laboratorium Inovasi?",
      options: [
        "Menyusun rencana aksi inovasi",
        "Mengidentifikasi kesenjangan layanan publik",
        "Membangun kesadaran dan keinginan untuk berinovasi",
        "Melakukan monitoring inovasi yang sudah diterapkan"
      ],
      correctAnswer: "Membangun kesadaran dan keinginan untuk berinovasi",
    },
  },
  {
    id: 3,
    title: "DIAGNOSE",
    views: 169,
    src: [
      "https://youtube.com/embed/QExvuVbnMwM",
      "https://youtube.com/embed/2LNeEwhr0tQ",
      "https://youtube.com/embed/lqAaNZ2oMFw"
    ],
    description: "Tahap Diagnose adalah tahap proses mengidentifikasi kesenjangan antara kondisi saat ini dan kondisi yang seharusnya/diharapkan terjadi, yang hal tersebut dapat dijadikan sebagai pijakan untuk adanya inovasi. Tahap Diagnose ini bertujuan untuk memfasilitasi peserta untuk menemukan ide inovasi, yaitu gagasan-gagasan yang mengandung unsur kebaruan, serta diharapkan akan dapat meningkatkan kinerja organisasinya.",
    quiz: {
      question: "Apa yang menjadi fokus utama dalam Tahap Diagnose?",
      options: [
        "Mencari pendanaan untuk inovasi",
        "Mengidentifikasi kesenjangan antara kondisi saat ini dan kondisi yang diharapkan",
        "Menyusun jadwal pelaksanaan inovasi",
        "Menyebarluaskan hasil inovasi"
      ],
      correctAnswer: "Mengidentifikasi kesenjangan antara kondisi saat ini dan kondisi yang diharapkan",
    },
  },
  {
    id: 4,
    title: "DESIGN",
    views: 169,
    src: "https://youtube.com/embed/rei_mhPsCm0",
    description: "Tahap Design merupakan penuangan ide inovasi yang telah dihasilkan pada Tahap Diagnose ke dalam suatu rancangan rencana aksi yang teknis dan detail. Tahap Design inovasi sangat penting karena akan mendetailkan langkah-langkah mewujudkan ide inovasi yang sudah digagas.",
    quiz: {
      question: "Apa yang dihasilkan pada Tahap Design dalam Laboratorium Inovasi?",
      options: [
        "Ide inovasi baru",
        "Penyebarluasan hasil inovasi",
        "Rancangan rencana aksi yang teknis dan detail",
        "Kesadaran untuk berinovasi"
      ],
      correctAnswer: "Rancangan rencana aksi yang teknis dan detail",
    },
  },
  {
    id: 5,
    title: "DELIVER",
    views: 169,
    src: [
      "https://youtube.com/embed/1EA5t8j4YhY",
      "https://youtube.com/embed/_wMeuWXedLI"
    ],
    description: "Tahap Deliver atau tahap pelaksanaan inovasi merupakan tahap dimana peserta Labinov mulai melaksanakan ide inovasi yang dihasilkan pada tahap Diagnose berdasarkan jadwal atau agenda Rencana Aksi Inovasi yang telah disusun pada tahap Design. Pada Tahap Deliver terdapat 2 (dua) kegiatan utama, yaitu Launching Inovasi dan Monitoring Inovasi.",
    quiz: {
      question: "Apa saja kegiatan utama yang dilakukan pada Tahap Deliver?",
      options: [
        "Drum Up dan Diagnose",
        "Penyusunan rencana dan identifikasi ide",
        "Launching Inovasi dan Monitoring Inovasi",
        "Penilaian hasil inovasi"
      ],
      correctAnswer: "Launching Inovasi dan Monitoring Inovasi",
    },
  },
  {
    id: 6,
    title: "DISPLAY",
    views: 250,
    src: "https://youtube.com/embed/KArqARoQI5w",
    description: "Display Inovasi yaitu kegiatan penyebarluasan hasil pelaksanaan atau implementasi inovasi yang telah diperjanjikan oleh Pimpinan Tertinggi Instansi Pemerintah dan Pimpinan Unit Organisasi instansi pemerintah yang didampingi. Hal ini merupakan salah satu bentuk akuntabilitas pemerintah kepada masyarakat dalam meningkatkan kinerja pemberian layanan pada masyarakat.",
    quiz: {
      question: "Apa tujuan utama dari Display Inovasi dalam Laboratorium Inovasi?",
      options: [
        "Memperkenalkan inovasi kepada pimpinan",
        "Meminta masukan dari masyarakat",
        "Menyebarluaskan hasil implementasi inovasi kepada masyarakat sebagai bentuk akuntabilitas",
        "Mengidentifikasi ide-ide baru untuk inovasi lanjutan"
      ],
      correctAnswer: "Menyebarluaskan hasil implementasi inovasi kepada masyarakat sebagai bentuk akuntabilitas",
    },
  },
]

// Reactive state
const selectedVideo = ref(videos[0])
const completedQuizzes = ref(new Array(videos.length).fill(false))
const userName = ref('')
const isSidebarOpen = ref(false)
const currentSrcIndex = ref(0)

// Computed
const allQuizzesCompleted = computed(() => {
  return completedQuizzes.value.every(completed => completed)
})

const currentVideoSrc = computed(() => {
  return Array.isArray(selectedVideo.value.src)
    ? selectedVideo.value.src[currentSrcIndex.value]
    : selectedVideo.value.src
})

// Methods
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const handleVideoSelect = (video) => {
  selectedVideo.value = video
  currentSrcIndex.value = 0
}

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
    doc.text('Pembelajaran Mandiri Lab Inovasi', 300, 110, { align: 'center' })
    
    doc.setFontSize(14)
    doc.setFont('helvetica', 'normal')
    doc.text('Diberikan Kepada', 300, 140, { align: 'center' })
    
    doc.setFontSize(24)
    doc.setFont('helvetica', 'bold')
    doc.text(userName.value, 300, 180, { align: 'center' })
    
    doc.setFontSize(14)
    doc.setFont('helvetica', 'normal')
    doc.text('Telah Mengikuti Pembelajaran Mandiri Laboratorium Inovasi', 300, 220, { align: 'center' })
    doc.text('6 Tahap Inovasi (Drum Up, Diagnose, Design, Deliver, Display)', 300, 240, { align: 'center' })
    
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    const formattedDate = new Date().toLocaleDateString('id-ID', options)
    doc.text('pada tanggal ' + formattedDate, 300, 270, { align: 'center' })
    
    doc.setFontSize(12)
    doc.text('Jakarta, ' + formattedDate, 450, 320, { align: 'center' })
    doc.text('Kepala Pusat Inovasi Administrasi Negara', 450, 340, { align: 'center' })
    
    doc.save(`Sertifikat-Lab-Inovasi-${userName.value}.pdf`)
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
</style>