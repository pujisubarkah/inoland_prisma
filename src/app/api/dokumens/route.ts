import { NextResponse } from "next/server";
import { prisma } from '../../../lib/prisma';



// GET: Ambil semua dokumen
export async function GET() {
  try {
    const dokumens = await prisma.dokumens.findMany();
    return NextResponse.json(dokumens, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// POST: Tambah dokumen baru
export async function POST(req: Request) {
  try {
    const { nama, link, jenis_dokumen } = await req.json();
    const newDokumen = await prisma.dokumens.create({
      data: { nama, link, jenis_dokumen },
    });
    return NextResponse.json(newDokumen, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// PUT: Update dokumen berdasarkan ID
export async function PUT(req: Request) {
  try {
    const { id, nama, link, jenis_dokumen } = await req.json();
    const updatedDokumen = await prisma.dokumens.update({
      where: { id },
      data: { nama, link, jenis_dokumen },
    });
    return NextResponse.json(updatedDokumen, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// DELETE: Hapus dokumen berdasarkan ID
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    await prisma.dokumens.delete({ where: { id } });
    return NextResponse.json({ message: "Dokumen berhasil dihapus" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
