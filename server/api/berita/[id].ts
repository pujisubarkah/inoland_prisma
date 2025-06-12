// server/api/beritas/[id].ts
import { db } from '../../database';
import { beritas as berita } from '../../database/schema/berita';
import { eq } from 'drizzle-orm';
import { readBody } from 'h3';

export default async function (req: any) {
  const id = parseInt(req.context.params?.id);
  const method = req.method;

  switch (method) {
    case 'GET':
      const [beritaItem] = await db.select().from(berita).where(eq(berita.id, id));
      return beritaItem || { error: 'Berita tidak ditemukan' };

    case 'PUT':
      const body = await readBody(req);
      const [updated] = await db
        .update(berita)
        .set({
          title: body.title ?? null,
          likes: body.likes ?? null,
          date: body.date ? new Date(body.date) : undefined,
          imageUrl: body.image_url ?? null,
          deskripsi: body.deskripsi ?? null,
          embedUrl: body.embed_url ?? null,
        })
        .where(eq(berita.id, id))
        .returning();
      return updated;

    case 'DELETE':
      await db.delete(berita).where(eq(berita.id, id));
      return { message: 'Berita berhasil dihapus' };

    default:
      return { error: 'Method not allowed' };
  }
}