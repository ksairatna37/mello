import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import IntroSection from './components/IntroSection';
import FeaturesSection from './components/FeaturesSection';
import ComingSoon from './components/ComingSoon';
import './App.css';
import Error from './components/Error';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="App">
            <HeroSection />
            <IntroSection />
            <FeaturesSection />
          </div>
        } />
        <Route path="/coming-soon" element={<ComingSoon />} />
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;