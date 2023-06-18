import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import UserGamesCard from './UserGamesCard';
import UserLocationsCard from './UserLocationsCard';
import './index.css';


function Home({ username }) {
  const { id } = useParams();

  return (
    <div className="homeDiv1">
      <div className="homeDiv2">
        <h1>Welcome Back, {username}</h1>
        <p>What do vampires take to get around on Halloween night?</p>
        <p>A blood vessel.</p>
      </div>
      <div className="homeDisplayCard">
        <div className="homeDisplayCard1">
          <UserGamesCard />
          <UserLocationsCard />
        </div>
      </div>
    </div>
  );
};

export default Home;
