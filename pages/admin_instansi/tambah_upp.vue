<template>
  <div class="p-6">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-2xl font-semibold">Tambah UPP (Unit Pelaksana Inovasi)</h2>
      <button @click="onAddNew" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Tambah UPP</button>
    </div>

    <!-- Modal create form -->
    <div v-if="isCreating" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black opacity-40" @click="cancelNew"></div>
      <div class="relative bg-white rounded shadow-lg z-10 w-full max-w-2xl p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold">Tambah UPP / Tambah User</h3>
          <button @click="cancelNew" class="text-gray-600 hover:text-gray-900 text-2xl leading-none">&times;</button>
        </div>
        <div class="grid grid-cols-1 gap-3">
          <div class="flex flex-col sm:flex-row sm:items-center gap-2">
            <label class="sm:w-40 text-sm text-gray-600">Nama Unit (OPD)</label>
            <input v-model="form.nama" placeholder="Nama Unit" class="flex-1 border px-3 py-2 rounded mt-1 sm:mt-0" />
          </div>
          <div class="flex flex-col sm:flex-row sm:items-center gap-2">
            <label class="sm:w-40 text-sm text-gray-600">Kepala / Contact Person</label>
            <input v-model="form.kepala" placeholder="Kepala Unit" class="flex-1 border px-3 py-2 rounded mt-1 sm:mt-0" />
          </div>
          <div class="flex flex-col sm:flex-row sm:items-center gap-2">
            <label class="sm:w-40 text-sm text-gray-600">Lokasi / Instansi</label>
            <input v-model="form.lokasi" placeholder="Lokasi" class="flex-1 border px-3 py-2 rounded mt-1 sm:mt-0" />
          </div>
          <div class="flex flex-col sm:flex-row sm:items-center gap-2">
            <label class="sm:w-40 text-sm text-gray-600">Kontak (email/telepon)</label>
            <input v-model="form.kontak" placeholder="Kontak (email/telepon)" class="flex-1 border px-3 py-2 rounded mt-1 sm:mt-0" />
          </div>
        </div>
        <div class="mt-4 flex justify-end gap-2">
          <button @click="saveNew" class="bg-green-600 text-white px-4 py-2 rounded">Simpan</button>
          <button @click="cancelNew" class="bg-gray-200 px-4 py-2 rounded">Batal</button>
        </div>
      </div>
    </div>

    <div class="overflow-x-auto bg-white rounded shadow">
      <table class="min-w-full divide-y">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">#</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">User ID</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Instansi ID</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Nama Unit</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Kepala</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Lokasi</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Kontak</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y">
          <tr v-for="(item, idx) in items" :key="item.user_id || item.instansi_id || idx" class="odd:bg-white even:bg-gray-50">
            <td class="px-4 py-2 text-sm">{{ idx + 1 }}</td>
            <td class="px-4 py-2 text-sm">{{ item.user_id || '-' }}</td>
            <td class="px-4 py-2 text-sm">{{ item.instansi_id || '-' }}</td>
            <td class="px-4 py-2 text-sm">
              <div v-if="editingId === (item.user_id || item.instansi_id)"><input v-model="editForm.nama" class="w-full border px-2 py-1 rounded"/></div>
              <div v-else>{{ item.nama }}</div>
            </td>
            <td class="px-4 py-2 text-sm">
              <div v-if="editingId === (item.user_id || item.instansi_id)"><input v-model="editForm.kepala" class="w-full border px-2 py-1 rounded"/></div>
              <div v-else>{{ item.kepala }}</div>
            </td>
            <td class="px-4 py-2 text-sm">
              <div v-if="editingId === (item.user_id || item.instansi_id)"><input v-model="editForm.lokasi" class="w-full border px-2 py-1 rounded"/></div>
              <div v-else>{{ item.lokasi }}</div>
            </td>
            <td class="px-4 py-2 text-sm">
              <div v-if="editingId === (item.user_id || item.instansi_id)"><input v-model="editForm.kontak" class="w-full border px-2 py-1 rounded"/></div>
              <div v-else>{{ item.kontak }}</div>
            </td>
            <td class="px-4 py-2 text-sm">
              <div v-if="editingId === (item.user_id || item.instansi_id)" class="flex gap-2">
                <button @click="saveEdit(item)" class="bg-green-600 text-white px-3 py-1 rounded">Simpan</button>
                <button @click="cancelEdit" class="bg-gray-200 px-3 py-1 rounded">Batal</button>
              </div>
              <div v-else class="flex gap-2">
                <button @click="startEdit(item)" class="bg-yellow-400 px-3 py-1 rounded">Edit</button>
                <button @click="removeItem(item)" class="bg-red-500 text-white px-3 py-1 rounded">Hapus</button>
              </div>
            </td>
          </tr>
          <tr v-if="items.length === 0">
            <td colspan="8" class="px-4 py-6 text-center text-gray-500">Belum ada UPP.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCurrentUser } from '@/composables/useCurrentUser'

const items = ref([
  { user_id: 1, instansi_id: 1, nama: 'UPP Inovasi Kota A', kepala: 'Budi', lokasi: 'Kota A', kontak: 'upp@kotaa.go.id' }
])

const isCreating = ref(false)
const form = ref({ nama: '', kepala: '', lokasi: '', kontak: '' })

const editingId = ref(null)
const editForm = ref({ nama: '', kepala: '', lokasi: '', kontak: '' })

function onAddNew() {
  isCreating.value = true
  form.value = { nama: '', kepala: '', lokasi: '', kontak: '' }
}

function makeUsername(base) {
  const clean = (base || 'user').toString().replace(/\s+/g, '').toLowerCase()
  return `${clean}${Math.floor(Math.random() * 9000) + 1000}`
}

async function saveNew() {
  // Attempt to create user via API with role_id = 5
  try {
    const username = makeUsername(form.value.nama || form.value.kepala)
    const payload = {
      nama_lengkap: form.value.nama,
      email: form.value.kontak,
      instansi: form.value.lokasi,
      role_id: 5,
      password: 'changeme',
      username,
      is_verified: false
    }
    const res = await $fetch('/api/users', { method: 'POST', body: payload })

    // create user_instansi record linking the created user to OPD details
    try {
      const current = useCurrentUser()
      const createdBy = current?.value?.id || null
      const instPayload = {
        user_id: res.id,
        contact_person: form.value.kepala,
        telp: form.value.kontak,
        created_by: createdBy,
        OPD: form.value.nama
      }
      const instRes = await $fetch('/api/user_instansi', { method: 'POST', body: instPayload })

      items.value.unshift({
        user_id: res.id,
        instansi_id: instRes.id,
        nama: instRes.OPD || form.value.nama,
        kepala: instRes.contact_person || form.value.kepala,
        lokasi: res.instansi || form.value.lokasi,
        kontak: instRes.telp || form.value.kontak
      })
    } catch (e) {
      // if creating user_instansi fails, still add user-based item
      console.error('create user_instansi failed, falling back to user-only item', e)
      items.value.unshift({
        user_id: res.id,
        instansi_id: null,
        nama: res.nama_lengkap || form.value.nama,
        kepala: res.username || username,
        lokasi: res.instansi || form.value.lokasi,
        kontak: res.email || form.value.kontak
      })
    }
  } catch (e) {
    console.error('API create user failed, falling back to local:', e)
    const maxUserId = items.value.length ? Math.max(...items.value.map(i => i.user_id || 0)) : 0
    const nextId = maxUserId + 1
    items.value.unshift({ user_id: nextId, instansi_id: null, ...form.value })
  } finally {
    isCreating.value = false
  }
}

function cancelNew() { isCreating.value = false }

function startEdit(item) {
  editingId.value = item.user_id || item.instansi_id
  editForm.value = { nama: item.nama, kepala: item.kepala, lokasi: item.lokasi, kontak: item.kontak }
}
async function saveEdit(item) {
  const userId = item.user_id
  const instId = item.instansi_id
  try {
    // update user
    if (userId) {
      const payloadUser = {
        nama_lengkap: editForm.value.nama,
        email: editForm.value.kontak,
        instansi: editForm.value.lokasi
      }
      await $fetch(`/api/users/${userId}`, { method: 'PUT', body: payloadUser })
    }

    // update user_instansi if exists
    if (instId) {
      const payloadInst = {
        contact_person: editForm.value.kepala,
        telp: editForm.value.kontak,
        OPD: editForm.value.nama
      }
      await $fetch(`/api/user_instansi/${instId}`, { method: 'PUT', body: payloadInst })
    }

    // update local list
    const idx = items.value.findIndex(i => (i.user_id === (userId || null)) || (i.instansi_id === (instId || null)))
    if (idx !== -1) {
      items.value[idx] = {
        user_id: userId || items.value[idx].user_id,
        instansi_id: instId || items.value[idx].instansi_id,
        nama: editForm.value.nama,
        kepala: editForm.value.kepala,
        lokasi: editForm.value.lokasi,
        kontak: editForm.value.kontak
      }
    }
  } catch (e) {
    console.error('API update failed, falling back to local:', e)
    const idx = items.value.findIndex(i => (i.user_id === (userId || null)) || (i.instansi_id === (instId || null)))
    if (idx !== -1) {
      items.value[idx] = { user_id: userId || items.value[idx].user_id, instansi_id: instId || items.value[idx].instansi_id, ...editForm.value }
    }
  } finally {
    editingId.value = null
  }
}

function cancelEdit() { editingId.value = null }

async function removeItem(item) {
  const userId = item.user_id
  const instId = item.instansi_id
  try {
    if (instId) await $fetch(`/api/user_instansi/${instId}`, { method: 'DELETE' })
    if (userId) await $fetch(`/api/users/${userId}`, { method: 'DELETE' })
    items.value = items.value.filter(i => i.user_id !== userId && i.instansi_id !== instId)
  } catch (e) {
    console.error('API delete failed, falling back to local:', e)
    items.value = items.value.filter(i => i.user_id !== userId && i.instansi_id !== instId)
  }
}
</script>

<style scoped>
table { border-collapse: collapse }
</style>
