import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

export function useCurrentUser() {
  const userStore = useUserStore()
  const { user_id, nama_lengkap, email, role_id, instansi } = storeToRefs(userStore)
  const user = computed(() => ({
    user_id: user_id.value,
    nama_lengkap: nama_lengkap.value,
    email: email.value,
    role_id: role_id.value,
    instansi: instansi.value,
    instansi_id: instansi.value
  }))
  return {
    userStore,
    user_id,
    nama_lengkap,
    email,
    role_id,
    instansi,
    user
  }
}
