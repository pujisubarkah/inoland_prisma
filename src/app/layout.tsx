import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";

// Konfigurasi font Poppins
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins", // CSS Variable untuk digunakan di Tailwind
});

export const metadata: Metadata = {
  title: "Inolands",
  description: "Inovasi Inovasi Inovasi",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="flex flex-col min-h-screen font-sans">
        <Navbar />
        <main className="flex-grow">{children}</main> {/* Pastikan flex-grow di sini */}
        <Footer /> {/* Tidak perlu className, styling langsung di Footer.tsx */}
      </body>
    </html>
  );
}
