import { getCookie, getHeader } from 'h3'

export async function getUserFromSession(event: any) {
  try {
    // Try to get user ID from cookie atau header
    const userCookie = getCookie(event, 'user_id')
    const authHeader = getHeader(event, 'x-user-id')
    
    // Prioritas: header > cookie > fallback ke ID 68 untuk testing
    const userId = authHeader || userCookie || '68'
    
    if (userId) {
      return { 
        id: parseInt(userId), 
        name: 'Current User' 
      }
    }
    
    return null
  } catch (error) {
    console.error('Error getting user from session:', error)
    // Fallback ke user ID 68 jika ada error
    return { id: 68, name: 'Current User' }
  }
}
