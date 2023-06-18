import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import tricksterImage from '../assets/trickster.jpeg';
import './SplashScreen.css'; // Import CSS file for additional styles

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate a delay of 5 seconds
    const timer = setTimeout(() => {
      navigate('/login');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-container">
      <div className="pulse-animation">
        <img src={tricksterImage} alt="Trickster" className="pulse-image" />
      </div>
      <p>Loading...</p>
    </div>
  );
};

export default SplashScreen;