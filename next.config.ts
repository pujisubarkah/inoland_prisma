import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["upload.wikimedia.org", "ierpxhvdhstaielftcmb.supabase.co"], // Tambahkan domain gambar eksternal
  },
};

export default nextConfig;
