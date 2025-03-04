import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 📌 GET: Ambil semua berita
export async function GET() {
  try {
    const beritas = await prisma.beritas.findMany();
    return Response.json(beritas);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Terjadi kesalahan saat mengambil data." }, { status: 500 });
  }
}

// 📌 POST: Tambah berita baru
export async function POST(req: Request) {
  try {
    const { title, likes, date, image_url, deskripsi } = await req.json();
    const newBerita = await prisma.beritas.create({
      data: { title, likes, date: new Date(date), image_url, deskripsi },
    });
    return Response.json(newBerita, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Terjadi kesalahan saat menambahkan data." }, { status: 500 });
  }
}

// 📌 PUT: Edit berita berdasarkan ID
export async function PUT(req: Request) {
  try {
    const { id, title, likes, date, image_url, deskripsi } = await req.json();
    const updatedBerita = await prisma.beritas.update({
      where: { id: Number(id) },
      data: { title, likes, date: new Date(date), image_url, deskripsi },
    });
    return Response.json(updatedBerita);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Terjadi kesalahan saat mengupdate data." }, { status: 500 });
  }
}

// 📌 DELETE: Hapus berita berdasarkan ID
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    await prisma.beritas.delete({
      where: { id: Number(id) },
    });
    return Response.json({ message: "Berita berhasil dihapus." });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Terjadi kesalahan saat menghapus data." }, { status: 500 });
  }
}
