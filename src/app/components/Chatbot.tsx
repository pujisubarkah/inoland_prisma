"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from 'next/image';
import { Message } from "./types"; // Pastikan ini adalah path yang benar ke file types

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false); // Toggle chatbot
  const [data, setData] = useState<string>(""); // State untuk menyimpan konten file .txt
  const [isLoading, setIsLoading] = useState(false); // State untuk loading
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Baca file .txt saat komponen dimuat
  useEffect(() => {
    fetch('/data.txt') // Pastikan path-nya sesuai
      .then((response) => response.text())
      .then((text) => {
        setData(text); // Simpan seluruh konten file ke state
      })
      .catch((error) => {
        console.error("Error reading file:", error);
      });
  }, []);

  // Fungsi untuk membuat pesan bot
  const createChatBotMessage = (text: string): Message => ({
    id: String(Date.now()), 
    text,
    sender: "inobot",
  });

  // Fungsi untuk mengirim pesan
  const sendMessage = async () => {
    if (!input.trim() || isLoading) return; // Jangan proses jika sedang loading

    // Tambahkan pesan pengguna
    const userMessage: Message = {
      id: String(Date.now()),
      text: input,
      sender: "user",
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Tambahkan pesan loading
    const loadingMessage: Message = {
      id: "loading",
      text: "Wah pertanyaannya berat nih, Tunggu sebentar, ino akan memberikan jawaban...",
      sender: "inobot",
    };
    setMessages((prev) => [...prev, loadingMessage]);
    setIsLoading(true); // Set loading ke true

    try {
      // Kirim pesan ke DeepSeek dengan konteks dari file .txt
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
          "HTTP-Referer": "https://inoland.lan.go.id",
          "X-Title": "Your Site Name",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-chat:free", // Model yang digunakan
          messages: [
            {
              role: "system",
              content: `Anda adalah seorang Aparatur Sipil Negara (ASN) yang siap membantu menjawab pertanyaan terkait administrasi publik, kebijakan pemerintah, dan layanan publik. Berikut adalah data yang bisa Anda gunakan sebagai referensi:\n\n${data}\n\nJawablah pertanyaan hanya berdasarkan data di atas. Jika pertanyaan tidak ada dalam data, jawab dengan "Maaf, saya tidak menemukan jawaban yang sesuai."`,
            },
            { role: "user", content: input },
          ],
        }),
      });

      const responseData = await response.json();

      // Hapus pesan loading
      setMessages((prev) => prev.filter((msg) => msg.id !== "loading"));

      // Tambahkan respons bot ke state
      const botMessage: Message = {
        id: String(Date.now() + 1),
        text: responseData.choices[0].message.content,
        sender: "inobot",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);

      // Hapus pesan loading
      setMessages((prev) => prev.filter((msg) => msg.id !== "loading"));

      // Tambahkan pesan error ke state
      const errorMessage: Message = {
        id: String(Date.now() + 2),
        text: "⚠️ Error communicating with the bot.",
        sender: "inobot",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false); // Set loading ke false
    }
  };

  // Fungsi untuk mengirim pesan greeting
  const sendGreeting = useCallback(() => {
    const greetingMessage: Message = createChatBotMessage("👋 Hello Sobat Ino! ada yang bisa saya bantu?");
    setMessages((prev) => [...prev, greetingMessage]);
  }, []);

  // Mengirim pesan greeting saat chatbot dibuka
  useEffect(() => {
    if (isOpen) {
      sendGreeting();
    }
  }, [isOpen, sendGreeting]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Tombol Buka/Tutup Chatbot */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-0 border-none bg-transparent focus:outline-none"
      >
        <Image
          src="/ino.png" // Path ke gambar di folder public
          alt="Chatbot Icon"
          width={48} // Lebar gambar
          height={48} // Tinggi gambar
          className="" // Tidak ada kelas tambahan
        />
      </button>

      {/* Chatbot Box */}
      {isOpen && (
        <div className="bg-white shadow-lg rounded-lg p-4 w-80 h-96 border border-gray-300 flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="text-lg font-semibold">Inobot</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-red-500 font-bold hover:text-red-700"
            >
              ✕
            </button>
          </div>

          {/* Pesan */}
          <div className="flex-grow overflow-y-auto p-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-2 rounded ${
                  msg.sender === "user"
                    ? "text-right text-blue-500"
                    : "text-left text-gray-700"
                }`}
              >
                {msg.sender === "user" ? (
                  <Image
                    src="/user.png" // Gambar untuk pengguna
                    alt="User Icon"
                    width={12} // Lebar gambar
                    height={12} // Tinggi gambar
                    className="inline-block mr-2" // Styling untuk gambar
                  />
                ) : (
                  <Image
                    src="/ino.png" // Gambar untuk bot
                    alt="Bot Icon"
                    width={12} // Lebar gambar
                    height={12} // Tinggi gambar
                    className="inline-block mr-2" // Styling untuk gambar
                  />
                )}
                <strong>{msg.sender === "user" ? "User" : "InoBot"}:</strong> {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Chat */}
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ketik pesan..."
              className="flex-grow p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading} // Disable input saat loading
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 text-white px-3 rounded hover:bg-blue-600 disabled:bg-gray-400"
              disabled={isLoading} // Disable button saat loading
            >
              {isLoading ? "Loading..." : "Send"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;