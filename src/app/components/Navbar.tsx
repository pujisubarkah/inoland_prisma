'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Login from './Login';

interface UserProfile {
  nama_lengkap: string;
}

const Navbar = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('userProfile');
    if (storedUser) {
      setUserProfile(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userProfile');
    setUserProfile(null);
    router.push('/');
  };

  const menu = [
    { name: t('Beranda'), path: '/' },
    { name: t('Layanan Inovasi'), path: '/layanan' },
    { name: t('Cari Inovasi'), path: '/cari' },
    { name: t('Referensi'), path: '/referensi' },
    { name: t('Pengetahuan'), path: '/pengetahuan' },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 bg-[#3781c8] shadow-md z-50 border-b border-gray-300 relative">
        <div className="flex items-center">
          <Image src="/lanri.png" alt="Logo" width={100} height={100} className="mr-3 p-2" />
          <span className="text-white font-bold text-xl sm:text-4xl">INOLAND</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex gap-6 font-poppins font-bold text-lg text-white">
            {menu.map((item) => (
              <li key={item.name}>
                <Link href={item.path} className="hover:text-[#3781c8] hover:bg-white p-2 rounded">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section (Profile & Language) */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-white" onClick={() => { 
            setMenuOpen(!isMenuOpen); 
            console.log("Menu state:", !isMenuOpen); 
          }}>
            ☰
          </button>

          {/* Mobile Menu Dropdown */}
          {isMenuOpen && (
            <ul className="absolute top-full left-0 w-full bg-white shadow-lg rounded-lg p-4 md:hidden z-50">
              {menu.map((item) => (
                <li key={item.name}>
                  <Link href={item.path} className="text-[#3781c8] hover:bg-[#3781c8] hover:text-white block p-2 rounded">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {/* User Profile */}
          {userProfile ? (
            <div className="relative">
              <button onClick={() => setProfileOpen(!isProfileOpen)}>
                <FontAwesomeIcon icon={faUser} className="text-white text-lg" />
              </button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20">
                  <p className="px-4 py-2 text-sm text-gray-700">{t('Selamat Datang')}, {userProfile.nama_lengkap}!</p>
                  <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">{t('Dashboard')}</Link>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    {t('Logout')}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button onClick={() => setModalOpen(true)} className="border-2 border-white bg-[#3781c8] text-white py-2 px-4 rounded-lg">
              {t('Masuk')}
            </button>
          )}

          {/* Language Selector */}
          <div className="flex gap-2">
            <button onClick={() => changeLanguage('en')}>
              <Image src="/uk_flag.png" alt="English" width={30} height={20} className="border border-gray-300 rounded-md" />
            </button>
            <button onClick={() => changeLanguage('id')}>
              <Image src="/indonesia_flag.png" alt="Bahasa Indonesia" width={30} height={20} className="border border-gray-300 rounded-md" />
            </button>
          </div>
        </div>
      </nav>

      {/* Modal Login */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-40">
          <div className="bg-white p-8 rounded shadow-lg w-1/3 relative">
            <button 
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" 
              onClick={() => setModalOpen(false)}
            >
              ✖
            </button>
            <Login 
              isOpen={isModalOpen} 
              onClose={() => setModalOpen(false)} 
              onLoginSuccess={(loggedInUser: UserProfile) => {
                localStorage.setItem('userProfile', JSON.stringify(loggedInUser));
                setUserProfile(loggedInUser);
                setModalOpen(false);
              }} 
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

