import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Register from "./Register";

interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post("/api/users/login", {
        email: email.trim(),
        password: password.trim(),
      });

      if (response.status === 200) {
        const { user } = response.data;

        if (!user?.is_verified) {
          setError("Email Anda belum diverifikasi. Silakan periksa email Anda.");
          return;
        }

        localStorage.setItem("user", JSON.stringify(user));

        if (user.role_id === "1") {
          await router.push("/dashboard");
        } else {
          await router.push("/");
        }

        onClose();
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data?.error || "Terjadi kesalahan saat login.");
      } else {
        setError("Terjadi kesalahan saat login.");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <motion.div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg flex flex-col"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-4 text-3xl text-gray-700 hover:text-gray-900"
          >
            &times;
          </button>

          <div className="flex">
            <div className="p-6 flex flex-col justify-center items-center w-1/3">
              <Image src="/ino.png" alt="Logo" width={128} height={128} />
            </div>

            <div className="p-6 w-2/3">
              <form onSubmit={handleLogin}>
                <h2 className="text-2xl font-bold mb-4">Login</h2>

                <div className="mb-4">
                  <label className="block text-gray-700">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a2003b]"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a2003b]"
                  />
                </div>

                {/* Menampilkan error jika ada */}
                {error && <div className="mb-4 text-red-500">{error}</div>}

                <button
                  type="submit"
                  className="w-full bg-[#3781c8] text-white py-2 rounded-md hover:bg-blue-800 transition duration-200"
                >
                  Masuk
                </button>

                <p className="mt-4 text-sm text-gray-600">
                  Belum punya akun?{" "}
                  <span
                    className="text-blue-600 hover:underline cursor-pointer"
                    onClick={() => setIsRegisterOpen(true)}
                  >
                    Daftar di sini
                  </span>
                </p>

                {/* Lupa Password */}
                <p className="mt-2 text-sm text-gray-600">
                  <span
                    className="text-blue-600 hover:underline cursor-pointer"
                    onClick={() => setError("Silakan hubungi admin Inoland untuk reset password.")}
                  >
                    Lupa Password?
                  </span>
                </p>
              </form>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Modal Register */}
      {isRegisterOpen && <Register isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />}
    </>
  );
};

export default Login;
