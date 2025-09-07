import { defineStore } from 'pinia'

export const useAdminUserStore = defineStore('adminUser', {
  state: () => ({
    id: null as number | null,
    nama_lengkap: '',
    email: '',
    instansi: '',
    role_id: null as number | null,
    is_verified: false,
    // Add other fields as needed
  }),
  actions: {
    setUser(user: {
      id: number,
      nama_lengkap: string,
      email: string,
      instansi: string,
      role_id: number,
      is_verified: boolean
    }) {
      this.id = user.id
      this.nama_lengkap = user.nama_lengkap
      this.email = user.email
      this.instansi = user.instansi
      this.role_id = user.role_id
      this.is_verified = user.is_verified
    },
    clearUser() {
      this.id = null
      this.nama_lengkap = ''
      this.email = ''
      this.instansi = ''
      this.role_id = null
      this.is_verified = false
    }
  }
})
