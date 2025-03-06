"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight, faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Carousel: React.FC = () => {
  const [images, setImages] = useState<{ link: string }[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideInterval = React.useRef<NodeJS.Timeout | null>(null);

  // Fetch images from API
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("/api/dokumens");
        if (Array.isArray(response.data) && response.data.every(item => item.link)) {
          setImages(response.data);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchImages();
  }, []);

  // Start automatic sliding
  useEffect(() => {
    slideInterval.current = setInterval(() => {
      nextSlide();
    }, 3000); // Change slide every 3 seconds

    // Cleanup interval on component unmount
    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current);
      }
    };
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 3) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 3 + images.length) % images.length);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-[#16578d] p-5 rounded-lg shadow-lg">
      <h1 className="font-bold text-2xl text-white mb-5">
        INFOGRAFIS INOVASI
      </h1>
      <hr className="w-24 h-1 bg-gradient-to-r from-[#16578d] via-black to-[#16578d] mb-5" />
      <div className="relative flex items-center justify-center">
        <button onClick={prevSlide} className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 text-white shadow-md hover:bg-pink-100">
          <FontAwesomeIcon icon={faCircleArrowLeft} size="2x" color="black" />
        </button>
        <div className="flex items-center justify-center">
          {images.length > 0 && [...Array(3)].map((_, i) => {
            const index = (currentIndex + i) % images.length;
            if (images[index]) {
              return (
                <Image 
                  key={index}
                  src={images[index].link}
                  alt={`Slide ${index}`}
                  width={500}
                  height={500}
                  className="h-96 w-auto flex-shrink-0 mr-5 rounded-lg object-cover transition-transform duration-500 ease-in-out"
                />
              );
            }
            return null;
          })}
        </div>
        <button onClick={nextSlide} className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 text-white shadow-md hover:bg-pink-100">
          <FontAwesomeIcon icon={faCircleArrowRight} size="2x" color="black" />
        </button>
      </div>
    </div>
  );
};

export default Carousel;

