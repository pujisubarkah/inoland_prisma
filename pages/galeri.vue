<template>
  <div class="min-h-screen bg-gray-50 py-10">
    <div class="container mx-auto px-4">
      <h1 class="text-3xl font-bold text-center mb-8 text-blue-700">Galeri Video Inolands</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div
          v-for="(video, idx) in videoItems"
          :key="idx"
          class="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden flex flex-col"
        >
          <div class="aspect-w-16 aspect-h-9 w-full">
            <iframe
              :src="`https://www.youtube.com/embed/${extractId(video.url)}`"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              class="w-full h-full rounded-t-lg"
            ></iframe>
          </div>
          <div class="p-4">
            <h2 class="text-lg font-semibold mb-2">{{ video.title }}</h2>
            <p class="text-gray-600 text-sm">{{ video.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const videoItems = [
  {
    url: 'https://youtu.be/03qOlYmn5Gs?feature=shared',
    title: 'Materi Deliver-Monitoring Laboratorium Inovasi',
    description: 'Pelajari strategi monitoring inovasi di Laboratorium Inovasi untuk memastikan keberlanjutan perubahan di daerah.'
  },
  {
    url: 'https://youtu.be/i78KlbJHhi8?feature=shared',
    title: 'Inolands',
    description: 'Kenali platform Inolands sebagai wadah kolaborasi dan inspirasi inovasi daerah di seluruh Indonesia.'
  },
  {
    url: 'https://youtu.be/nmaGu0zSINg?feature=shared',
    title: 'Konsolidasi',
    description: 'Simak proses konsolidasi untuk memperkuat ekosistem inovasi di pemerintahan daerah.'
  },
  {
    url: 'https://youtu.be/eAEaWzgZdDg?feature=shared',
    title: 'Villagepreneurship',
    description: 'Inspirasi pemberdayaan desa melalui inovasi kewirausahaan yang berdampak nyata bagi masyarakat lokal.'
  },
  {
    url: 'https://youtu.be/Hw9U9gFxw_U?feature=shared',
    title: 'Diagnose Inovasi',
    description: 'Temukan cara mendiagnosa kebutuhan inovasi daerah untuk menghasilkan solusi yang tepat guna.'
  },
  {
    url: 'https://youtu.be/HG3A4Umz76Q?feature=shared',
    title: 'Diagnose Inovasi Part 1',
    description: 'Bagian pertama dari serial diagnose inovasi, membahas langkah awal identifikasi masalah dan peluang inovasi.'
  },
  {
    url: 'https://youtu.be/t6K2Vnp-zT0?feature=shared',
    title: 'Teknis pengisian form diagnose',
    description: 'Panduan praktis pengisian form diagnose inovasi agar proses identifikasi berjalan efektif dan efisien.'
  }
]

// Fungsi untuk mengambil ID video dari URL YouTube
function extractId(url: string) {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([A-Za-z0-9_-]{11})/)
  return match ? match[1] : ''
}
</script>

<style scoped>
.container {
  max-width: 1200px;
}
.aspect-w-16 {
  aspect-ratio: 16/9;
}
</style>