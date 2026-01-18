<template>
  <div class="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-10">
    <h2 class="text-2xl font-bold text-blue-700 mb-6 text-center">Lengkapi Profil Penanggung Jawab Instansi</h2>
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div>
        <label class="block text-blue-700 font-semibold mb-1">Nama Lengkap</label>
        <input v-model="form.nama_lengkap" type="text" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required />
      </div>
      <div>
        <label class="block text-blue-700 font-semibold mb-1">Email</label>
        <input v-model="form.email" type="email" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required />
      </div>
      <div>
        <label class="block text-blue-700 font-semibold mb-1">Instansi</label>
        <input v-model="form.instansi" type="text" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required />
      </div>
      <div>
        <label class="block text-blue-700 font-semibold mb-1">Jabatan</label>
        <input v-model="form.jabatan" type="text" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required />
      </div>
      <div>
        <label class="block text-blue-700 font-semibold mb-1">No. HP/WA</label>
        <input v-model="form.no_hp" type="text" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required />
      </div>
      <div class="flex justify-end">
        <button type="submit" class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold shadow">
          Simpan Profil
        </button>
      </div>
    </form>
    <div v-if="success" class="mt-4 text-green-600 text-center font-semibold">
      Profil berhasil diperbarui!
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCurrentUser } from '~/composables/useCurrentUser'
import { toast } from 'vue-sonner'

const { user, userStore } = useCurrentUser()

const form = ref({
  nama_lengkap: user.value.nama_lengkap || '',
  email: user.value.email || '',
  instansi: user.value.instansi || '',
  jabatan: '',
  no_hp: ''
})

const success = ref(false)

const handleSubmit = async () => {
  try {
    // Simpan ke backend (ganti endpoint sesuai kebutuhan)
    await $fetch('/api/user/profile', {
      method: 'POST',
      body: form.value
    })
    // Update pinia store (tanpa role_id)
    userStore.setUser({
      user_id: user.value.user_id,
      nama_lengkap: form.value.nama_lengkap,
      email: form.value.email,
      instansi: form.value.instansi
    })
    success.value = true
    toast.success('Profil berhasil diperbarui!')
  } catch (err) {
    toast.error('Gagal memperbarui profil')
  }
}
</script>