import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// ✅ POST: Login
export async function LOGIN(req: Request) {
    try {
        const { email, password } = await req.json();

        // Cek apakah email dan password diisi
        if (!email || !password) {
            return new Response(JSON.stringify({ error: "Email dan password wajib diisi." }), { status: 400 });
        }

        // Cari pengguna berdasarkan email
        const user = await prisma.users.findUnique({ where: { email } });
        if (!user) {
            return new Response(JSON.stringify({ error: "Email atau password salah." }), { status: 401 });
        }

        // Cek apakah email sudah diverifikasi
        if (!user.is_verified) {
            return new Response(JSON.stringify({ error: "Akun belum diverifikasi. Silakan cek email Anda." }), { status: 403 });
        }

        // Cek kecocokan password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return new Response(JSON.stringify({ error: "Email atau password salah." }), { status: 401 });
        }

        // Jika login berhasil, kirim data pengguna
        return new Response(
            JSON.stringify({
                message: "Login berhasil!",
                user: {
                    id: user.id,
                    nama_lengkap: user.nama_lengkap,
                    email: user.email,
                    instansi: user.instansi,
                    role_id: user.role_id
                }
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Terjadi kesalahan saat login." }), { status: 500 });
    }
}
