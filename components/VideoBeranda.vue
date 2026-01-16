<template>
  <section class="bg-white rounded-xl shadow-lg p-6 lg:p-8">

    <!-- Header -->
    <div class="text-center mb-8">
      <h2 class="text-3xl font-bold text-blue-800">
        Ekosistem Inovasi INOLAND
      </h2>
      <p class="text-gray-600 text-sm mt-2">
        Inspirasi, wawasan, dan agenda penguatan inovasi pemerintahan.
      </p>
    </div>

    <!-- GRID UTAMA -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

      <!-- KOLOM KIRI: VIDEO -->
      <div
        class="text-white p-4 rounded-xl shadow-md"
        style="background: linear-gradient(90deg, #0a3570, #2563eb);"
      >
        <iframe
          class="w-full h-48 md:h-56 rounded-lg mb-4"
          src="https://www.youtube.com/embed/SeE5cBzl26Q"
          title="INOLAND Video"
          frameborder="0"
          allowfullscreen
        ></iframe>

        <h3 class="font-bold text-lg mb-2">
          Kolaborasi untuk Perubahan
        </h3>
        <p class="text-sm text-blue-100">
          INOLAND sebagai ekosistem kolaboratif untuk mendorong inovasi pemerintahan
          yang berdampak bagi daerah.
        </p>
      </div>

      <!-- KOLOM KANAN: ARTIKEL + AGENDA -->
      <div class="space-y-6">

        <!-- ARTIKEL -->
        <div class="border rounded-xl p-4 hover:shadow-md transition">
          <h3 class="text-xl font-bold text-blue-800 mb-4">
            Artikel Terbaru
          </h3>

          <ul class="space-y-3 text-sm">
            <li v-for="article in articles.slice(0, 3)" :key="article.id">
              <NuxtLink to="/referensi/artikel"
                class="font-semibold text-gray-800 hover:text-blue-700">
                {{ article.title }}
              </NuxtLink>
              <div class="text-xs text-gray-500 mt-1">
                {{ formatDate(article.date) }}
              </div>
            </li>
          </ul>

          <!-- Empty State -->
          <div v-if="articles.length === 0" class="text-center py-4">
            <p class="text-gray-500 text-sm">Belum ada artikel</p>
          </div>

          <div class="mt-4">
            <NuxtLink to="/referensi/artikel"
              class="text-sm font-semibold text-blue-700 hover:underline">
              Lihat Semua Artikel →
            </NuxtLink>
          </div>
        </div>

        <!-- AGENDA RINGKAS -->
        <div class="border rounded-xl p-4 bg-blue-50">
          <h4 class="font-bold text-blue-800 mb-3 text-sm">
            Agenda INOLAND 2026 (Terdekat)
          </h4>

          <ul class="space-y-2 text-sm">
            <li>
              <span class="text-blue-600 font-semibold">12 Mar</span>
              <span class="ml-2 text-gray-800">
                Webinar Inovasi Pelayanan Publik
              </span>
            </li>
            <li>
              <span class="text-blue-600 font-semibold">7 Mei</span>
              <span class="ml-2 text-gray-800">
                Forum Inovasi Pemerintah Daerah
              </span>
            </li>
          </ul>

          <div class="mt-3">
            <NuxtLink to="/agenda"
              class="text-xs font-semibold text-blue-700 hover:underline">
              Lihat Agenda Lengkap →
            </NuxtLink>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const articles = ref([])

async function fetchArticles() {
  try {
    const res = await $fetch('/api/artikel')
    articles.value = Array.isArray(res) ? res : (res.data || [])
  } catch (error) {
    console.error('Gagal mengambil artikel:', error)
  }
}

function formatDate(dateStr) {
  if (!dateStr) return '-'
  const d = new Date(dateStr)
  return d.toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })
}

onMounted(fetchArticles)
</script>
