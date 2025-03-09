import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["upload.wikimedia.org", "ierpxhvdhstaielftcmb.supabase.co",'properexpo.lan.go.id',"res4.tuxedovation.com",'jippnas.menpan.go.id'], // Tambahkan domain gambar eksternal
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "ierpxhvdhstaielftcmb.supabase.co",
      },
      {
        protocol: "https",
        hostname: "properexpo.lan.go.id",
      },
      {
        protocol: "https",
        hostname: "res4.tuxedovation.com",
      },
      {
        protocol: "https",
        hostname: "jippnas.menpan.go.id",
      },
    ],
  },
};

export default nextConfig;
