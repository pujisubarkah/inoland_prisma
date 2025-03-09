"use client";

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface NewsItem {
  id: string;
  title: string;
  image: string;
  image_url: string;
  description: string;
  date: string;
}

export default function MorningNews() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Jumlah berita per halaman

  // Fetch berita dari API `/api/beritas`
  const fetchBerita = async () => {
    try {
      const response = await fetch('/api/beritas');
      const data = await response.json();

      const formattedData = data.map((item: NewsItem) => ({
        id: item.id,
        title: item.title,
        image: item.image_url,
        description: item.description,
        date: item.date,
      }));

      setNewsItems(formattedData);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  useEffect(() => {
    fetchBerita();
  }, []);

  const indexOfLastNews = currentPage * itemsPerPage;
  const indexOfFirstNews = indexOfLastNews - itemsPerPage;
  const currentNews = newsItems.slice(indexOfFirstNews, indexOfLastNews);

  const totalPages = Math.ceil(newsItems.length / itemsPerPage);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold font-poppins">
          🔥 Update Terkini untuk Sobat Inovasi! Simak Beritanya
        </h1>
        <p className="text-gray-500 mt-2">{new Date().toLocaleDateString()}</p>
      </header>

      {/* Berita Utama */}
      {newsItems.length > 0 && (
        <section className="mb-8">
          <div className="relative w-full h-96 rounded-lg overflow-hidden">
            <Image
              src={newsItems[0].image}
              alt={newsItems[0].title}
              layout="fill"
              objectFit="cover"
              className="brightness-110"
            />
            <div className="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-black via-transparent to-transparent">
              <div>
                <Link href={`/berita/${newsItems[0].id}`}>
                  <h2 className="text-white text-2xl font-bold hover:underline cursor-pointer">
                    {newsItems[0].title}
                  </h2>
                </Link>
                <p className="text-gray-300 mt-2">{newsItems[0].description}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Daftar Berita dengan Pagination */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 font-poppins">Berita Lainnya</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {currentNews.map((news) => (
            <div
              key={news.id}
              className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative w-32 h-20 flex-shrink-0">
                <Image
                  src={news.image}
                  alt={news.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <div>
                <Link href={`/berita/${news.id}`}>
                  <h3 className="text-lg font-bold hover:underline cursor-pointer">
                    {news.title}
                  </h3>
                </Link>
                <p className="text-gray-600 text-sm mt-1">{news.description}</p>
                <p className="text-gray-500 text-xs mt-2">{news.date}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6 space-x-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg ${
              currentPage === 1
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-800 text-white hover:bg-blue-900'
            } transition-colors duration-200`}
          >
            ⬅️ Sebelumnya
          </button>

          <span className="text-lg font-semibold flex items-center">
            {currentPage} / {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg ${
              currentPage === totalPages
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-800 text-white hover:bg-blue-900'
            } transition-colors duration-200`}
          >
            Berikutnya ➡️
          </button>
        </div>
      </section>
    </div>
  );
}