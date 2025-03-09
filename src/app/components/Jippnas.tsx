"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const Jippnas = () => {
  interface NewsItem {
    id: string;
    title: string;
    image: string;
    pemda: string;
    date: string;
  }

  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);

  useEffect(() => {
    const fetchBeritaFromAPI = async () => {
      try {
        const response = await fetch("https://jippnas.menpan.go.id/unggulan");
        const data = await response.json();

        if (data?.inovasi) {
          const formattedData = data.inovasi.map((item: { id: string; judul: string; img_1: string; nm_instansi: string; waktu: string }) => ({
            id: item.id,
            title: item.judul,
            image: `https://jippnas.menpan.go.id/storage/${item.img_1}`,
            pemda: item.nm_instansi,
            date: item.waktu,
          }));

          setNewsItems(formattedData);
        }
      } catch (error) {
        console.error("Error fetching news from API:", error);
      }
    };

    fetchBeritaFromAPI();
  }, []); // Fetch data hanya sekali saat komponen dimount

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center my-4">ETALASE INOVASI JIPPNAS</h1>
      <div className="h-1 w-24 bg-gradient-to-r from-red-500 via-black to-red-500 mx-auto mb-6"></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {newsItems.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer transform transition hover:scale-105"
            onClick={() => window.open(`https://jippnas.menpan.go.id/inovasi/${item.id}`, "_blank")}
          >
            <div className="relative w-full h-48">
              <Image
                src={item.image}
                alt={item.title}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-red-700 text-sm">{item.pemda}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jippnas;
