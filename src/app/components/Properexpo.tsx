import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';

const Proper = () => {
  const router = useRouter();

  interface NewsItem {
    id: number;
    title: string;
    image: string;
    author: string;
    instansi: string;
    date: string;
  }

  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = 20;

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Fetch berita from API with Axios
  const fetchBeritaFromAPI = async () => {
    try {
      const response = await axios.get(
        `https://properexpo.lan.go.id/app/api/tx-proper?perPage=${itemsPerPage}&page=${currentPage}`
      );
      const data = response.data.data.data; // Akses array data dari response

      // Format data sesuai kebutuhan
      const formattedData = data.map((item: {
        id_proper: number;
        judul: string;
        berkas_poster_landscape: string;
        nama: string;
        md_instansi?: { nama: string };
        created_at: string;
      }) => ({
        id: item.id_proper,
        title: item.judul,
        image: `https://properexpo.lan.go.id/uploads/properexpo-lan/berkas_poster_landscape/${item.berkas_poster_landscape}`,
        author: item.nama,
        instansi: item.md_instansi?.nama,
        date: item.created_at,
      }));

      // Set data ke state
      setNewsItems(formattedData);

      console.log('api:', response.config.url);
    } catch (error) {
      console.error('Error fetching news from API:', error);
    }
  };

  useEffect(() => {
    fetchBeritaFromAPI();
  }, [currentPage]);

  const handleItemClick = (id: number) => {
    router.push(`https://properexpo.lan.go.id/web/proper/detail/${id}`);
  };

  return (
    <div className="p-5 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="font-poppins font-bold text-2xl text-center my-5">
        PROYEK PERUBAHAN
      </h1>
      <hr className="w-24 h-1 mx-auto my-4 bg-gradient-to-r from-blue-800 via-black to-blue-800 border-0 rounded" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {newsItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleItemClick(item.id)}
            className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
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
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-sm text-blue-800">
                {item.author} - {item.instansi}
              </p>
            </div>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {currentPage > 1 && (
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg shadow hover:bg-gray-200 transition-colors duration-200"
            >
              Prev
            </button>
          )}
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
            const pageNumber = currentPage > 3 ? currentPage - 2 + i : i + 1;
            return (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`px-4 py-2 rounded-lg shadow transition-colors duration-200 ${
                  currentPage === pageNumber
                    ? 'bg-blue-800 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {pageNumber}
              </button>
            );
          })}
          {currentPage < totalPages && (
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg shadow hover:bg-gray-200 transition-colors duration-200"
            >
              Next
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Proper;