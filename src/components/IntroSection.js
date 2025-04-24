import React, { useState } from 'react';
import './IntroSection.css';
import group12 from './Group 12.png';
import group13 from './Group 13.png';
import group14 from './Group 14.png';
import group15 from './Group 15.png';
import grouptext from './group text.png';
// Import the flower images
import flowerGlow from './flower-glow.png';
import flower2 from './flower 2.png';
import flower3 from './flower 3.png';
import flower4 from './flower 4.png';
import { ChevronRight, MoveRight } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import './responsive.css';

const IntroSection = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const flowerImages = [flowerGlow, flower2, flower3, flower4];
  const navigate = useNavigate();
  const handleScrollButtonClick = () => {
    navigate('/coming-soon');
  };
  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % flowerImages.length);
  };

  return (
    <section className="intro-section">
      <div className="intro-col intro-col-left">
        <div className="intro-left-top">
          <img src={group12} alt="Group 12" className="group12-img" />
        </div>
        <div className="intro-left-bottom">
          <img src={group13} alt="Group 13" className="group13-img" />
          <span className="download-circle moveright"><MoveRight className="w-5 h-5" onClick={handleScrollButtonClick}/></span>

        </div>
      </div>
      <div className="intro-col intro-col-center">
        <div className="center-div center-top">
          <span className="download-circle chevron-right"><ChevronRight className="w-5 h-5" /></span>
          <img src={group14} alt="Group 14" className="group14-img" />
        </div>
        <div className="center-div center-middle">
          <img src={group15} alt="Group 15" className="group15-img" />
        </div>
        <div className="center-div center-bottom">
          <img src={grouptext} alt="Group text" className="group15-img" />
        </div>
      </div>
      <div className="intro-col intro-col-right">
        {/* Image slider with visible images */}
        <div className="image-slider-container">
          {flowerImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Flower ${index + 1}`}
              className={`slider-image ${index === currentImage ? 'active' : ''}`}
            />
          ))}
        </div>

        <span
          className="download-circle chevron-right-toggle"
          onClick={nextImage}
        >
          <ChevronRight className="w-5 h-5" />
        </span>


      </div>
    </section>
  );
};

export default IntroSection;