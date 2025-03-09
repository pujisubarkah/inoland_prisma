"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Infografis from  "./components/Carousel";
import Proper from "./components/Properexpo";
import Berita from './components/Berita';


const Beranda = () => {
  const router = useRouter();

  const handleSelengkapnyaClick = () => {
    router.push("/selengkapnya");
  };

  const handleTontonVideoClick = () => {
    router.push("/tonton-video");
  };

  return (
    <div className="Beranda">
      <main className="flex flex-col items-center text-center py-12 px-4 bg-[#16578d]">
        <div className="flex flex-col md:flex-row items-center justify-center text-white py-12 px-6 rounded-lg mx-5 p-5">
          <Image
            src="https://ierpxhvdhstaielftcmb.supabase.co/storage/v1/object/public/assets/hero-img.png"
            alt="Illustration of people interacting with technology"
            width={500}
            height={500}
            className="w-full md:w-2/5 max-w-md mr-0 md:mr-6 mb-6 md:mb-0"
          />
          <div className="text-left w-full md:w-3/5">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">INOLAND</h1>
            <p className="text-sm md:text-base mb-6">
              INOLAND adalah web informasi oleh Pusat Inovasi Administrasi Negara yang juga merupakan sistem integrasi
              untuk penguatan kapasitas berinovasi terdiri dari berbagai program advokasi pembelajaran inovasi
            </p>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
              <button className="bg-gray-100 text-[#243a55] px-4 py-2 rounded font-bold" onClick={handleSelengkapnyaClick}>
                Selengkapnya
              </button>
              <button className="flex items-center space-x-2 text-white" onClick={handleTontonVideoClick}>
                <i className="fas fa-play-circle"></i>
                <span>Tonton Video</span>
              </button>
            </div>
            <section className="text-blue-900 py-4">
              <div className="container mx-auto flex flex-wrap justify-around space-y-4 md:space-y-0 md:space-x-2">
                {[
                  { label: "IDE INOVASI", value: "13.339", bg: "bg-blue-600" },
                  { label: "PEMERINTAH DAERAH", value: "120", bg: "bg-green-600" },
                  { label: "ALUMNI WCI", value: "1.025", bg: "bg-teal-600" },
                  { label: "LAUNCHING", value: "9.325", bg: "bg-yellow-500" },
                ].map((item, index) => (
                  <div key={index} className="text-center p-4 bg-gray-100 rounded-lg shadow-md w-full md:w-auto">
                    <div className={`${item.bg} text-white text-lg font-bold py-2 px-4 rounded`}>{item.label}</div>
                    <div className="text-2xl font-bold py-2">{item.value}</div>
                  </div>
                ))}
              </div>
            </section>
          
          </div>
        </div>
       
      </main>
      <Berita />
      <Infografis/>
      <Proper/>
    </div>
  );
};

export default Beranda;
