<template>
  <div class="p-6">
    <h1 class="text-xl font-semibold mb-4">SDGs</h1>

    <div v-if="loading" class="text-sm text-gray-500">Memuat SDGs...</div>

    <div v-else class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
      <div
        v-for="(sdg, idx) in sdgs"
        :key="sdg.id || idx"
        class="flex flex-col items-center text-center p-2 bg-white border rounded"
      >
        <img
          :src="sdgSrcs[idx] || sdg.svg_url || sdg.icon_svg || ''"
          :alt="sdg.name || sdg.title || 'SDG'"
          class="w-16 h-16 object-contain mb-2"
          @error="onImgError(idx)"
        />
        <div class="text-xs text-gray-700">{{ sdg.name || sdg.title }}</div>
      </div>
    </div>

    <div v-if="!loading && !sdgs.length" class="mt-4 text-sm text-gray-500">Tidak ada data SDGs.</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const sdgs = ref([])
const sdgSrcs = ref([])
const loading = ref(true)

try {
  const { data: res } = await useFetch('/api/sdgs')
  const items = res?.value?.data ?? res?.value ?? []
  sdgs.value = Array.isArray(items) ? items : []
  sdgSrcs.value = sdgs.value.map(s => s.svg_url || s.icon_svg || '')
} catch (e) {
  sdgs.value = []
  sdgSrcs.value = []
} finally {
  loading.value = false
}

function onImgError(idx) {
  const s = sdgs.value[idx]
  if (!s) return
  if (s.png_base64) {
    sdgSrcs[idx] = `data:image/png;base64,${s.png_base64}`
    return
  }
  if (s.png_url) {
    sdgSrcs[idx] = s.png_url
    return
  }
  sdgSrcs[idx] = ''
}
</script>

<style scoped>
/* minimal styling; project uses Tailwind so keep it small */
</style>
