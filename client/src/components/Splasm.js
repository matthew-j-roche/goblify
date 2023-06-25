import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import dungeonWallImage from '../assets/dungeonWall.png';
import './Splasm.css';

const Splasm = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/tomb')
    }, 4000);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <body className="background" style={{ backgroundImage: 'conic-gradient(#ff5c00, #fc222b, #ff265e, #ff5c00)', dungeonWallImage }}>
      <div className="splasmDiv1">
        <img src={dungeonWallImage} alt="dungeonWall" className="dungeonWall" />
        <h1 className="splasmText">G o b l i f y</h1>
        <div className="background" style={{ backgroundmage: {dungeonWallImage} }}>
        </div>
      </div>
    </body>
  );
};

export default Splasm;
