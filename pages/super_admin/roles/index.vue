<script setup>
import { ref, computed, onMounted } from 'vue'
import { toast } from 'vue-sonner'

const roles = ref([])
const isLoading = ref(true)
const currentPage = ref(1)
const itemsPerPage = 10

const fetchRoles = async () => {
  isLoading.value = true
  try {
    const res = await $fetch('/api/roles')
    roles.value = res.data ?? []
  } catch (err) {
    console.error('Error fetching roles:', err)
    roles.value = []
    toast.error('Gagal memuat roles.')
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchRoles)

const indexOfLastItem = computed(() => currentPage.value * itemsPerPage)
const indexOfFirstItem = computed(() => indexOfLastItem.value - itemsPerPage)
const currentItems = computed(() => roles.value.slice(indexOfFirstItem.value, indexOfLastItem.value))
const totalPages = computed(() => Math.max(1, Math.ceil(roles.value.length / itemsPerPage)))

const handleRefresh = () => fetchRoles()
</script>

<template>
  <div class="w-full mt-8">
    <h1 class="text-3xl font-extrabold text-center mb-4 font-poppins text-blue-700">Roles</h1>
    <div class="w-11/12 mx-auto mb-4 flex justify-end">
      <button @click="handleRefresh" class="px-4 py-2 bg-blue-600 text-white rounded">Refresh</button>
    </div>

    <div class="w-11/12 mx-auto bg-white shadow rounded overflow-hidden">
      <table class="min-w-full text-sm">
        <thead class="bg-gradient-to-r from-blue-700 via-blue-400 to-cyan-400 text-white">
          <tr>
            <th class="p-4 text-left">No</th>
            <th class="p-4 text-left">ID</th>
            <th class="p-4 text-left">Role Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(r, idx) in currentItems" :key="r.id" class="odd:bg-gray-50 hover:bg-blue-50">
            <td class="p-4">{{ indexOfFirstItem + idx + 1 }}</td>
            <td class="p-4">{{ r.id }}</td>
            <td class="p-4">{{ r.role_name }}</td>
          </tr>
          <tr v-if="!isLoading && roles.length === 0"><td class="p-4 text-center" colspan="3">Tidak ada roles.</td></tr>
          <tr v-if="isLoading"><td class="p-4 text-center" colspan="3">Memuat...</td></tr>
        </tbody>
      </table>
    </div>

    <div class="flex justify-center mt-6 gap-2">
      <button @click="currentPage--" :disabled="currentPage === 1" class="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50">Prev</button>
      <span class="px-4 py-2 bg-white rounded shadow">{{ currentPage }} / {{ totalPages }}</span>
      <button @click="currentPage++" :disabled="currentPage === totalPages" class="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50">Next</button>
    </div>
  </div>
</template>

<style scoped>
.font-poppins { font-family: 'Poppins', sans-serif; }
</style>
