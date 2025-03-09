import { NextResponse } from "next/server";
import { prisma } from '../../../../lib/prisma';



import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id_provinsi: string } }) {
  try {
    const id_provinsi = parseInt(params.id_provinsi);
    const kabupatens = await prisma.kabupatens.findMany({
      where: { id_provinsi },
      include: { master_provinsi: true },
    });

    return NextResponse.json({ success: true, data: kabupatens });
  } catch (error) {
    console.error("Error fetching kabupatens:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch kabupatens" },
      { status: 500 }
    );
  }
}
