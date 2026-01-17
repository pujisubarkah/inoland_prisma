// server/api/auth/google.ts
import { defineEventHandler, getRequestURL } from 'h3'

export default defineEventHandler(async (event) => {
  // Google OAuth configuration
  const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
  const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || `${getRequestURL(event).origin}/api/auth/google/callback`

  if (!GOOGLE_CLIENT_ID) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Google OAuth not configured - GOOGLE_CLIENT_ID is missing'
    })
  }

  // Build Google OAuth URL
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
    new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      redirect_uri: GOOGLE_REDIRECT_URI,
      response_type: 'code',
      scope: 'openid email profile',
      access_type: 'offline',
      prompt: 'consent'
    }).toString()

  // Return the URL instead of redirecting
  return {
    success: true,
    authUrl: googleAuthUrl
  }
})