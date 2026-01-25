<script setup>
import { ref, computed, onMounted } from 'vue'
import { toast } from 'vue-sonner'

const users = ref([])
const roles = ref([])
const isLoading = ref(true)
const currentPage = ref(1)
const itemsPerPage = 5
const editUser = ref(null)
const selectedRoleId = ref(null)
const selectedVerified = ref(null)
const isAddModalOpen = ref(false)
const addForm = ref({
  nama_lengkap: '',
  username: '',
  instansi: '',
  email: '',
  password: '',
  confirm: ''
})

const fetchData = async () => {
  isLoading.value = true
  try {
    const usersRes = await $fetch('/api/users')
    const rolesRes = await $fetch('/api/roles')
    users.value = usersRes.data ?? []
    roles.value = rolesRes.data ?? []
  } catch (error) {
    console.error('Error fetching data:', error)
    users.value = []
    roles.value = []
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
  selectedRoleId.value = user.role_id || null
  selectedVerified.value = user.is_verified
}

const handleCloseEdit = () => {
  editUser.value = null
  selectedRoleId.value = null
  selectedVerified.value = null
}

const handleRoleChange = async () => {
  if (!editUser.value || selectedRoleId.value === null || selectedVerified.value === null) return
  try {
    await $fetch(`/api/users/${editUser.value.id}`, {
      method: 'PUT',
      body: {
        role_id: selectedRoleId.value,
        is_verified: selectedVerified.value
      }
    })
    users.value = users.value.map((user) =>
      user.id === editUser.value.id
        ? { ...user, role_id: selectedRoleId.value, is_verified: selectedVerified.value }
        : user
    )
    toast.success('Role & verifikasi berhasil diubah.')
    handleCloseEdit()
  } catch (error) {
    console.error('Error updating user:', error)
    toast.error('Gagal mengubah data pengguna.')
  }
}

const handleDeleteUser = async (id) => {
  if (!confirm('Apakah Anda yakin ingin menghapus pengguna ini?')) return
  try {
    await $fetch(`/api/users/${id}`, { method: 'DELETE' })
    users.value = users.value.filter(user => user.id !== id)
    toast.success('Pengguna berhasil dihapus.')
  } catch (error) {
    console.error('Error deleting user:', error)
    toast.error('Gagal menghapus pengguna.')
  }
}

const handleAddUser = async () => {
  try {
    const res = await $fetch('/api/registrasi', {
      method: 'POST',
      body: addForm.value
    })
    toast.success('Pengguna berhasil ditambahkan!')
    isAddModalOpen.value = false
    addForm.value = {
      nama_lengkap: '',
      username: '',
      instansi: '',
      email: '',
      password: '',
      confirm: ''
    }
    fetchData()
  } catch (error) {
    console.error('Error add user:', error)
    toast.error('Gagal menambah pengguna.')
  }
}

const handleCloseAdd = () => {
  isAddModalOpen.value = false
  addForm.value = {
    nama_lengkap: '',
    username: '',
    instansi: '',
    email: '',
    password: '',
    confirm: ''
  }
}
</script>

<template>
  <div class="w-full mt-24">
    <h1 class="text-3xl font-extrabold text-center mb-4 font-poppins text-blue-700 drop-shadow">Daftar Pengguna</h1>
    <hr class="w-32 h-1 bg-gradient-to-r from-blue-700 via-cyan-400 to-blue-700 mx-auto mb-8 rounded" />

    <div class="w-11/12 mx-auto mb-6 flex justify-between items-center">
      <div></div>
      <button
        @click="isAddModalOpen = true"
        class="bg-gradient-to-r from-cyan-400 to-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow hover:bg-white hover:text-blue-700 transition"
        style="margin-left:auto"
      >
        + Tambah Pengguna
      </button>
    </div>
    <table class="border-collapse table-auto w-11/12 text-sm shadow-xl rounded-xl overflow-hidden bg-white ml-20">
      <thead>
        <tr class="bg-gradient-to-r from-blue-700 via-blue-400 to-cyan-400 text-white">
          <th class="border-b text-base font-semibold p-4 text-left">No</th>
          <th class="border-b text-base font-semibold p-4 text-left">Nama</th>
          <th class="border-b text-base font-semibold p-4 text-left">Email</th>
          <th class="border-b text-base font-semibold p-4 text-left">Instansi</th>
          <th class="border-b text-base font-semibold p-4 text-left">Role</th>
          <th class="border-b text-base font-semibold p-4 text-left">Verifikasi</th>
          <th class="border-b text-base font-semibold p-4 text-left">Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in currentItems" :key="user.id" class="hover:bg-blue-50 transition">
          <td class="border-b p-4 font-bold text-blue-700">{{ indexOfFirstItem + index + 1 }}</td>
          <td class="border-b p-4 font-bold text-blue-700">{{ user.nama_lengkap }}</td>
          <td class="border-b p-4 font-bold text-blue-700">{{ user.email }}</td>
          <td class="border-b p-4 font-bold text-blue-700">{{ user.instansi }}</td>
          <td class="border-b p-4 font-bold text-blue-700">{{ (roles.value ?? []).find(r => r.id === user.role_id)?.role_name || '-' }}</td>
          <td class="border-b p-4 font-bold text-blue-700">
            <span v-if="user.is_verified" class="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">Terverifikasi</span>
            <span v-else class="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-bold">Belum</span>
          </td>
          <td class="border-b p-4 font-bold flex gap-2">
            <button @click="() => handleEditClick(user)" class="text-blue-600 hover:text-blue-700 bg-white border border-blue-200 rounded-lg px-3 py-1 shadow hover:scale-110 transition">✏️ Edit</button>
            <button @click="() => handleDeleteUser(user.id)" class="text-red-600 hover:text-red-700 bg-white border border-red-200 rounded-lg px-3 py-1 shadow hover:scale-110 transition">🗑️ Hapus</button>
          </td>
        </tr>
        <tr v-if="currentItems.length === 0"><td colspan="7" class="text-center p-4 text-blue-700">Tidak ada pengguna ditemukan.</td></tr>
      </tbody>
    </table>

    <div class="flex justify-center mt-8 gap-2">
      <button @click="currentPage--" :disabled="currentPage === 1" class="px-5 py-2 bg-gradient-to-r from-blue-700 to-cyan-400 text-white font-bold rounded-lg shadow hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed">Previous</button>
      <span class="px-4 py-2 font-semibold text-blue-700 bg-white rounded shadow">{{ currentPage }} / {{ totalPages }}</span>
      <button @click="currentPage++" :disabled="currentPage === totalPages" class="px-5 py-2 bg-gradient-to-r from-blue-700 to-cyan-400 text-white font-bold rounded-lg shadow hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed">Next</button>
    </div>

    <!-- Modals omitted for brevity (copied from original) -->
  </div>
</template>

<style scoped>
.font-poppins { font-family: 'Poppins', sans-serif; }
.form-label { min-width: 120px; font-size: 1rem; font-weight: 600; color: #2563eb; padding-right: 8px; text-align: right; }
.form-input { flex: 1; border: 2px solid #38bdf8; border-radius: 10px; padding: 10px 14px; font-size: 1rem; background: linear-gradient(90deg, #f8fafc 80%, #e0f2fe 100%); transition: border 0.2s, box-shadow 0.2s; box-shadow: 0 2px 8px rgba(37,99,235,0.08); }
.form-input:focus { border-color: #2563eb; box-shadow: 0 0 0 2px #bae6fd; outline: none; }
@media (max-width: 600px) { .mb-4.flex.items-center.gap-4 { flex-direction: column; align-items: stretch; gap: 2px; } .form-label { text-align: left; min-width: 0; margin-bottom: 2px; padding-right: 0; } }
</style>
