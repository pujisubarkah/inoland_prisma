<!-- components/VideoSection.vue -->
<template>
  <div class="flex">
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
            :class="{ 'justify-center': !isSidebarOpen, 'justify-start': isSidebarOpen }"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span v-if="isSidebarOpen" class="ml-3 flex items-center">
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
      <section class="video-section p-6 w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
        <h1 class="font-poppins font-bold text-3xl text-center mb-2">
          {{ selectedVideo.title }}
        </h1>
        <hr class="w-24 h-0.5 bg-gradient-to-r from-red-500 via-black to-red-500 mx-auto mb-5 border-none" />
        
        <p class="text-lg text-gray-700 mb-4">{{ selectedVideo.description }}</p>
        
        <!-- Video Player -->
        <div class="video-wrapper mb-4 relative">
          <!-- Video Navigation Buttons (for multiple videos) -->
          <div v-if="Array.isArray(selectedVideo.src)" class="flex justify-between mb-4">
            <button 
              @click="handlePreviousVideo"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </button>
            <span class="self-center text-gray-600">
              Video {{ currentSrcIndex + 1 }} dari {{ selectedVideo.src.length }}
            </span>
            <button 
              @click="handleNextVideo"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>

          <iframe
            width="100%"
            height="500"
            :src="currentVideoSrc"
            :title="selectedVideo.title"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            class="mb-4 rounded-lg"
          ></iframe>

          <div class="video-info mb-4">
            <p class="text-gray-600">{{ selectedVideo.views }} views</p>
          </div>

          <!-- Quiz Component -->
          <Quiz 
            :quiz="selectedVideo.quiz" 
            @quiz-complete="() => handleQuizComplete(selectedVideo.id - 1)" 
          />
        </div>

        <!-- Certificate Section -->
        <div v-if="allQuizzesCompleted" class="certificate-section mt-6">
          <input 
            v-model="userName"
            type="text" 
            placeholder="Masukkan Nama" 
            class="border p-3 mb-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            @click="handleDownloadCertificate" 
            :disabled="!userName"
            class="bg-green-500 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded w-full transition-colors"
          >
            Unduh Sertifikat
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import jsPDF from 'jspdf'

// Quiz Component
const Quiz = defineComponent({
  props: ['quiz'],
  emits: ['quiz-complete'],
  setup(props, { emit }) {
    const selectedOption = ref('')
    const isSubmitted = ref(false)

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
    <div class="quiz-section p-4 bg-gray-100 rounded-lg shadow-md">
      <h3 class="text-xl font-semibold mb-4">{{ quiz.question }}</h3>
      <form @submit.prevent="handleSubmit">
        <div v-for="(option, index) in quiz.options" :key="index" class="mb-2">
          <label class="flex items-center">
            <input
              type="radio"
              :value="option"
              v-model="selectedOption"
              class="mr-2"
            />
            <span class="text-gray-700">{{ option }}</span>
          </label>
        </div>
        <button 
          type="submit" 
          :disabled="!selectedOption" 
          class="bg-blue-500 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Kirim
        </button>
      </form>
      <div v-if="isSubmitted" class="quiz-result mt-4 p-3 rounded-lg" :class="selectedOption === quiz.correctAnswer ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
        <p v-if="selectedOption === quiz.correctAnswer">Jawaban Anda Benar!</p>
        <p v-else>Jawaban Anda Salah. Jawaban yang benar adalah: {{ quiz.correctAnswer }}</p>
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
    title: "DRUMP UP",
    views: 169,
    src: "https://youtube.com/embed/gJ0jAmLssjc",
    description: "Tahap Drum Up adalah tahap membangun kesadaran dan keinginan untuk berinovasi. Tahapan Drum Up bertujuan untuk menginspirasi dan mengembangkan semangat inovasi peserta Labinov baik secara individu mapun kolektif.",
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
    description: "Tahap Diagnose adalah tahap proses mengidentifikasi kesenjangan antara kondisi saat ini dan kondisi yang seharusnya/diharapkan terjadi, yang hal tersebut dapat dijadikan sebagai pijakan untuk adanya inovasi.",
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
    title: "DESAIN",
    views: 169,
    src: "https://youtube.com/embed/rei_mhPsCm0",
    description: "Tahap Design merupakan penuangan ide inovasi yang telah dihasilkan pada Tahap Diagnose ke dalam suatu rancangan rencana aksi yang teknis dan detail.",
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
    description: "Tahap Deliver atau tahap pelaksanaan inovasi merupakan tahap dimana peserta Labinov mulai melaksanakan ide inovasi yang dihasilkan pada tahap Diagnose berdasarkan jadwal atau agenda Rencana Aksi Inovasi yang telah disusun pada tahap Design.",
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
    description: "Display Inovasi yaitu kegiatan penyebarluasan hasil pelaksanaan atau implementasi inovasi yang telah diperjanjikan oleh Pimpinan Tertinggi Instansi Pemerintah dan Pimpinan Unit Organisasi instansi pemerintah yang didampingi.",
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
  localStorage.setItem('quizProgress', JSON.stringify(completedQuizzes.value))
}

const handleDownloadCertificate = () => {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'px',
    format: [600, 400],
  })

  const img = new Image()
  img.src = '/certificate_template.png'

  img.onload = () => {
    doc.addImage(img, 'JPEG', 0, 0, 600, 400)
    
    // Add text over the image
    doc.setFontSize(28)
    doc.setTextColor('#000')
    doc.setFont('helvetica', 'bold')
    doc.text('SERTIFIKAT', 300, 100, { align: 'center' })
    doc.setFontSize(16)
    doc.text('Pembelajaran Mandiri Lab Inovasi', 300, 120, { align: 'center' })
    doc.setFont('helvetica', 'normal')
    doc.text('Diberikan Kepada', 300, 150, { align: 'center' })
    doc.setFontSize(24)
    doc.setFont('helvetica', 'bold')
    doc.text(userName.value, 300, 200, { align: 'center' })
    doc.setFontSize(16)
    doc.setFont('helvetica', 'normal')
    doc.text('Telah Mengikuti Pembelajaran Mandiri Laboratorium Inovasi', 300, 240, { align: 'center' })
    
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    const formattedDate = new Date().toLocaleDateString('id-ID', options)
    doc.text('pada tanggal ' + formattedDate, 300, 260, { align: 'center' })
    doc.setFontSize(12)
    doc.text('Jakarta, ' + formattedDate, 420, 300, { align: 'center' })
    doc.text('Kepala Pusat Inovasi Administrasi Negara', 420, 340, { align: 'center' })
    doc.save(`Sertifikat-Lab Inovasi-${userName.value}.pdf`)
  }
}

// Lifecycle
onMounted(() => {
  // Load progress from localStorage
  const savedProgress = JSON.parse(localStorage.getItem('quizProgress'))
  if (savedProgress) {
    completedQuizzes.value = savedProgress
  }
})

// Watch for changes in completedQuizzes
watch(completedQuizzes, (newValue) => {
  localStorage.setItem('quizProgress', JSON.stringify(newValue))
}, { deep: true })
</script>

<style scoped>
.font-poppins {
  font-family: 'Poppins', sans-serif;
}
</style>