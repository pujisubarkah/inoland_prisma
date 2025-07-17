<template>
  <div class="p-4">
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-20">
      <div class="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
        <svg class="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 15.5c-.77.833.192 2.5 1.732 2.5z"/>
        </svg>
        <h3 class="text-lg font-medium text-red-800 mb-2">Error</h3>
        <p class="text-red-600">{{ error }}</p>
        <NuxtLink 
          to="/referensi/direktori" 
          class="inline-block mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Kembali ke Direktori
        </NuxtLink>
      </div>
    </div>

    <!-- Content -->
    <div v-else-if="inovasiDetail" class="max-w-4xl mx-auto">
      <!-- Back Button -->
      <div class="mb-6">
        <NuxtLink 
          to="/referensi/direktori" 
          class="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          Kembali ke Direktori
        </NuxtLink>
      </div>

      <div class="pdf-container">
        <h1 class="pdf-title">{{ inovasiDetail.pdf_judul }}</h1>
        <p class="pdf-publisher">{{ inovasiDetail.pdf_publisher }}</p>

        <div class="download-button">
          <a
            v-if="inovasiDetail.pdf_download || inovasiDetail.pdf_url"
            :href="inovasiDetail.pdf_download || inovasiDetail.pdf_url"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-download"
          >
            Download PDF
          </a>
        </div>

        <div v-if="inovasiDetail.pdf_url" class="pdf-embed">
          <iframe
            :src="inovasiDetail.pdf_url"
            frameborder="0"
            allowfullscreen
            scrolling="no"
          ></iframe>
        </div>
        
        <div v-else class="text-center py-10">
          <p class="text-gray-500">PDF tidak tersedia untuk ditampilkan</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

// Use the referensi layout
definePageMeta({
  layout: 'referensi'
})

const route = useRoute()
const id = route.params.id

const inovasiDetail = ref(null)
const loading = ref(true)
const error = ref(null)

// Meta
useHead(() => ({
  title: inovasiDetail.value ? `${inovasiDetail.value.pdf_judul} | INOLAND` : 'Detail Dokumen | INOLAND',
  meta: [
    {
      name: 'description',
      content: inovasiDetail.value ? `${inovasiDetail.value.pdf_judul} - ${inovasiDetail.value.pdf_publisher}` : 'Detail dokumen inovasi daerah'
    }
  ]
}))

onMounted(async () => {
  try {
    loading.value = true
    error.value = null
    
    const response = await axios.get(`/api/pdflist/${id}`)
    
    if (response && response.data) {
      inovasiDetail.value = response.data
    } else {
      error.value = 'Data tidak ditemukan'
    }
  } catch (err) {
    console.error('Error fetching PDF detail:', err)
    if (err.response?.status === 404) {
      error.value = 'Dokumen tidak ditemukan'
    } else if (err.response?.status === 400) {
      error.value = 'ID dokumen tidak valid'
    } else {
      error.value = `Terjadi kesalahan: ${err.message}`
    }
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.pdf-container {
  padding: 30px;
  max-width: 1200px;
  margin: 20px auto;
  background: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.pdf-title {
  font-size: 2.5em;
  font-weight: bold;
  font-family: Georgia, serif;
}

.pdf-publisher {
  font-size: 1.2em;
  color: #555;
}

.download-button {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.btn-download {
  padding: 12px 24px;
  background-color: #007BFF;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-size: 1em;
  font-weight: bold;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

.btn-download:hover {
  background-color: #0056b3;
}

.pdf-embed {
  position: relative;
  padding-top: max(60%, 324px);
  width: 100%;
  height: 0;
  margin-top: 20px;
}

.pdf-embed iframe {
  position: absolute;
  border: none;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
</style>
