<template>
  <div>
    <h2 class="text-2xl font-bold mb-6 text-blue-700">Artikel Terbaru</h2>
    <div v-if="selectedArticle" class="bg-white p-6 rounded-2xl shadow-xl mb-6 border border-blue-100">
      <button class="mb-4 text-blue-600 hover:underline font-semibold" @click="selectedArticle = null">
        ← Kembali ke daftar artikel
      </button>
      <div class="flex items-center mb-4">
        <div class="avatar-ring mr-3 hover:scale-105 transition">
          <img
            :src="selectedArticle.photo || selectedArticle.avatar"
            alt="avatar"
            class="w-12 h-12 rounded-full object-cover shadow"
          />
        </div>
        <div>
          <h3 class="text-xl font-bold mb-1 text-blue-700">{{ selectedArticle.title }}</h3>
          <p class="text-gray-500 text-sm">{{ selectedArticle.date }}</p>
        </div>
      </div>
      <div class="text-gray-800 leading-relaxed" v-html="selectedArticle.content"></div>
    </div>
    <div v-else class="space-y-4">
      <div
        v-for="article in articles"
        :key="article.id"
        class="bg-white p-4 rounded-xl shadow hover:shadow-xl border border-blue-50 cursor-pointer flex items-center transition group hover:border-blue-300"
        @click="selectedArticle = article"
      >
        <div class="avatar-ring mr-3 group-hover:scale-105 transition">
          <img
            :src="article.photo || article.avatar"
            alt="avatar"
            class="w-10 h-10 rounded-full object-cover shadow"
          />
        </div>
        <div>
          <h3 class="font-semibold text-lg mb-1 text-blue-700 group-hover:underline">{{ article.title }}</h3>
          <p class="text-gray-500 text-sm mb-1">{{ article.date }}</p>
          <p class="text-gray-700 text-sm line-clamp-2">{{ article.summary }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

function getDicebearAvatar(name) {
  return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=1976d2,e3f2fd`
}

const articles = [
  {
    id: 1,
    title: 'Mengenal Laboratorium Inovasi',
    date: '15 Juli 2025',
    summary: 'Laboratorium Inovasi adalah wadah pengembangan ide dan solusi kreatif untuk instansi pemerintah...',
    photo: 'https://randomuser.me/api/portraits/men/32.jpg', // contoh foto dummy
    avatar: getDicebearAvatar('Lab Inovasi'),
    content: `<p>Laboratorium Inovasi merupakan metode pengembangan inovasi yang telah diterapkan sejak 2015. Melalui pendekatan ini, ide-ide kreatif dari berbagai instansi dapat dikembangkan menjadi solusi nyata yang berdampak bagi masyarakat.</p>
    <ul class="list-disc ml-6 mt-2">
      <li>Kolaborasi lintas sektor</li>
      <li>Pendampingan inovator</li>
      <li>Implementasi dan monitoring</li>
    </ul>`
  },
  {
    id: 2,
    title: 'Langkah Praktis Menjadi Inovator',
    date: '10 Juli 2025',
    summary: 'Artikel ini membahas tahapan dan tips menjadi inovator di lingkungan birokrasi...',
    photo: '', // kosong, pakai Dicebear
    avatar: getDicebearAvatar('Inovator'),
    content: `<p>Menjadi inovator di lingkungan birokrasi membutuhkan keberanian dan strategi yang tepat. Berikut beberapa langkah praktis:</p>
    <ol class="list-decimal ml-6 mt-2">
      <li>Identifikasi masalah yang relevan</li>
      <li>Kembangkan ide kreatif</li>
      <li>Kolaborasi dengan tim</li>
      <li>Uji coba dan evaluasi</li>
    </ol>`
  }
]

const selectedArticle = ref(null)
</script>

<style scoped>
.avatar-ring {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background: linear-gradient(135deg, #1976d2 0%, #42a5f5 100%);
  padding: 2px;
  box-shadow: 0 2px 8px #e3f2fd33;
}
</style>