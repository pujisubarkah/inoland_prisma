// server/api/success-stories/[id].ts
import { eq } from 'drizzle-orm'
import { successStory } from '~/server/database/schema/sucessstory'
import { db } from '@/server/database'

export default defineEventHandler(async (event) => {
  const method = event.method
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'ID is required' })
  }

  const storyId = parseInt(id)
  if (isNaN(storyId)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid ID' })
  }

  if (method === 'GET') {
    try {
      const story = await db
        .select()
        .from(successStory)
        .where(eq(successStory.id, storyId))
        .limit(1)

      if (!story.length) {
        throw createError({ statusCode: 404, statusMessage: 'Story not found' })
      }

      return { success: true, data: story[0] }
    } catch (error) {
      console.error('Error fetching success story:', error)
      throw createError({ statusCode: 500, statusMessage: 'Internal Server Error' })
    }
  } else if (method === 'PUT') {
    // Optional: Update cerita
    try {
      const body = await readBody(event)
      const updatedStory = await db
        .update(successStory)
        .set({
          title: body.title,
          description: body.description,
          impact: body.impact,
          imageUrl: body.imageUrl,
          fullContent: body.fullContent,
          published: body.published,
          updatedAt: new Date(),
        })
        .where(eq(successStory.id, storyId))
        .returning()

      if (!updatedStory.length) {
        throw createError({ statusCode: 404, statusMessage: 'Story not found' })
      }

      return { success: true, data: updatedStory[0] }
    } catch (error) {
      console.error('Error updating success story:', error)
      throw createError({ statusCode: 500, statusMessage: 'Internal Server Error' })
    }
  } else if (method === 'DELETE') {
    // Optional: Delete cerita
    try {
      const deletedStory = await db
        .delete(successStory)
        .where(eq(successStory.id, storyId))
        .returning()

      if (!deletedStory.length) {
        throw createError({ statusCode: 404, statusMessage: 'Story not found' })
      }

      return { success: true, message: 'Story deleted' }
    } catch (error) {
      console.error('Error deleting success story:', error)
      throw createError({ statusCode: 500, statusMessage: 'Internal Server Error' })
    }
  } else {
    throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' })
  }
})