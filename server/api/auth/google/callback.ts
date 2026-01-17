// server/api/auth/google/callback.ts
import { OAuth2Client } from 'google-auth-library'
import { db } from '@/server/database'
import { user } from '@/server/database/schema/user'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const code = query.code as string

  if (!code) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Authorization code not provided'
    })
  }

  const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
  const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
  const requestUrl = getRequestURL(event)
  const isProduction = requestUrl.hostname === 'inoland.lan.go.id'

  // Set redirect URI based on environment
  const GOOGLE_REDIRECT_URI = isProduction
    ? 'https://inoland.lan.go.id/api/auth/google/callback'
    : process.env.GOOGLE_REDIRECT_URI || `${requestUrl.protocol}//${requestUrl.host}/api/auth/google/callback`

  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Google OAuth not configured properly'
    })
  }

  try {
    // Initialize OAuth2 client
    const oauth2Client = new OAuth2Client(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      GOOGLE_REDIRECT_URI
    )

    // Exchange code for tokens
    const { tokens } = await oauth2Client.getToken(code)
    oauth2Client.setCredentials(tokens)

    // Get user info from Google
    const ticket = await oauth2Client.verifyIdToken({
      idToken: tokens.id_token!,
      audience: GOOGLE_CLIENT_ID,
    })

    const payload = ticket.getPayload()
    if (!payload) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid Google token'
      })
    }

    const { sub: googleId, email, name, picture } = payload

    // Check if user exists
    let [existingUser] = await db
      .select()
      .from(user)
      .where(eq(user.email, email!))

    if (!existingUser) {
      // Create new user if doesn't exist
      try {
        const [newUser] = await db
          .insert(user)
          .values({
            email: email!,
            nama_lengkap: name!,
            username: email!.split('@')[0], // Use email prefix as username
            google_id: googleId,
            is_verified: true, // Google accounts are pre-verified
            role_id: 2, // Default role
            avatar: picture
          })
          .returning()

        existingUser = newUser
      } catch (dbError) {
        console.error('Database insert error:', dbError)
        // Fallback: create user without google_id and avatar if columns don't exist
        const [newUser] = await db
          .insert(user)
          .values({
            email: email!,
            nama_lengkap: name!,
            username: email!.split('@')[0],
            is_verified: true,
            role_id: 2,
          })
          .returning()

        existingUser = newUser
      }
    } else {
      // Update Google ID if not set
      try {
        if (!existingUser.google_id) {
          await db
            .update(user)
            .set({
              google_id: googleId,
              avatar: picture || existingUser.avatar
            })
            .where(eq(user.id, existingUser.id))
        }
      } catch (dbError) {
        console.error('Database update error:', dbError)
        // Ignore update error if columns don't exist
      }
    }

    // Set session cookie
    setCookie(event, 'session_token', String(existingUser.id), {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    })

    // Redirect to home page
    await sendRedirect(event, '/', 302)

  } catch (error) {
    console.error('Google OAuth callback error:', error)

    // Provide more specific error messages
    let errorMessage = 'Authentication failed'
    if (error instanceof Error) {
      if (error.message.includes('invalid_grant')) {
        errorMessage = 'Invalid authorization code'
      } else if (error.message.includes('redirect_uri_mismatch')) {
        errorMessage = 'Redirect URI mismatch'
      } else if (error.message.includes('invalid_client')) {
        errorMessage = 'Invalid client configuration'
      }
    }

    throw createError({
      statusCode: 500,
      statusMessage: errorMessage
    })
  }
})