<template>
  <div class="p-4 sm:p-6 lg:p-8">
    <div class="mb-6 sm:mb-8">
      <h2 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Artikel Inovasi</h2>
      <p class="text-gray-600 text-sm sm:text-base">Kumpulan artikel terkait inovasi dan pengembangan daerah</p>
    </div>
    
    <!-- Selected Article View -->
    <div v-if="selectedArticle" class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div class="p-6 sm:p-8">
        <button 
          class="mb-6 text-blue-600 hover:text-blue-700 font-medium flex items-center group transition-colors duration-200 min-h-[44px] touch-action-manipulation" 
          @click="selectedArticle = null"
        >
          <svg class="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Kembali ke daftar artikel
        </button>
        
        <div class="mb-6">
          <h1 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 leading-tight">{{ selectedArticle.title }}</h1>
          <div class="flex items-center text-gray-500 text-sm">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {{ formatDate(selectedArticle.date) }}
          </div>
        </div>
        
        <div class="prose prose-gray prose-lg max-w-none leading-relaxed text-gray-700" v-html="selectedArticle.content"></div>
      </div>
    </div>
    
    <!-- Articles List -->
    <div v-else>
      <div class="grid gap-4 sm:gap-6">
        <div
          v-for="article in articles"
          :key="article.id"
          class="group bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 hover:border-blue-200 cursor-pointer transition-all duration-300 overflow-hidden"
          @click="selectedArticle = article"
        >
          <div class="p-6">
            <div class="flex items-start justify-between">
              <div class="flex-1 min-w-0">
                <h3 class="text-lg sm:text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-200 leading-tight">
                  {{ article.title }}
                </h3>
                <div class="flex items-center text-gray-500 text-sm mb-3">
                  <svg class="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {{ formatDate(article.date) }}
                </div>
                <p class="text-gray-600 text-sm sm:text-base line-clamp-3 leading-relaxed">
                  {{ article.summary }}
                </p>
              </div>
              <div class="ml-4 flex-shrink-0">
                <div class="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-200">
                  <svg class="w-5 h-5 text-blue-600 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Bottom gradient border on hover -->
          <div class="h-1 bg-gradient-to-r from-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </div>
      </div>
      
      <!-- Empty State -->
      <div v-if="articles.length === 0" class="text-center py-12">
        <div class="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-800 mb-2">Belum ada artikel</h3>
        <p class="text-gray-500 text-sm">Artikel inovasi akan ditampilkan di sini</p>
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
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.prose {
  line-height: 1.75;
}

.prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
  color: #1f2937;
  font-weight: 600;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
}

.prose p {
  margin-bottom: 1em;
}

.prose ul, .prose ol {
  padding-left: 1.5em;
  margin-bottom: 1em;
}

.prose li {
  margin-bottom: 0.25em;
}

.prose a {
  color: #2563eb;
  text-decoration: underline;
}

.prose a:hover {
  color: #1d4ed8;
}

.prose blockquote {
  border-left: 4px solid #e5e7eb;
  padding-left: 1em;
  margin: 1.5em 0;
  font-style: italic;
  color: #6b7280;
}

.prose img {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
  margin: 1.5em 0;
}

.prose code {
  background-color: #f3f4f6;
  padding: 0.125em 0.25em;
  border-radius: 0.25rem;
  font-size: 0.875em;
}

.prose pre {
  background-color: #1f2937;
  color: #f9fafb;
  padding: 1em;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 1.5em 0;
}

.prose pre code {
  background-color: transparent;
  padding: 0;
  color: inherit;
}

/* Touch targets for mobile */
@media (max-width: 767px) {
  button, .cursor-pointer {
    min-height: 44px;
    touch-action: manipulation;
  }
}

/* Smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

.transition-colors {
  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.transition-transform {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hover effects */
.group:hover .group-hover\:scale-x-100 {
  transform: scaleX(1);
}

.group:hover .group-hover\:translate-x-0\.5 {
  transform: translateX(0.125rem);
}

.group:hover .group-hover\:-translate-x-1 {
  transform: translateX(-0.25rem);
}

.group:hover .group-hover\:text-blue-600 {
  color: #2563eb;
}

.group:hover .group-hover\:bg-blue-100 {
  background-color: #dbeafe;
}

/* Custom scrollbar for content */
.prose::-webkit-scrollbar {
  width: 8px;
}

.prose::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

.prose::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

.prose::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>