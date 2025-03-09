import { NextResponse } from "next/server";
import { prisma } from '../../../lib/prisma';



export async function GET() {
  try {
    const kabupatens = await prisma.kabupatens.findMany({
      include: {
        master_provinsi: true, // ✅ Include data dari master_provinsi
      },
    });

    return NextResponse.json({ success: true, data: kabupatens });
  } catch (error) {
    console.error("Error fetching provinsis:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch provinsis" },
      { status: 500 }
    );
  }
}
