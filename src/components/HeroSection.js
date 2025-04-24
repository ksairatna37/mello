import React from 'react';
import './HeroSection.css';
import { ArrowDown, ArrowRight } from "lucide-react";
import aiImg from './ai.png';
import vector3 from './Vector 3.png';
import group11 from './Group 11.png';
import instagramImg from './Instagram.png';
import xImg from './X.png';
import { useNavigate } from 'react-router-dom';
import './responsive.css';


const HeroSection = () => {
  const navigate = useNavigate();
  const handleScrollButtonClick = () => {
    navigate('/coming-soon');
  };
  return (
    <section className="hero-section-pixel">
      <div className="hero-outer-box hero-outer-box-left" style={{ width: '60%' }}>
        <div className="hero-header-row">
          <div className="mello-logo-text">mello</div>
          <div className="connect-btn-pixel">LETS CONNECT <span className="icon-pixel"><a href="#" target="_blank" rel="noopener noreferrer"><img src={instagramImg} alt="Instagram" style={{ width: 40, height: 40, marginRight: 15 }} /></a><a href="https://x.com/MellowHealth" target="_blank" rel="noopener noreferrer"><img src={xImg} alt="X" style={{ width: 40, height: 40 }} /></a></span></div>
        </div>
        <div className="hero-main-pixel">
          <img src={group11} alt="hero graphic" className="group11-hero-img" />
        </div>
        <div className="hero-footer-row">
          <div className="ai-info-block">
            <span className="ai-imp">We implement AI<br /><span className="ai-tech">technology in our app</span></span>
            <div className="ai-icon-row">
              <img src={aiImg} alt="AI" className="ai-icon-img" />
              <span className="ai-desc">a range of innovative tools<br />to enhance your mental wellness journey</span>
            </div>
          </div>
          <span className="download-circle"><ArrowDown className="w-5 h-5" /></span>
        </div>
      </div>
      <button className="hero-scroll-btn-pixel download-circle" onClick={handleScrollButtonClick}>↗</button>
      <div className="hero-bg-pixel" />
    </section>
  );
}


export default HeroSection;
