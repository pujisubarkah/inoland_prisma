import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user_id: null as number | null,
    nama_lengkap: '',
    email: '',
    role_id: null as number | null,
    instansi: '',
    _loaded: false
  }),
  getters: {
    getUserId: (state) => {
      // Auto-load from localStorage if not loaded yet
      if (!state._loaded && process.client) {
        const store = useUserStore()
        store._autoLoadFromLocalStorage()
      }
      return state.user_id
    }
  },
  actions: {
    _autoLoadFromLocalStorage() {
      console.log('_autoLoadFromLocalStorage called - _loaded:', this._loaded, 'process.client:', process.client)
      if (this._loaded || !process.client) return
      
      try {
        const savedUser = localStorage.getItem('user')
        console.log('Auto-loading from localStorage:', savedUser)
        if (savedUser) {
          const userData = JSON.parse(savedUser)
          console.log('Parsed user data:', userData)
          this.user_id = userData?.id || userData?.user_id || null
          this.nama_lengkap = userData?.nama_lengkap || ''
          this.email = userData?.email || ''
          this.role_id = userData?.role_id || null
          this.instansi = userData?.instansi || ''
          console.log('Store loaded with user_id:', this.user_id)
        } else {
          console.log('No user data found in localStorage')
        }
      } catch (error) {
        console.error('Error auto-loading from localStorage:', error)
      } finally {
        this._loaded = true
        console.log('_autoLoadFromLocalStorage completed - _loaded set to true')
      }
    },
    setUser(user: { user_id: number, nama_lengkap: string, email: string, role_id: number, instansi: string }) {
      this.user_id = user.user_id
      this.nama_lengkap = user.nama_lengkap
      this.email = user.email
      this.role_id = user.role_id
      this.instansi = user.instansi
      this._loaded = true
      
      // Simpan ke localStorage
      if (process.client) {
        localStorage.setItem('user', JSON.stringify({
          id: user.user_id,
          user_id: user.user_id,
          nama_lengkap: user.nama_lengkap,
          email: user.email,
          role_id: user.role_id,
          instansi: user.instansi
        }))
      }
      
      console.log('Pinia setUser - user_id set to:', this.user_id)
    },
    clearUser() {
      this.user_id = null
      this.nama_lengkap = ''
      this.email = ''
      this.role_id = null
      this.instansi = ''
      this._loaded = false
      if (process.client) {
        localStorage.removeItem('user')
      }
    }
  }
})
