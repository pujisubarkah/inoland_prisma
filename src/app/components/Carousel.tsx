"use client";

import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import Image from 'next/image';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight, faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import './Carousel.css';

const Carousel: React.FC = () => {
  const [images, setImages] = useState<{ link: string }[]>([]);

  // Fetch images from API
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("/api/dokumens");
        if (Array.isArray(response.data) && response.data.every(item => item && item.link)) {
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

  // Custom Next Arrow
  const NextArrow = (props: { onClick?: () => void }) => {
    const { onClick } = props;
    return (
      <button onClick={onClick} className="carousel-button-next" aria-label="Next slide">
        <FontAwesomeIcon icon={faCircleArrowRight} size="2x" color="white" />
      </button>
    );
  };

  // Custom Previous Arrow
  const PrevArrow = (props: { onClick?: () => void }) => {
    const { onClick } = props;
    return (
      <button onClick={onClick} className="carousel-button-prev" aria-label="Previous slide">
        <FontAwesomeIcon icon={faCircleArrowLeft} size="2x" color="white" />
      </button>
    );
  };

  // Settings for React Slick
  const settings = {
    dots: true, // Tampilkan dots navigasi
    infinite: true, // Infinite looping
    speed: 500, // Kecepatan transisi
    slidesToShow: 3, // Jumlah slide yang ditampilkan
    slidesToScroll: 1, // Jumlah slide yang digeser
    autoplay: true, // Autoplay aktif
    autoplaySpeed: 3000, // Interval autoplay (3 detik)
    nextArrow: <NextArrow />, // Custom next arrow
    prevArrow: <PrevArrow />, // Custom prev arrow
    responsive: [
      {
        breakpoint: 1024, // Untuk layar <= 1024px
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600, // Untuk layar <= 600px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="carousel-container" style={{ backgroundColor: '#16578d' }}>
      <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', fontSize: '2rem', textAlign: 'center', margin: '20px 0 10px 0' }}>
        INFOGRAFIS INOVASI
      </h1>
      <hr style={{ width: '100px', border: 'none', height: '2px', background: 'linear-gradient(to right, #16578d, black, #16578d)', margin: '0 auto 20px auto' }} />
    
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="carousel-image-container">
            <Image 
              src={image.link} 
              alt={`Slide ${index}`} 
              width={500} 
              height={500} 
              className="carousel-image"
              onError={(e) => {
                e.currentTarget.src = '/path/to/fallback/image.jpg'; // Fallback image
              }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;