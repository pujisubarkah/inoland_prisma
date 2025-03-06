import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * GET: Ambil semua data inolands
 */
export async function GET() {
    try {
        const data = await prisma.inolands.findMany({
            include: {
                master_provinsi: { select: { nama_provinsi: true } },
                master_kabupaten: { select: { nama_kabkot: true } },
                sdgs_relasi: { select: { image: true } },
            },
        });

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}

/**
 * POST: Tambah data baru ke inolands
 */
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { id_provinsi, id_kabkot, sdgs, deskripsi, tahun, inovator, judul_inovasi, kld, urusan } = body;

        const newData = await prisma.inolands.create({
            data: {
                id_provinsi,
                id_kabkot,
                sdgs,
                deskripsi,
                tahun,
                inovator,
                judul_inovasi,
                kld,
                urusan,
            },
        });

        return NextResponse.json(newData, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}

/**
 * PUT: Update data inolands berdasarkan id
 */
export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { id, id_provinsi, id_kabkot, sdgs, deskripsi, tahun, inovator, judul_inovasi, kld, urusan } = body;

        const updatedData = await prisma.inolands.update({
            where: { id },
            data: {
                id_provinsi,
                id_kabkot,
                sdgs,
                deskripsi,
                tahun,
                inovator,
                judul_inovasi,
                kld,
                urusan,
            },
        });

        return NextResponse.json(updatedData, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}

/**
 * DELETE: Hapus data inolands berdasarkan id
 */
export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();

        await prisma.inolands.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Data deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}

