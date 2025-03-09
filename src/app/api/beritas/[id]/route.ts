import { prisma } from '../../../../lib/prisma';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();

    const berita = await prisma.beritas.findUnique({
      where: { id: Number(id) },
    });

    if (!berita) {
      return new Response(JSON.stringify({ error: "Berita tidak ditemukan." }), { status: 404 });
    }

    return new Response(JSON.stringify(berita), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Terjadi kesalahan saat mengambil data." }), { status: 500 });
  }
}
