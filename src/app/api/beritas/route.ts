import { prisma } from '../../../lib/prisma';

export async function GET() {
  try {
    const beritas = await prisma.beritas.findMany({
      orderBy: {
        date: "desc", // Mengurutkan dari yang terbaru ke yang terlama
      },
    });
    return new Response(JSON.stringify(beritas), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Terjadi kesalahan saat mengambil data." }), { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { title, likes, date, image_url, deskripsi } = await req.json();
    const newBerita = await prisma.beritas.create({
      data: { title, likes, date: new Date(date), image_url, deskripsi },
    });
    return new Response(JSON.stringify(newBerita), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Terjadi kesalahan saat menambahkan data." }), { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, title, likes, date, image_url, deskripsi } = await req.json();
    const updatedBerita = await prisma.beritas.update({
      where: { id: Number(id) },
      data: { title, likes, date: new Date(date), image_url, deskripsi },
    });
    return new Response(JSON.stringify(updatedBerita), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Terjadi kesalahan saat mengupdate data." }), { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    await prisma.beritas.delete({
      where: { id: Number(id) },
    });
    return new Response(JSON.stringify({ message: "Berita berhasil dihapus." }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Terjadi kesalahan saat menghapus data." }), { status: 500 });
  }
}
