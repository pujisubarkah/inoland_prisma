"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import axios from "axios";

interface NewsDetailType {
  title: string;
  date: string;
  deskripsi: string;
  image_url: string;
}

const NewsDetail = () => {
  const { id } = useParams() as { id: string };
  const [newsDetail, setNewsDetail] = useState<NewsDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        if (!id) {
          throw new Error("ID tidak valid");
        }
        console.log("Fetching news with ID:", id); // Debugging ID

        // Menggunakan dynamic route `/api/berita/{id}`
        const response = await axios.get(`/api/beritas/${id}`);
        console.log("API Response:", response.data); // Debugging response

        setNewsDetail(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching news:", err); // Debugging error
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || "Gagal mengambil berita");
        } else {
          setError("Terjadi kesalahan yang tidak diketahui");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetail();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!newsDetail) return <p className="text-center">Tidak ada data berita yang ditemukan.</p>;

  return (
    <div className="p-8 max-w-2xl mx-auto bg-gray-100 rounded-lg shadow-md transition-shadow duration-300 hover:shadow-lg">
      <Image
        className="w-full h-auto mb-6 rounded-lg transition-transform duration-300 hover:scale-105"
        src={newsDetail.image_url}
        alt={newsDetail.title}
        width={500}
        height={300}
      />
      <h1 className="text-2xl font-bold mb-4">{newsDetail.title}</h1>
      <p className="text-red-800 text-sm italic mb-4">{newsDetail.date}</p>
      <p className="text-lg mb-5 font-sans text-gray-600 text-justify">{newsDetail.deskripsi}</p>
    </div>
  );
};

export default NewsDetail;
