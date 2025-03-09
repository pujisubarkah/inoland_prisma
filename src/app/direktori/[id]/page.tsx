"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";

const PdfDetail = () => {
  const pathname = usePathname();
  const id = pathname.split("/").pop(); // Ambil bagian terakhir dari URL sebagai ID

  console.log("ID dari Pathname:", id); // Debugging ID

  interface PdfItem {
    pdf_judul: string;
    pdf_publisher: string;
    pdf_url: string;
  }

  const [item, setItem] = useState<PdfItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      console.warn("ID tidak ditemukan!");
      setLoading(false);
      return;
    }

    const fetchPdfDetail = async () => {
      console.log(`Fetching data dari /api/pdflist/${id}`);
      try {
        const response = await axios.get(`/api/pdflist/${id}`);
        console.log("API Response:", response.data);
        setItem(response.data);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Gagal mengambil data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPdfDetail();
  }, [id]);

  if (loading) {
    console.log("Masih loading...");
    return <p>Loading...</p>;
  }

  if (error) {
    console.log("Terjadi error:", error);
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "1200px",
        margin: "20px auto",
        background: "#f9f9f9",
        borderRadius: "12px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      {item && (
        <>
          <h1 style={{ fontSize: "2.5em", fontWeight: "bold", fontFamily: "Georgia" }}>
            {item.pdf_judul}
          </h1>
          <p style={{ fontSize: "1.2em", color: "#555" }}>{item.pdf_publisher}</p>
          <br />
          <div style={{ position: "relative", paddingTop: "max(60%, 324px)", width: "100%", height: "0" }}>
            <iframe
              style={{
                position: "absolute",
                border: "none",
                width: "100%",
                height: "100%",
                left: "0",
                top: "0",
              }}
              src={item.pdf_url}
              seamless
              scrolling="no"
              frameBorder="0"
              allowTransparency
              allowFullScreen
            ></iframe>
          </div>
        </>
      )}
    </div>
  );
};

export default PdfDetail;
