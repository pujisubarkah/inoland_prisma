// server/api/success-stories/index.ts
import { eq } from 'drizzle-orm'
import { successStory } from '~/server/database/schema/sucessstory'
import { db } from '@/server/database'

export default defineEventHandler(async (event) => {
  const method = event.method

  if (method === 'GET') {
    try {
      // Fetch semua cerita yang published
      const stories = await db
        .select()
        .from(successStory)
        .where(eq(successStory.published, true))
        .orderBy(successStory.createdAt)

      return { success: true, data: stories }
    } catch (error) {
      console.error('Error fetching success stories:', error)
      throw createError({ statusCode: 500, statusMessage: 'Internal Server Error' })
    }
  } else if (method === 'POST') {
    try {
      const body = await readBody(event)

      // Basic validation
      if (!body.title || !body.description || !body.impact) {
        throw createError({ statusCode: 400, statusMessage: 'Title, description, and impact are required' })
      }

      // Insert data baru
      const newStory = await db
        .insert(successStory)
        .values({
          title: body.title,
          description: body.description,
          impact: body.impact,
          imageUrl: body.imageUrl || null,
          fullContent: body.fullContent || null,
          published: body.published || false,
        })
        .returning()

      return { success: true, data: newStory[0] }
    } catch (error) {
      console.error('Error creating success story:', error)
      throw createError({ statusCode: 500, statusMessage: 'Internal Server Error' })
    }
  } else {
    throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' })
  }
})