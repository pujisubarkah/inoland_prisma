// server/api/auth/logout.post.ts
export default defineEventHandler(async (event) => {
  deleteCookie(event, 'session_token')
  return { success: true, message: 'Logout berhasil' }
})
