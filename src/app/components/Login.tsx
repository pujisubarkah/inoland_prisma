import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post("/api/users/login", { email, password });
      const { user } = response.data;

      if (response.status === 200) {
        if (!user.is_verified) {
          setError("Email Anda belum diverifikasi. Silakan periksa email Anda.");
          return;
        }

        console.log("Login berhasil:", user);
        localStorage.setItem("user", JSON.stringify(user));

        // Redirect berdasarkan role_id
        if (user.role_id === "1") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }

        onClose();
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        console.error("Error saat login:", err.response.data?.error);
        setError(err.response.data?.error || "Terjadi kesalahan saat login.");
      } else {
        console.error("Error saat login:", err);
        setError("Terjadi kesalahan saat login.");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="relative max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg flex flex-col">
      <button onClick={onClose} className="absolute top-2 right-2 text-gray-700 hover:text-gray-900">
        &times;
      </button>

      <h2 className="text-2xl font-bold mb-4">Login</h2>

      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {error && <div className="mb-4 text-red-500">{error}</div>}

        <button
          type="submit"
          className="w-full bg-[#a2003b] text-white py-2 rounded-md hover:bg-red-800 transition duration-200"
        >
          Masuk
        </button>
      </form>
    </div>
  );
};

export default Login;

