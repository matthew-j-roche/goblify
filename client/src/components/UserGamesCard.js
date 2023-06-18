import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function UserGamesCard() {
  const [userGames, setUserGames] = useState([]);

  useEffect(() => {
    fetch("/user-games", {
      credentials: "include" // Include cookies in the request
    })
      .then((res) => res.json())
      .then((data) => setUserGames(data));
  }, []);

  return (
    <div>
      <h1>User Games</h1>
      {userGames.map((userGame) => (
        <div key={userGame.id}>
          <h2>{userGame.name}</h2>
        </div>
      ))}
    </div>
  );
}

export default UserGamesCard;
