import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
import Loading from './LoadingSpinner';
import './NewsGrid.css';

interface PdfItem {
  id: number;
  pdf_judul: string;
  pdf_cover: string;
  pdf_publisher: string;
  image: string;
  title: string;
  pemda: string;
}

const Direktori = () => {
  const router = useRouter();
  const [newsItems, setNewsItems] = useState<PdfItem[]>([]);
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
    const fetchPdfList = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`/api/pdflist?page=${currentPage}&limit=${itemsPerPage}`);
        console.log("API Response:", response.data);

        if (response.data) {
          const { data, count } = response.data;
          setTotalItems(count || 0);
          const formattedData = data.map((item: PdfItem) => ({
            id: item.id,
            title: item.pdf_judul,
            image: item.pdf_cover,
            pemda: item.pdf_publisher,
          }));

          setNewsItems(formattedData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Gagal memuat data. Silakan coba lagi.');
      } finally {
        setLoading(false);
      }
    };

    fetchPdfList();
  }, [currentPage]);

  const handleItemClick = (id: number) => {
    router.push(`/direktori/${id}`);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = newsItems
    .sort((a, b) => b.id - a.id)
    .slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="app">
      <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', fontSize: '2rem', textAlign: 'center', margin: '20px 0 10px 0' }}>
        DIREKTORI INOVASI
      </h1>
      <hr style={{ width: '100px', border: 'none', height: '2px', background: 'linear-gradient(to right, #16578d, black, #16578d)', margin: '0 auto 20px auto' }} />
      
      {loading ? (
        <Loading />
      ) : error ? (
        <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>
      ) : (
        <div className="news-grid">
          {currentItems.map((item) => (
            <div key={item.id} className="news-item" onClick={() => handleItemClick(item.id)}>
              <Image
                src={item.image}
                alt={item.title}
                width={500}
                height={500}
                className="news-image"
              />
              <div className="news-content">
                <h3><b>{item.title}</b></h3>
                <p className="publisher">{item.pemda}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {totalPages > 1 && (
        <div className="pagination">
          {currentPage > 1 && (
            <button onClick={() => handlePageChange(currentPage - 1)} className="pagination-button">
              Prev
            </button>
          )}
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
            const pageNumber = currentPage > 3 ? currentPage - 2 + i : i + 1;
            return (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`pagination-button ${currentPage === pageNumber ? 'active' : ''}`}
              >
                {pageNumber}
              </button>
            );
          })}
          {currentPage < totalPages && (
            <button onClick={() => handlePageChange(currentPage + 1)} className="pagination-button">
              Next
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Direktori;
