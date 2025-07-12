<template>
  <div class="space-y-16">
    <div
      v-for="(video, index) in videos"
      :key="video.id"
      class="bg-white shadow-md rounded-lg p-6 border border-gray-200"
    >
      <div class="aspect-video mb-4">
        <!-- Bisa single atau multiple video -->
        <iframe
          v-if="typeof video.src === 'string'"
          :src="video.src"
          frameborder="0"
          class="w-full h-full"
          allowfullscreen
        ></iframe>

        <div v-else class="space-y-4">
          <iframe
            v-for="(srcUrl, i) in video.src"
            :key="i"
            :src="srcUrl"
            frameborder="0"
            class="w-full h-64"
            allowfullscreen
          ></iframe>
        </div>
      </div>

      <div class="mb-4">
        <h3 class="text-2xl font-bold text-green-700">{{ video.title }}</h3>
        <p class="text-gray-700 mt-2">{{ video.description }}</p>
      </div>

      <!-- Komponen Quiz -->
      <QuizComponent :quiz="video.quiz" />
    </div>
  </div>
</template>

<script setup>
import QuizComponent from './QuizComponent.vue'

const videos = [
  {
    id: 1,
    title: "LABORATORIUM INOVASI",
    views: 169,
    src: "https://youtube.com/embed/n9JVaNiQ8Rg",
    description: "Laboratorium Inovasi merupakan salah satu terobosan...",
    quiz: {
      question: "Apa tujuan utama dari Laboratorium Inovasi yang digagas oleh LAN?",
      options: [
        "Meningkatkan anggaran pemerintah daerah",
        "Mendorong Reformasi Birokrasi di tingkat daerah",
        "Mengadakan pelatihan bagi pegawai pemerintah",
        "Menambah jumlah pegawai pemerintah daerah"
      ],
      correctAnswer: "Mendorong Reformasi Birokrasi di tingkat daerah"
    }
  },
  {
    id: 2,
    title: "DRUMP UP",
    views: 169,
    src: "https://youtube.com/embed/gJ0jAmLssjc",
    description: "Tahap Drum Up adalah tahap membangun kesadaran dan keinginan untuk berinovasi...",
    quiz: {
      question: "Apa tujuan dari Tahap Drum Up dalam Laboratorium Inovasi?",
      options: [
        "Menyusun rencana aksi inovasi",
        "Mengidentifikasi kesenjangan layanan publik",
        "Membangun kesadaran dan keinginan untuk berinovasi",
        "Melakukan monitoring inovasi yang sudah diterapkan"
      ],
      correctAnswer: "Membangun kesadaran dan keinginan untuk berinovasi"
    }
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
    description: "Tahap Diagnose adalah tahap proses mengidentifikasi kesenjangan...",
    quiz: {
      question: "Apa yang menjadi fokus utama dalam Tahap Diagnose?",
      options: [
        "Mencari pendanaan untuk inovasi",
        "Mengidentifikasi kesenjangan antara kondisi saat ini dan kondisi yang diharapkan",
        "Menyusun jadwal pelaksanaan inovasi",
        "Menyebarluaskan hasil inovasi"
      ],
      correctAnswer: "Mengidentifikasi kesenjangan antara kondisi saat ini dan kondisi yang diharapkan"
    }
  },
  {
    id: 4,
    title: "DESAIN",
    views: 169,
    src: "https://youtube.com/embed/rei_mhPsCm0",
    description: "Tahap Design merupakan penuangan ide inovasi...",
    quiz: {
      question: "Apa yang dihasilkan pada Tahap Design dalam Laboratorium Inovasi?",
      options: [
        "Ide inovasi baru",
        "Penyebarluasan hasil inovasi",
        "Rancangan rencana aksi yang teknis dan detail",
        "Kesadaran untuk berinovasi"
      ],
      correctAnswer: "Rancangan rencana aksi yang teknis dan detail"
    }
  },
  {
    id: 5,
    title: "DELIVER",
    views: 169,
    src: [
      "https://youtube.com/embed/1EA5t8j4YhY",
      "https://youtube.com/embed/_wMeuWXedLI"
    ],
    description: "Tahap Deliver atau tahap pelaksanaan inovasi...",
    quiz: {
      question: "Apa saja kegiatan utama yang dilakukan pada Tahap Deliver?",
      options: [
        "Drum Up dan Diagnose",
        "Penyusunan rencana dan identifikasi ide",
        "Launching Inovasi dan Monitoring Inovasi",
        "Penilaian hasil inovasi"
      ],
      correctAnswer: "Launching Inovasi dan Monitoring Inovasi"
    }
  },
  {
    id: 6,
    title: "DISPLAY",
    views: 250,
    src: "https://youtube.com/embed/KArqARoQI5w",
    description: "Display Inovasi yaitu kegiatan penyebarluasan hasil pelaksanaan inovasi...",
    quiz: {
      question: "Apa tujuan utama dari Display Inovasi dalam Laboratorium Inovasi?",
      options: [
        "Memperkenalkan inovasi kepada pimpinan",
        "Meminta masukan dari masyarakat",
        "Menyebarluaskan hasil implementasi inovasi kepada masyarakat sebagai bentuk akuntabilitas",
        "Mengidentifikasi ide-ide baru untuk inovasi lanjutan"
      ],
      correctAnswer: "Menyebarluaskan hasil implementasi inovasi kepada masyarakat sebagai bentuk akuntabilitas"
    }
  }
]
</script>
