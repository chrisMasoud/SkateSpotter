import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import key from "../key.json";

const containerStyle = {
  width: "1500px",
  height: "600px",
  borderRadius: "5%",
  overflow: "hidden",
};

const defualtCenter = {
  lat: 40.7529,
  lng: -73.4267,
};

function Map({ center, spots }) {
  const [map, setMap] = React.useState(null);
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

  return isLoaded ? (
    <div className="mapContainer">
      <GoogleMap
        mapContainerStyle={containerStyle}
        defualtCenter={defualtCenter}
        center={center}
        zoom={16}
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
          />
        ))}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}

export default React.memo(Map);
