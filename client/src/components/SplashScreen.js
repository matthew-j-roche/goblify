import React from 'react';
import dungeonWallImage from '../assets/dungeonWall.png';
import './SplashScreen.css';

const SplashScreen = () => {
  return (
    <body className="background" style={{ backgroundImage: 'conic-gradient(#ff5c00, #fc222b, #ff265e, #ff5c00)', dungeonWallImage }}>
      <div className="splashDiv1">
        <img src={dungeonWallImage} alt="dungeonWall" className="dungeonWall" />
        <h1 className="splashText">G o b l i f y</h1>
        <div className="background" style={{ backgroundmage: {dungeonWallImage} }}>
        </div>
      </div>
    </body>
  );
};

export default SplashScreen;
