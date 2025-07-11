

import { db } from '../../database';
import { inolands } from '../../database/schema/inolands';
import { getMethod, readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const method = getMethod(event);

  if (method === 'GET') {
    const data = await db.select().from(inolands);
    return data;
  }

  if (method === 'POST') {
    const body = await readBody(event);
    const result = await db.insert(inolands).values(body).returning();
    return result;
  }

  throw createError({
    statusCode: 405,
    statusMessage: 'Method Not Allowed',
  });
});
