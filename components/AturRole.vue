<script setup>
import { ref, computed, onMounted } from 'vue'


const users = ref([])
const roles = ref([])
const isLoading = ref(true)
const currentPage = ref(1)
const itemsPerPage = 5
const editUser = ref(null)
const selectedRoleId = ref(null)

const fetchData = async () => {
  isLoading.value = true
  try {
    const usersRes = await $fetch('/api/pengguna')
    const rolesRes = await $fetch('/api/roles')
    users.value = usersRes.data
    roles.value = rolesRes.data
  } catch (error) {
    console.error('Error fetching data:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchData()
})

const indexOfLastItem = computed(() => currentPage.value * itemsPerPage)
const indexOfFirstItem = computed(() => indexOfLastItem.value - itemsPerPage)
const currentItems = computed(() => users.value.slice(indexOfFirstItem.value, indexOfLastItem.value))
const totalPages = computed(() => Math.ceil(users.value.length / itemsPerPage))

const handleEditClick = (user) => {
  editUser.value = user
  selectedRoleId.value = user.role?.id || null
}

const handleCloseEdit = () => {
  editUser.value = null
  selectedRoleId.value = null
}

const handleRoleChange = async () => {
  if (!editUser.value || !selectedRoleId.value) return

  try {
    await axios.put(`/api/pengguna/${editUser.value.id}`, {
      role_id: selectedRoleId.value,
    })

    users.value = users.value.map((user) =>
      user.id === editUser.value.id
        ? { ...user, role: { role_name: roles.value.find(r => r.id === selectedRoleId.value).role_name } }
        : user
    )
    alert('Role berhasil diubah.')
    handleCloseEdit()
  } catch (error) {
    console.error('Error updating role:', error)
    alert('Gagal mengubah role pengguna.')
  }
}

const handleDeleteUser = async (id) => {
  if (!confirm('Apakah Anda yakin ingin menghapus pengguna ini?')) return
  try {
    await axios.delete(`/api/pengguna/${id}`)
    users.value = users.value.filter(user => user.id !== id)
    alert('Pengguna berhasil dihapus.')
  } catch (error) {
    console.error('Error deleting user:', error)
    alert('Gagal menghapus pengguna.')
  }
}
</script>

<template>
  <div class="w-full mt-24">
    <h1 class="text-3xl font-extrabold text-center mb-4 font-poppins text-blue-700 drop-shadow">Daftar Pengguna</h1>
    <hr class="w-32 h-1 bg-gradient-to-r from-blue-700 via-cyan-400 to-blue-700 mx-auto mb-8 rounded" />

    <div class="w-full flex justify-center mt-16">
      <p v-if="isLoading" class="text-center text-blue-700 font-semibold">Loading...</p>

      <table v-else class="border-collapse table-auto w-11/12 text-sm shadow-xl rounded-xl overflow-hidden bg-white">
        <thead>
          <tr class="bg-gradient-to-r from-blue-700 via-blue-400 to-cyan-400 text-white">
            <th class="border-b text-base font-semibold p-4 text-left">No</th>
            <th class="border-b text-base font-semibold p-4 text-left">Nama</th>
            <th class="border-b text-base font-semibold p-4 text-left">Email</th>
            <th class="border-b text-base font-semibold p-4 text-left">Instansi</th>
            <th class="border-b text-base font-semibold p-4 text-left">Role</th>
            <th class="border-b text-base font-semibold p-4 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in currentItems" :key="user.id" class="hover:bg-blue-50 transition">
            <td class="border-b p-4 font-bold text-blue-700">{{ indexOfFirstItem + index + 1 }}</td>
            <td class="border-b p-4 font-bold text-blue-700">{{ user.nama_lengkap }}</td>
            <td class="border-b p-4 font-bold text-blue-700">{{ user.email }}</td>
            <td class="border-b p-4 font-bold text-blue-700">{{ user.instansi }}</td>
            <td class="border-b p-4 font-bold text-blue-700">{{ user.role?.role_name }}</td>
            <td class="border-b p-4 font-bold flex gap-2">
              <button @click="() => handleEditClick(user)" class="text-blue-600 hover:text-blue-700 bg-white border border-blue-200 rounded-lg px-3 py-1 shadow hover:scale-110 transition">
                ✏️ Edit
              </button>
              <button @click="() => handleDeleteUser(user.id)" class="text-red-600 hover:text-red-700 bg-white border border-red-200 rounded-lg px-3 py-1 shadow hover:scale-110 transition">
                🗑️ Hapus
              </button>
            </td>
          </tr>
          <tr v-if="currentItems.length === 0">
            <td colspan="6" class="text-center p-4 text-blue-700">Tidak ada pengguna ditemukan.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex justify-center mt-8 gap-2">
      <button
        @click="currentPage--"
        :disabled="currentPage === 1"
        class="px-5 py-2 bg-gradient-to-r from-blue-700 to-cyan-400 text-white font-bold rounded-lg shadow hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      <span class="px-4 py-2 font-semibold text-blue-700 bg-white rounded shadow">
        {{ currentPage }} / {{ totalPages }}
      </span>
      <button
        @click="currentPage++"
        :disabled="currentPage === totalPages"
        class="px-5 py-2 bg-gradient-to-r from-blue-700 to-cyan-400 text-white font-bold rounded-lg shadow hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>

    <!-- Modal Edit Role -->
    <div v-if="editUser" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-8 rounded-xl shadow-2xl w-[400px]">
        <h3 class="text-xl font-bold mb-4 text-blue-700 text-center">Edit Role untuk <span class="text-cyan-600">{{ editUser.nama_lengkap }}</span></h3>
        <select class="w-full p-3 border border-blue-300 rounded-lg mb-6 text-blue-700 font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-400" v-model="selectedRoleId">
          <option disabled value="">Pilih Role</option>
          <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.role_name }}</option>
        </select>
        <div class="flex justify-end gap-2">
          <button @click="handleCloseEdit" class="bg-red-500 text-white py-2 px-5 rounded-lg font-bold shadow hover:bg-red-600 transition">Batal</button>
          <button @click="handleRoleChange" class="bg-gradient-to-r from-blue-700 via-blue-400 to-cyan-400 text-white py-2 px-5 rounded-lg font-bold shadow hover:scale-105 hover:shadow-xl transition-all">Simpan</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.font-poppins {
  font-family: 'Poppins', sans-serif;
}
</style>
