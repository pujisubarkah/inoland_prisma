"use client";

import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faMailBulk, faPhone } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-transparent p-0">
      <div className="max-w-[1200px] mx-auto">
        {/* Divider */}
        <hr className="border-t-2 bg-[#a3002b] h-px m-0 p-0" />

        {/* Footer Top */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-0">
          <Image src="/ino.png" alt="INO Logo" width={100} height={50} className="mb-4 md:mb-0" />
          <div className="stakeholders">
            <h4 className="text-2xl mb-4">Pemangku Kepentingan INOLAND</h4>
            <div className="flex items-center space-x-5">
              <a href="https://lan.go.id/">
                <Image src="/lanri.png" alt="lanri Logo" width={150} height={150} />
              </a>
              <a href="https://menpan.go.id/">
                <Image src="/panrb.png" alt="panrb Logo" width={150} height={150} />
              </a>
              <a href="https://kemendagri.go.id/">
                <Image src="/kemendagri.png" alt="kemendagri Logo" width={80} height={80} />
              </a>
            </div>
          </div>
        </div>

        <br />

        {/* Footer Bottom */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Section 1: Tentang Kami */}
          <div>
            <h4 className="text-2xl font-poppins mb-4 font-bold">Tentang Kami</h4>
            <ul className="list-none p-0 space-y-2">
              <li>
                <a href="https://tuxedovation.inovasi.litbang.kemendagri.go.id/" className="text-gray-800 hover:underline">
                  Kementerian Dalam Negeri
                </a>
              </li>
              <li>
                <a href="https://jippnas.menpan.go.id/" className="text-gray-800 hover:underline">
                  Kementerian PANRB
                </a>
              </li>
              <li>
                <a href="https://inoland.lan.go.id" className="text-gray-800 hover:underline">
                  Lembaga Administrasi Negara
                </a>
              </li>
            </ul>
          </div>

          {/* Section 2: Jelajahi */}
          <div>
            <h4 className="text-2xl font-poppins mb-4 font-bold">Jelajahi</h4>
            <ul className="list-none p-0 space-y-2">
              <li>
                <Link href="/" className="text-gray-800 hover:underline">Beranda</Link>
              </li>
              <li>
                <Link href="/layanan" className="text-gray-800 hover:underline">Layanan Inovasi</Link>
              </li>
              <li>
                <Link href="/cari" className="text-gray-800 hover:underline">Cari Inovasi</Link>
              </li>
              <li>
                <Link href="/referensi" className="text-gray-800 hover:underline">Referensi Inovasi</Link>
              </li>
            </ul>
          </div>

          {/* Section 3: Hubungi Kami */}
          <div>
            <h4 className="text-2xl font-poppins mb-4 font-bold">Hubungi Kami</h4>
            <ul className="list-none p-0 space-y-2">
              <li>
                <FontAwesomeIcon icon={faPhone} className="mr-2" /> (+6221) 3828601 - 89
              </li>
              <li>
                <FontAwesomeIcon icon={faMailBulk} className="mr-2" /> pian@lan.go.id
              </li>
              <li>
                <FontAwesomeIcon icon={faLocationDot} className="mr-2" /> Jl. Veteran No 10 Jakarta Pusat - 10110
              </li>
            </ul>
          </div>

          {/* Section 4: Ikuti Kami */}
          <div>
            <h4 className="text-2xl font-poppins mb-4 font-bold">Ikuti Kami</h4>
            <ul className="list-none p-0 space-y-2">
              <li>
                <a href="https://www.youtube.com/@InovasiLANRI" target="_blank" rel="noreferrer" className="flex items-center space-x-2">
                  <Image src="/youtube-icon.png" alt="YouTube Icon" width={30} height={30} />
                  <span>Inovasi LANRI</span>
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/pian_lanri" target="_blank" rel="noreferrer" className="flex items-center space-x-2">
                  <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/1024px-Instagram_icon.png" alt="Instagram Icon" width={30} height={30} />
                  <span>@pian_lanri</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <br />

      {/* Footer Copyright */}
      <div className="text-center bg-[#16578D] text-[#f7f4f4] text-lg border-2 py-0.5 w-full font-poppins">
        <p>&copy; 2024 - Pusat Inovasi Administrasi Negara LANRI. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
