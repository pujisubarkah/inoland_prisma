// server/api/beritas/index.ts
import { db } from '../../database';
import { beritas } from '../../database/schema/berita';
import { eq } from 'drizzle-orm';
import { readBody } from 'h3';

export default async function (req: any) {
  const method = req.method;

  switch (method) {
    case 'GET':
      const allBeritas = await db.select().from(beritas);
      return allBeritas;

    case 'POST':
      const body = await readBody(req);
      const insertData: any = {
        title: body.title,
        likes: body.likes,
        deskripsi: body.deskripsi,
      };
      if (body.date) {
        insertData.date = new Date(body.date);
      }
      if (body.image_url) {
        insertData.image_url = body.image_url;
      }
      if (body.embed_url) {
        insertData.embed_url = body.embed_url;
      }
      const [newBerita] = await db.insert(beritas).values(insertData).returning();
      return newBerita;

    default:
      return { error: 'Method not allowed' };
  }
}