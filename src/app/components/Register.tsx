import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";

interface RegisterProps {
  isOpen: boolean;
  onClose: () => void;
}

const Register: React.FC<RegisterProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nama_lengkap: "",
    email: "",
    password: "",
    instansi: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await axios.post("/api/users", formData);
      alert(response.data.message);
      onClose(); // Tutup modal setelah registrasi berhasil
      router.push("/verify-email");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.error || "Terjadi kesalahan saat registrasi");
      } else {
        setErrorMessage("Terjadi kesalahan saat registrasi");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background hitam transparan */}
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>

      {/* Modal Box dengan animasi */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className="relative bg-white shadow-md rounded-lg px-8 pt-6 pb-8 w-full max-w-lg mx-4 z-10"
      >
        {/* Tombol Close */}
        <button onClick={onClose} className="absolute top-2 right-3 text-gray-600 text-2xl hover:text-gray-800">
          &times;
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">Daftar</h2>

        {errorMessage && <p className="text-red-500 mb-4 text-center">{errorMessage}</p>}

        <form onSubmit={handleRegister} className="w-full">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Nama Lengkap</label>
            <input
              type="text"
              name="nama_lengkap"
              value={formData.nama_lengkap}
              onChange={handleChange}
              required
              className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              placeholder="Masukkan nama lengkap"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Instansi</label>
            <input
              type="text"
              name="instansi"
              value={formData.instansi}
              onChange={handleChange}
              required
              className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              placeholder="Masukkan instansi Anda"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              placeholder="Masukkan email"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              placeholder="Masukkan password"
            />
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-[#3781c8] hover:bg-[#2a6a9e] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Daftar
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
