import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface NewsItem {
  id: number;
  image_link: string;
  nama_inovasi: string;
  nama_instansi: string;
}

const InovasiLAN = () => {
  const router = useRouter();
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 12;

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    const fetchInovasi = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`/api/inovasi_lan?page=${currentPage}&limit=${itemsPerPage}`);
        setNewsItems(response.data.data);
        setTotalItems(response.data.total);
      } catch (error) {
        console.error('Error fetching news:', error);
        setError('Gagal memuat data inovasi.');
      } finally {
        setLoading(false);
      }
    };

    fetchInovasi();
  }, [currentPage]);

  const handleItemClick = (id: number) => {
    router.push(`/inovasi/${id}`);
  };

  return (
    <div className="p-5 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="font-poppins font-bold text-2xl text-center my-5">
        LIST INOVASI
      </h1>
      <hr className="w-24 h-1 mx-auto my-4 bg-gradient-to-r from-blue-800 via-black to-blue-800 border-0 rounded" />
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {newsItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleItemClick(item.id)}
            className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative w-full h-48">
              <Image
                src={item.image_link}
                alt={item.nama_inovasi}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg">{item.nama_inovasi}</h3>
              <p className="text-sm text-blue-800">{item.nama_instansi}</p>
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
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`px-4 py-2 rounded-lg shadow transition-colors duration-200 ${
                currentPage === i + 1
                  ? 'bg-blue-800 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {i + 1}
            </button>
          ))}
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

export default InovasiLAN;