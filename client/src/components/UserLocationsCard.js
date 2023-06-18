import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function UserLocationsCard() {
  const [userLocations, setUserLocations] = useState([]);

  useEffect(() => {
    fetch("/user-locations", {
      credentials: "include" // Include cookies in the request
    })
      .then((res) => res.json())
      .then((data) => setUserLocations(data));
  }, []);

  return (
    <div>
      <h1>User Locations</h1>
      {userLocations.map((userLocation) => (
        <div key={userLocation.id}>
          <h2>{userLocation.name}</h2>
        </div>
      ))}
    </div>
  );
}

export default UserLocationsCard;
