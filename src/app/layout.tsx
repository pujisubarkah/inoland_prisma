import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import Chatbot from './components/Chatbot'; // Import Chatbot
import './globals.css';

// Konfigurasi font Poppins
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins', // CSS Variable untuk digunakan di Tailwind
});

export const metadata: Metadata = {
  title: 'Inolands',
  description: 'Inovasi Inovasi Inovasi',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="flex flex-col min-h-screen font-sans relative">
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
        </main>
        <Chatbot /> {/* Tambahkan Chatbot di sini */}
        <Footer />
      </body>
    </html>
  );
}
