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
    <h1 class="text-3xl font-extrabold text-center mb-4 font-poppins text-blue-700">Daftar Pengguna</h1>
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
    <div class="w-11/12 mx-auto bg-white shadow rounded overflow-hidden">
      <table class="min-w-full text-sm">
        <thead class="bg-gradient-to-r from-blue-700 via-blue-400 to-cyan-400 text-white">
          <tr>
            <th class="p-4 text-left">No</th>
            <th class="p-4 text-left">Nama</th>
            <th class="p-4 text-left">Email</th>
            <th class="p-4 text-left">Instansi</th>
            <th class="p-4 text-left">Role</th>
            <th class="p-4 text-left">Verifikasi</th>
            <th class="p-4 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in currentItems" :key="user.id" class="odd:bg-gray-50 hover:bg-blue-50">
            <td class="p-4">{{ indexOfFirstItem + index + 1 }}</td>
            <td class="p-4">{{ user.nama_lengkap }}</td>
            <td class="p-4">{{ user.email }}</td>
            <td class="p-4">{{ user.instansi }}</td>
            <td class="p-4">{{ (roles.value ?? []).find(r => r.id === user.role_id)?.role_name || '-' }}</td>
            <td class="p-4">
              <span v-if="user.is_verified" class="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">Terverifikasi</span>
              <span v-else class="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-bold">Belum</span>
            </td>
            <td class="p-4">
              <div class="flex items-center gap-2 whitespace-nowrap">
                <button @click="() => handleEditClick(user)" class="text-blue-600 hover:text-blue-700 bg-white border border-blue-200 rounded-lg px-3 py-1 shadow hover:scale-110 transition">✏️ Edit</button>
                <button @click="() => handleDeleteUser(user.id)" class="text-red-600 hover:text-red-700 bg-white border border-red-200 rounded-lg px-3 py-1 shadow hover:scale-110 transition">🗑️ Hapus</button>
              </div>
            </td>
          </tr>
          <tr v-if="currentItems.length === 0"><td colspan="7" class="text-center p-4">Tidak ada pengguna ditemukan.</td></tr>
        </tbody>
      </table>
    </div>

    <div class="flex justify-center mt-8 gap-2">
      <button @click="currentPage--" :disabled="currentPage === 1" class="px-5 py-2 bg-gradient-to-r from-blue-700 to-cyan-400 text-white font-bold rounded-lg shadow hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed">Previous</button>
      <span class="px-4 py-2 font-semibold text-blue-700 bg-white rounded shadow">{{ currentPage }} / {{ totalPages }}</span>
      <button @click="currentPage++" :disabled="currentPage === totalPages" class="px-5 py-2 bg-gradient-to-r from-blue-700 to-cyan-400 text-white font-bold rounded-lg shadow hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed">Next</button>
    </div>

    <!-- Add User Modal -->
    <div v-if="isAddModalOpen" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="absolute inset-0 bg-black/60" @click="handleCloseAdd"></div>
      <div class="relative bg-white rounded-lg w-full max-w-2xl p-6 shadow-xl">
        <h2 class="text-xl font-semibold mb-4">Tambah Pengguna</h2>
        <form @submit.prevent="handleAddUser" class="space-y-3">
          <div class="space-y-3">
            <div class="flex flex-col md:flex-row md:items-center gap-3">
              <label class="text-sm font-medium text-gray-700 md:w-32">Nama Lengkap</label>
              <input v-model="addForm.nama_lengkap" placeholder="Nama Lengkap" class="form-input p-2 flex-1" />
            </div>

            <div class="flex flex-col md:flex-row md:items-center gap-3">
              <label class="text-sm font-medium text-gray-700 md:w-32">Username</label>
              <input v-model="addForm.username" placeholder="Username" class="form-input p-2 flex-1" />
            </div>

            <div class="flex flex-col md:flex-row md:items-center gap-3">
              <label class="text-sm font-medium text-gray-700 md:w-32">Instansi</label>
              <input v-model="addForm.instansi" placeholder="Instansi" class="form-input p-2 flex-1" />
            </div>

            <div class="flex flex-col md:flex-row md:items-center gap-3">
              <label class="text-sm font-medium text-gray-700 md:w-32">Email</label>
              <input v-model="addForm.email" placeholder="Email" type="email" class="form-input p-2 flex-1" />
            </div>

            <div class="flex flex-col md:flex-row md:items-center gap-3">
              <label class="text-sm font-medium text-gray-700 md:w-32">Password</label>
              <input v-model="addForm.password" placeholder="Password" type="password" class="form-input p-2 flex-1" />
            </div>

            <div class="flex flex-col md:flex-row md:items-center gap-3">
              <label class="text-sm font-medium text-gray-700 md:w-32">Konfirmasi</label>
              <input v-model="addForm.confirm" placeholder="Konfirmasi Password" type="password" class="form-input p-2 flex-1" />
            </div>
          </div>

          <div class="flex justify-end gap-2 mt-4">
            <button type="button" @click="handleCloseAdd" class="px-4 py-2 bg-gray-200 rounded">Batal</button>
            <button type="submit" class="px-4 py-2 bg-blue-700 text-white rounded">Simpan</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Edit User Modal -->
    <div v-if="editUser" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="absolute inset-0 bg-black/60" @click="handleCloseEdit"></div>
      <div class="relative bg-white rounded-lg w-full max-w-xl p-6 shadow-xl">
        <h2 class="text-xl font-semibold mb-4">Edit Pengguna</h2>

        <div class="space-y-3">
          <div class="space-y-3">
            <div class="flex flex-col md:flex-row md:items-center gap-3">
              <label class="text-sm font-medium text-gray-700 md:w-32">Nama</label>
              <input :value="editUser.nama_lengkap" disabled class="form-input p-2 bg-gray-100 flex-1" />
            </div>

            <div class="flex flex-col md:flex-row md:items-center gap-3">
              <label class="text-sm font-medium text-gray-700 md:w-32">Email</label>
              <input :value="editUser.email" disabled class="form-input p-2 bg-gray-100 flex-1" />
            </div>

            <div class="flex flex-col md:flex-row md:items-center gap-3">
              <label class="text-sm font-medium text-gray-700 md:w-32">Role</label>
              <select v-model="selectedRoleId" class="form-input p-2 flex-1">
                <option v-for="r in roles" :key="r.id" :value="r.id">{{ r.role_name }}</option>
              </select>
            </div>

            <div class="flex flex-col md:flex-row md:items-center gap-3">
              <label class="text-sm font-medium text-gray-700 md:w-32">Verifikasi</label>
              <select v-model="selectedVerified" class="form-input p-2 flex-1">
                <option :value="true">Terverifikasi</option>
                <option :value="false">Belum</option>
              </select>
            </div>

            <div class="flex justify-end items-center mt-4 gap-3">
              <button @click="handleDeleteUser(editUser.id)" class="px-3 py-2 bg-red-600 text-white rounded">Hapus</button>
              <button @click="handleCloseEdit" class="px-4 py-2 bg-gray-200 rounded">Batal</button>
              <button @click="handleRoleChange" class="px-4 py-2 bg-blue-700 text-white rounded">Simpan</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.font-poppins { font-family: 'Poppins', sans-serif; }
.form-label { min-width: 120px; font-size: 1rem; font-weight: 600; color: #2563eb; padding-right: 8px; text-align: right; }
.form-input { flex: 1; border: 2px solid #38bdf8; border-radius: 10px; padding: 10px 14px; font-size: 1rem; background: linear-gradient(90deg, #f8fafc 80%, #e0f2fe 100%); transition: border 0.2s, box-shadow 0.2s; box-shadow: 0 2px 8px rgba(37,99,235,0.08); }
.form-input:focus { border-color: #2563eb; box-shadow: 0 0 0 2px #bae6fd; outline: none; }
@media (max-width: 600px) { .mb-4.flex.items-center.gap-4 { flex-direction: column; align-items: stretch; gap: 2px; } .form-label { text-align: left; min-width: 0; margin-bottom: 2px; padding-right: 0; } }
</style>
