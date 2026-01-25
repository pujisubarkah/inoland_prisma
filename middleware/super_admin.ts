export default defineNuxtRouteMiddleware((to) => {
  // Client-side only guard: ensure user has role_id === 1 (Super Admin)
  if (process.server) return
  try {
    const stored = localStorage.getItem('userProfile')
    if (!stored) return navigateTo('/')
    const user = JSON.parse(stored)
    if (!(user.role_id === 1 || user.role_id === '1')) return navigateTo('/')
  } catch (e) {
    return navigateTo('/')
  }
})
