<template>
  <div class="p-6 bg-white rounded-xl shadow-lg">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-blue-700">Kelola User Instansi</h2>
      <Button class="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
              @click="openAddDialog">
        + Tambah User
      </Button>
    </div>

    <!-- Tabel User -->
    <table class="w-full border border-gray-200 rounded-lg overflow-hidden shadow">
      <thead class="bg-blue-600 text-white">
        <tr>
          <th class="px-4 py-3 text-left">Nama OPD</th>
          <th class="px-4 py-3 text-left">Contact Person</th>
          <th class="px-4 py-3 text-left">Telp</th>
          <th class="px-4 py-3 text-left">Email</th>
          <th class="px-4 py-3 text-left">Instansi</th>
          <th class="px-4 py-3 text-center">Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id" class="border-b hover:bg-blue-50">
          <td class="px-4 py-3">{{ user.nama_opd }}</td>
          <td class="px-4 py-3">{{ user.contact_person }}</td>
          <td class="px-4 py-3">{{ user.telp }}</td>
          <td class="px-4 py-3">{{ user.email }}</td>
          <td class="px-4 py-3">{{ user.instansi }}</td>
          <td class="px-4 py-3 text-center flex gap-2 justify-center">
            <Button class="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600"
                    @click="editUser(user)">
              Edit
            </Button>
            <Button class="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
                    @click="deleteUser(user.id)">
              Hapus
            </Button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Dialog Tambah/Edit User -->
    <div v-if="dialogOpen" class="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div class="bg-white rounded-xl shadow-xl w-full max-w-lg p-6">
        <h3 class="text-xl font-bold text-blue-700 mb-4">
          {{ editingUser ? 'Edit User' : 'Tambah User' }}
        </h3>
        <form @submit.prevent="saveUser">
          <div class="mb-4">
            <Label for="nama_opd">Nama OPD</Label>
            <input v-model="form.nama_opd" id="nama_opd" type="text" class="w-full border rounded px-3 py-2 mt-1" required>
          </div>
          <div class="mb-4">
            <Label for="contact_person">Contact Person</Label>
            <input v-model="form.contact_person" id="contact_person" type="text" class="w-full border rounded px-3 py-2 mt-1" required>
          </div>
          <div class="mb-4">
            <Label for="telp">Telp</Label>
            <input v-model="form.telp" id="telp" type="text" class="w-full border rounded px-3 py-2 mt-1" required>
          </div>
          <div class="mb-4">
            <Label for="email">Email</Label>
            <input v-model="form.email" id="email" type="email" class="w-full border rounded px-3 py-2 mt-1" required>
          </div>

          <div class="flex justify-end gap-4 mt-6">
            <Button type="button" class="bg-gray-400 text-white px-4 py-2 rounded-lg"
                    @click="closeDialog">
              Batal
            </Button>
            <Button type="submit" class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
              Simpan
            </Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Button } from '@/components/ui/_exports/button'
import { Label } from '@/components/ui/_exports/label'
import { useUserStore } from '@/stores/user' // Import your Pinia store

const userStore = useUserStore() // Initialize the store
const users = ref([])
const dialogOpen = ref(false)
const editingUser = ref(null)
const form = ref({ nama_opd: '', contact_person: '', telp: '', email: '' })

const fetchUsers = async () => {
  try {
    const res = await fetch('/api/user_instansi')
    users.value = await res.json()
  } catch (e) {
    users.value = []
  }
}

fetchUsers()

const openAddDialog = () => {
  editingUser.value = null
  form.value = { nama_opd: '', contact_person: '', telp: '', email: '' }
  dialogOpen.value = true
}

const editUser = (user) => {
  editingUser.value = user
  form.value = { ...user }
  dialogOpen.value = true
}

const deleteUser = (id) => {
  users.value = users.value.filter(u => u.id !== id)
}

const saveUser = async () => {
  console.log('=== DEBUG SAVE USER ===')
  
  if (!form.value.nama_opd || !form.value.contact_person || !form.value.email || !form.value.telp) {
    console.log('Form validation failed')
    return;
  }
  
  // Ambil created_by dari localStorage (id user yang login)
  let createdBy = null
  console.log('=== DEBUG LOCALSTORAGE ===')
  console.log('process.client status:', process.client)
  console.log('typeof localStorage:', typeof localStorage)
  
  // Paksa akses localStorage dengan berbagai cara
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedUser = window.localStorage.getItem('user')
      console.log('window.localStorage.getItem("user"):', savedUser)
      
      if (savedUser) {
        const userData = JSON.parse(savedUser)
        createdBy = userData?.id || null
        console.log('createdBy from window.localStorage:', createdBy)
      }
    } else if (process.client && localStorage) {
      const savedUser = localStorage.getItem('user')
      console.log('localStorage.getItem("user"):', savedUser)
      
      if (savedUser) {
        const userData = JSON.parse(savedUser)
        createdBy = userData?.id || null
        console.log('createdBy from localStorage:', createdBy)
      }
    } else {
      console.log('localStorage not available')
    }
  } catch (e) {
    console.error('Error accessing localStorage:', e)
  }
  
  // Fallback: hardcode untuk testing
  if (!createdBy) {
    console.log('localStorage failed, using hardcoded value for testing')
    createdBy = 53 // hardcode ID user yang login untuk testing
    console.log('Using hardcoded createdBy:', createdBy)
  }
  
  console.log('Final createdBy:', createdBy)
  
  try {
    const payload = {
      nama_opd: form.value.nama_opd,
      contact_person: form.value.contact_person,
      telp: form.value.telp,
      email: form.value.email,
      password: '12345678', // default password
      created_by: createdBy // id user yang login dari localStorage (field id)
    }
    console.log('Payload POST:', payload)
    await fetch('/api/user_instansi', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    fetchUsers() // Refresh table after save
    closeDialog()
  } catch (e) {
    // Handle error (show notification, etc.)
  }
}

const closeDialog = () => {
  dialogOpen.value = false
}
</script>
