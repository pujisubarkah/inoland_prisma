import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const prisma = new PrismaClient();

// ✅ Register (Mendaftarkan pengguna baru dengan verifikasi)
export async function REGISTER(req: Request) {
    try {
        const { nama_lengkap, email, password, instansi, role_id } = await req.json();

        if (!nama_lengkap || !email || !password || !instansi) {
            return new Response(JSON.stringify({ error: "Semua field wajib diisi." }), { status: 400 });
        }

        const existingUser = await prisma.users.findUnique({ where: { email } });
        if (existingUser) {
            return new Response(JSON.stringify({ error: "Email sudah digunakan." }), { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = crypto.randomBytes(32).toString("hex");

        const newUser = await prisma.users.create({
            data: { 
                nama_lengkap, 
                email, 
                password: hashedPassword, 
                instansi, 
                role_id, 
                is_verified: false, 
                verification_token: verificationToken
            },
        });

        return new Response(
            JSON.stringify({ 
                message: "Registrasi berhasil! Harap verifikasi email Anda.",
                user: { id: newUser.id, email: newUser.email },
                verification_token: verificationToken 
            }),
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Terjadi kesalahan saat registrasi." }), { status: 500 });
    }
}

// ✅ Verifikasi Email
export async function VERIFY_EMAIL(req: Request) {
    try {
        const { email, token } = await req.json();

        const user = await prisma.users.findUnique({ where: { email } });
        if (!user || user.verification_token !== token) {
            return new Response(JSON.stringify({ error: "Token tidak valid atau email tidak ditemukan." }), { status: 400 });
        }

        await prisma.users.update({
            where: { email },
            data: { is_verified: true, verification_token: null },
        });

        return new Response(JSON.stringify({ message: "Email berhasil diverifikasi!" }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Terjadi kesalahan saat verifikasi email." }), { status: 500 });
    }
}

// ✅ Get User Data
export async function GET(req: Request) {
    try {
        const userId = req.headers.get("Authorization");
        if (!userId) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }

        const user = await prisma.users.findUnique({
            where: { id: userId },
            select: { id: true, nama_lengkap: true, email: true, instansi: true, role_id: true }
        });

        if (!user) {
            return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
        }

        return new Response(JSON.stringify({ user }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}
