import { NextResponse } from "next/server";
import { prisma } from '../../../lib/prisma';



/**
 * GET: Ambil semua data dari provinsis
 */
export async function GET() {
    try {
        const data = await prisma.provinsis.findMany({
            include: {
                master_provinsi: {
                    select: { nama_provinsi: true },
                },
            },
        });

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
