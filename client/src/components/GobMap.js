import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import "./index.css";

function GobMap() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCKGd3TT_ZypOylKd0kncVofJepx_yMEYg",
  });
  const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);

  return (
    <div className="gobMapDiv">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          center={center}
          zoom={10}
        >
        <Marker position={{ lat: 18.52043, lng: 73.856743 }} />
        </GoogleMap>
      )}
    </div>
  );
};

export default GobMap;