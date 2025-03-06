'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

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
        const response = await fetch(`/api/berita?id=${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Gagal mengambil berita');
        }
        
        setNewsDetail(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchNewsDetail();
    }
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="p-8 max-w-2xl mx-auto bg-gray-100 rounded-lg shadow-md transition-shadow duration-300 hover:shadow-lg">
      {newsDetail && (
        <>
          <Image
            className="w-full h-auto mb-6 rounded-lg transition-transform duration-300 hover:scale-105"
            src={newsDetail.image_url}
            alt={newsDetail.title}
            width={500}
            height={300}
          />
          <p className="text-red-800 text-sm italic mb-4">{newsDetail.date}</p>
          <p className="text-lg mb-5 font-sans text-gray-600 text-justify">{newsDetail.deskripsi}</p>
        </>
      )}
    </div>
  );
};

export default NewsDetail;