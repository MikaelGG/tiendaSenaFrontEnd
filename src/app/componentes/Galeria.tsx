'use client'

import React, { useState, useEffect } from 'react';
import Head from 'next/head';


const images = [
  'https://i.imgur.com/YLTkIEZ.jpg',
  'https://i.imgur.com/EjkKrv5.jpg',
  'https://i.imgur.com/wkHN2Iu.jpg',
  'https://i.imgur.com/f3qGHFb.jpg',
  'https://i.imgur.com/ILRVTkN.jpg'
];

const AutomaticGalleryPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleClick = (index: any) => {
    setCurrentIndex(index);
  };

  return (
    <div>
      <Head>
        <title>Automatic Image Gallery</title>
      </Head>
      <div className="gallery-container">
        {images.map((image, index) => (
          <div
            key={index}
            className={`gallery-item ${currentIndex === index ? 'active' : ''}`}
            onClick={() => handleClick(index)}
          >
            <img
              src={image}
              alt={`Image ${index + 1}`}
              className="gallery-image"
            />
          </div>
        ))}
      </div>
      <style jsx>{`
        .gallery-container {
          display: flex;
          justify-content: center;
          margin-top: 4rem;
        }

        .gallery-item {
          margin: 0.5rem;
          cursor: pointer;
          transition: transform 0.3s ease-in-out;
        }

       

        .gallery-image {
          width: 180px;
          height: 180px;
          object-fit: cover;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
};

export default AutomaticGalleryPage;


