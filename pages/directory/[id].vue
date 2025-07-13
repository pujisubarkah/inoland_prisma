<template>
  <div
    v-if="!loading && !error"
    class="pdf-container"
  >
    <h1 class="pdf-title">{{ inovasiDetail.pdf_judul }}</h1>
    <p class="pdf-publisher">{{ inovasiDetail.pdf_publisher }}</p>

    <div class="download-button">
      <a
        :href="inovasiDetail.pdf_download"
        download
        class="btn-download"
      >
        Download PDF
      </a>
    </div>

    <div class="pdf-embed">
      <iframe
        :src="inovasiDetail.pdf_url"
        frameborder="0"
        allowfullscreen
        scrolling="no"
      ></iframe>
    </div>
  </div>

  <p v-if="loading">Loading...</p>
  <p v-if="error">Error fetching PDF: {{ error }}</p>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const id = route.params.id

const inovasiDetail = ref(null)
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const { data } = await axios.get(`/api/pdflist/${id}`)
    inovasiDetail.value = data
  } catch (err) {
    error.value = err.message
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
