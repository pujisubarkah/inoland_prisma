<template>
  <div class="min-h-screen bg-gray-50 py-10">
    <div class="container mx-auto px-4">
      <h1 class="text-3xl font-bold text-center mb-8 text-blue-700">Galeri Inolands</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div
          v-for="(item, idx) in galleryItems"
          :key="idx"
          class="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
        >
          <img
            :src="item.image"
            :alt="item.title"
            class="w-full h-56 object-cover"
          />
          <div class="p-4">
            <h2 class="text-lg font-semibold mb-2">{{ item.title }}</h2>
            <p class="text-gray-600 text-sm">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const galleryItems = [
  {
    image: 'https://source.unsplash.com/600x400/?innovation,technology',
    title: 'Inovasi Teknologi',
    description: 'Kumpulan foto inovasi teknologi terbaru dari berbagai daerah.'
  },
  {
    image: 'https://source.unsplash.com/600x400/?community,project',
    title: 'Proyek Komunitas',
    description: 'Dokumentasi kegiatan inovasi di tingkat komunitas.'
  },
  {
    image: 'https://source.unsplash.com/600x400/?education,school',
    title: 'Inovasi Pendidikan',
    description: 'Galeri inovasi di bidang pendidikan dan sekolah.'
  },
  {
    image: 'https://source.unsplash.com/600x400/?environment,green',
    title: 'Inovasi Lingkungan',
    description: 'Foto-foto inovasi ramah lingkungan dari seluruh Indonesia.'
  },
  {
    image: 'https://source.unsplash.com/600x400/?health,clinic',
    title: 'Inovasi Kesehatan',
    description: 'Galeri inovasi di bidang kesehatan dan pelayanan publik.'
  },
  {
    image: 'https://source.unsplash.com/600x400/?creative,art',
    title: 'Kreativitas & Seni',
    description: 'Karya inovatif di bidang seni dan kreativitas.'
  }
]
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>