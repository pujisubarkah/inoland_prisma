"use client";

import React, { useState, useEffect } from "react";
import Image from 'next/image';
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight, faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import './Carousel.css';

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

  const nextSlide = React.useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 3) % images.length);
  }, [images.length]);

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
  }, [currentIndex, nextSlide]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 3 + images.length) % images.length);
  };

  return (
    <div className="carousel-container">
      <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', fontSize: '2rem', textAlign: 'center', margin: '20px 0 10px 0' }}>
      INFOGRAFIS INOVASI
    </h1>
    <hr style={{ width: '100px', border: 'none', height: '2px', background: 'linear-gradient(to right, #16578d, black, #16578d)', margin: '0 auto 20px auto' }} />
    
      <div className="carousel">
        <button onClick={prevSlide} className="carousel-button-prev">
          <FontAwesomeIcon icon={faCircleArrowLeft} size="2x" color="white" />
        </button>
        <div className="carousel-images">
  {images.length > 0 && [...Array(3)].map((_, i) => {
    const index = (currentIndex + i) % images.length;
    return (
      <div key={index} className="carousel-image-container">
        <Image 
          src={images[index].link}
          alt={`Slide ${index}`}
          width={500} 
          height={250} 
          className="carousel-image"
        />
      </div>
    );
  })}
</div>

        <button onClick={nextSlide} className="carousel-button-next">
          <FontAwesomeIcon icon={faCircleArrowRight} size="2x" color="white" />
        </button>
      </div>
    </div>
  );
};

export default Carousel;

