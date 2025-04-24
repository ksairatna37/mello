import React, { useState, useEffect, useRef } from 'react';
import './FeaturesSection.css';
import orb from './orb.png';
import group16 from './Group 16.png';
import Smartphone from './Smartphone RAM.png';
import Sparkling from './Sparkling.png';
import Care from './Care.png';
import Friends from './Friends.png';
import Audio from './Audio Wave.png';
import './responsive.css';
import ai from './ai (2).png';
import gentle from './gentle.jpg';
import memory from './memory.png';
import voice from './voice.png';

const FeaturesSection = () => {
  // State to track the currently displayed image
  const [currentImage, setCurrentImage] = useState(orb);
  const [fade, setFade] = useState(false);
  const [activeFeature, setActiveFeature] = useState(1);
  const intervalRef = useRef(null);

  // Map of feature indexes to their corresponding images
  const featureImages = {
    1: orb,      // Default - Self-Care
    2: ai,       // Emotionally Intelligent AI Companion
    3: gentle,   // Gentle, Human-Like Experience
    4: memory,   // Memory-Powered Conversations
    5: voice     // Voice Chat Support
  };
  // Map of feature indexes to their corresponding colors
  const featureColors = {
    1: '#222222', // Example: cyan
    2: '#222222', // Example: blue
    3: '#222222', // Example: purple
    4: '#222222', // Example: orange
    5: '#222222'  // Example: black
  };
  const featureIndexes = Object.keys(featureImages).map(Number);

  // Mobile auto-cycle effect
  useEffect(() => {
    const isMobile = window.innerWidth < 900;
    if (isMobile) {
      let idx = 1;
      intervalRef.current = setInterval(() => {
        setFade(true);
        setTimeout(() => {
          setCurrentImage(featureImages[featureIndexes[idx]]);
          setActiveFeature(featureIndexes[idx]);
          setFade(false);
        }, 300); // fade out duration
        idx = (idx + 1) % featureIndexes.length;
      }, 2000);
      return () => clearInterval(intervalRef.current);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  }, []);

  // Function to handle mouse enter on feature items
  const handleMouseEnter = (featureIndex) => {
    if (window.innerWidth >= 900) {
      setFade(true);
      setTimeout(() => {
        setCurrentImage(featureImages[featureIndex]);
        setActiveFeature(featureIndex);
        setFade(false);
      }, 300);
    }
  };

  // Function to handle mouse leave - reset to default image
  const handleMouseLeave = () => {
    if (window.innerWidth >= 900) {
      setFade(true);
      setTimeout(() => {
        setCurrentImage(orb);
        setActiveFeature(1);
        setFade(false);
      }, 300);
    }
  };

  return (
    <section className="features-section">
      <div className="header">
        <img src={group16} alt="What makes mello unique?" />
      </div>

      <div className="content-container">
        <div className="image-container">
          <img
            src={currentImage}
            alt="Feature Visual"
            className={`feature-img${fade ? ' fade' : ''}`}
          />
        </div>

        <div className="features-container">
          <ul className="features">
            <li 
              className="feature-item"
              onMouseEnter={() => handleMouseEnter(1)}
              onMouseLeave={handleMouseLeave}
            >
              <div>
                <span className="feature-number" style={{ color: activeFeature === 1 ? featureColors[1] : undefined }}>01</span>
                <span className="feature-title">Personalized Self-Care</span>
              </div>
              <span className="feature-icon">
                <img src={Care} alt="Self-Care icon" />
              </span>
            </li>

            <li 
              className="feature-item"
              onMouseEnter={() => handleMouseEnter(2)}
              onMouseLeave={handleMouseLeave}
            >
              <div>
                <span className="feature-number" style={{ color: activeFeature === 2 ? featureColors[2] : undefined }}>02</span>
                <span className="feature-title">Emotionally Intelligent AI Companion</span>
              </div>
              <span className="feature-icon">
                <img src={Sparkling} alt="AI companion icon" />
              </span>
            </li>

            <li 
              className="feature-item"
              onMouseEnter={() => handleMouseEnter(3)}
              onMouseLeave={handleMouseLeave}
            >
              <div>
                <span className="feature-number" style={{ color: activeFeature === 3 ? featureColors[3] : undefined }}>03</span>
                <span className="feature-title">Gentle, Human-Like Experience</span>
              </div>
              <span className="feature-icon">
                <img src={Friends} alt="Human-like experience icon" />
              </span>
            </li>

            <li 
              className="feature-item"
              onMouseEnter={() => handleMouseEnter(4)}
              onMouseLeave={handleMouseLeave}
            >
              <div>
                <span className="feature-number" style={{ color: activeFeature === 4 ? featureColors[4] : undefined }}>04</span>
                <span className="feature-title">Memory-Powered Conversations</span>
              </div>
              <span className="feature-icon">
                <img src={Smartphone} alt="Memory-powered icon" />
              </span>
            </li>

            <li 
              className="feature-item"
              onMouseEnter={() => handleMouseEnter(5)}
              onMouseLeave={handleMouseLeave}
            >
              <div>
                <span className="feature-number" style={{ color: activeFeature === 5 ? featureColors[5] : undefined }}>05</span>
                <span className="feature-title">Voice Chat Support</span>
              </div>
              <span className="feature-icon">
                <img src={Audio} alt="Voice chat icon" />
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;