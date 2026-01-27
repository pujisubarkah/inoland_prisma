<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Tulisan Inovasi</h1>

    <div v-if="pending" class="text-gray-600">Memuat...</div>

    <ul v-else>
      <li v-for="item in items" :key="item.id" class="mb-4 p-4 border rounded">
        <div class="flex justify-between items-start">
          <div>
            <h2 class="font-semibold text-lg">{{ item.nama_inovasi }}</h2>
            <p class="text-sm text-gray-600">{{ item.nama_instansi }} • {{ item.tahun_inisiasi || item.tahun_implementasi || '—' }}</p>
          </div>
          <NuxtLink :to="`/referensi/tulisan_inovasi/${item.id}`" class="text-blue-600">Detail</NuxtLink>
        </div>
        <p class="mt-2 text-sm text-gray-700" v-if="item.deskripsi">{{ item.deskripsi }}</p>
      </li>
    </ul>

    <div class="flex items-center gap-3 mt-4">
      <button @click="prev" :disabled="page <= 1" class="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">Prev</button>
      <div>Halaman {{ page }} dari {{ totalPages }}</div>
      <button @click="next" :disabled="page >= totalPages" class="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">Next</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const page = ref(1)
const limit = ref(10)

interface TulisanInovasiItem {
  id: number
  created_at: string | null
  document_id: string | null
  nama_inovasi: string | null
  penggagas: string | null
  deskripsi: string | null
  nama_instansi?: string | null
  tahun_inisiasi?: string | null
  tahun_implementasi?: string | null
  // ...add other fields as needed
  locale: string | null
}

interface TulisanInovasiResponse {
  success: boolean
  data: TulisanInovasiItem[]
  pagination: {
    totalPages: number
    // ...add other pagination fields as needed
  }
  error?: undefined
  message?: undefined
}

const { data, pending } = useFetch<TulisanInovasiResponse>('/api/tulisan_inovasi', {
  params: { page, limit }
})

const items = computed(() =>
  data.value && data.value.success ? data.value.data : []
)
const totalPages = computed(() =>
  data.value && data.value.success && data.value.pagination
    ? data.value.pagination.totalPages
    : 1
)

function prev() {
  if (page.value > 1) page.value--
}

function next() {
  if (page.value < totalPages.value) page.value++
}
</script>
