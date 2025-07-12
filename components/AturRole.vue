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
    <h1 class="text-2xl font-bold text-center mb-4 font-poppins">User List</h1>
    <hr class="w-24 h-0.5 bg-gradient-to-r from-red-500 via-black to-red-500 mx-auto mb-8" />

    <div class="w-full flex justify-center mt-16">
      <p v-if="isLoading" class="text-center">Loading...</p>

      <table v-else class="border-collapse table-auto w-11/12 text-sm self-center">
        <thead>
          <tr>
            <th class="border-b p-4 text-left">No</th>
            <th class="border-b p-4 text-left">Nama</th>
            <th class="border-b p-4 text-left">Email</th>
            <th class="border-b p-4 text-left">Instansi</th>
            <th class="border-b p-4 text-left">Role</th>
            <th class="border-b p-4 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in currentItems" :key="user.id" class="hover:bg-gray-50">
            <td class="border-b p-4 font-bold">{{ indexOfFirstItem + index + 1 }}</td>
            <td class="border-b p-4 font-bold">{{ user.nama_lengkap }}</td>
            <td class="border-b p-4 font-bold">{{ user.email }}</td>
            <td class="border-b p-4 font-bold">{{ user.instansi }}</td>
            <td class="border-b p-4 font-bold">{{ user.role?.role_name }}</td>
            <td class="border-b p-4 font-bold flex space-x-4">
              <button @click="() => handleEditClick(user)" class="text-blue-600 hover:text-blue-500">Edit</button>
              <button @click="() => handleDeleteUser(user.id)" class="text-red-600 hover:text-red-500">Delete</button>
            </td>
          </tr>
          <tr v-if="currentItems.length === 0">
            <td colspan="6" class="text-center p-4">No users found.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex justify-center mt-4 items-center">
      <button @click="currentPage--" :disabled="currentPage === 1" class="px-4 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50">Previous</button>
      <span class="mx-2">Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="currentPage++" :disabled="currentPage === totalPages" class="px-4 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50">Next</button>
    </div>

    <div v-if="editUser" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded shadow-md w-96">
        <h3 class="text-lg font-bold mb-4">Edit Role for {{ editUser.nama_lengkap }}</h3>
        <select class="w-full p-2 border rounded mb-4" v-model="selectedRoleId">
          <option disabled value="">Select a role</option>
          <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.role_name }}</option>
        </select>
        <div class="flex justify-end space-x-2">
          <button @click="handleCloseEdit" class="bg-red-500 text-white py-2 px-4 rounded">Cancel</button>
          <button @click="handleRoleChange" class="bg-blue-500 text-white py-2 px-4 rounded">Rubah</button>
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
