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
            :src="selectedArticle.avatar"
            alt="avatar"
            class="w-12 h-12 rounded-full object-cover shadow"
          />
        </div>
        <div>
          <h3 class="text-xl font-bold mb-1 text-blue-700">{{ selectedArticle.title }}</h3>
          <p class="text-gray-500 text-sm">{{ formatDate(selectedArticle.date) }}</p>
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
            :src="article.avatar"
            alt="avatar"
            class="w-10 h-10 rounded-full object-cover shadow"
          />
        </div>
        <div>
          <h3 class="font-semibold text-lg mb-1 text-blue-700 group-hover:underline">{{ article.title }}</h3>
          <p class="text-gray-500 text-sm mb-1">{{ formatDate(article.date) }}</p>
          <p class="text-gray-700 text-sm line-clamp-2">{{ article.summary }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const articles = ref([])
const selectedArticle = ref(null)

function formatDate(dateStr) {
  if (!dateStr) return '-'
  const d = new Date(dateStr)
  return d.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })
}

async function fetchArticles() {
  try {
    const res = await $fetch('/api/artikel')
    // Jika response berupa array langsung
    articles.value = Array.isArray(res) ? res : (res.data || [])
  } catch (error) {
    console.error('Gagal mengambil artikel:', error)
  }
}

onMounted(fetchArticles)
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