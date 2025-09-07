import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

export function useCurrentUser() {
  const userStore = useUserStore()
  const { user_id, nama_lengkap, email, role_id, instansi } = storeToRefs(userStore)
  return {
    userStore,
    user_id,
    nama_lengkap,
    email,
    role_id,
    instansi
  }
}
