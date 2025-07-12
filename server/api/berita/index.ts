// server/api/beritas/index.ts
import { db } from '../../database';
import { beritas } from '../../database/schema/berita';
import { readBody, eventHandler, getMethod } from 'h3';

export default eventHandler(async (event) => {
  const method = getMethod(event);

  switch (method) {
    case 'GET': {
      const allBeritas = await db.select().from(beritas);
      return allBeritas;
    }

    case 'POST': {
      const body = await readBody(event);
      const insertData: any = {
        title: body.title,
        likes: body.likes,
        deskripsi: body.deskripsi,
      };

      if (body.date) insertData.date = new Date(body.date);
      if (body.image_url) insertData.image_url = body.image_url;
      if (body.embed_url) insertData.embed_url = body.embed_url;

      const [newBerita] = await db.insert(beritas).values(insertData).returning();
      return newBerita;
    }

    default:
      return {
        statusCode: 405,
        message: 'Method not allowed',
      };
  }
});
