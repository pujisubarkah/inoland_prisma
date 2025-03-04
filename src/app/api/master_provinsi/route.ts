import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 📌 GET: Ambil semua data provinsi
export async function GET() {
  try {
    const provinsi = await prisma.master_provinsi.findMany();
    return Response.json(provinsi);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Terjadi kesalahan saat mengambil data." }, { status: 500 });
  }
}
