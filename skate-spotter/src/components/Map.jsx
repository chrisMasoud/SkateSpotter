import React from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import key from "../key.json";
import { useNavigate } from "react-router-dom";

const containerStyle = {
  width: "1500px",
  height: "600px",
  borderRadius: "5%",
  overflow: "hidden",
};

const defualtCenter = {
  lat: 40.71417,
  lng: -73.55952,
};

function Map({ center, spots }) {
  const [map, setMap] = React.useState(null);
  const [selectedSpot, setSelectedSpot] = React.useState(null);
  const navigate = useNavigate();
  const api_key = key.apikey;
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: api_key,
  });

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const handleMarkerClick = (spot) => {
    setSelectedSpot(spot);
  };

  const handleCloseInfoWindow = () => {
    setSelectedSpot(null);
  };

  return isLoaded ? (
    <div className="mapContainer">
      <GoogleMap
        mapContainerStyle={containerStyle}
        defualtCenter={defualtCenter}
        center={center}
        zoom={14}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {spots.map((spot) => (
          <Marker
            key={spot.SpotID}
            position={{
              lat: parseFloat(spot.Latitude),
              lng: parseFloat(spot.Longitude),
            }}
            title={spot.SpotName}
            onClick={() => handleMarkerClick(spot)}
          />
        ))}
        {selectedSpot && (
          <InfoWindow
            position={{
              lat: parseFloat(selectedSpot.Latitude),
              lng: parseFloat(selectedSpot.Longitude),
            }}
            onCloseClick={handleCloseInfoWindow}
          >
            <div>
              <h3>{selectedSpot.SpotName}</h3>
              <button
                onClick={() =>
                  navigate(`/page`, { state: { data: selectedSpot } })
                }
              >
                View Details
              </button>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}

export default React.memo(Map);
