import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
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

function Map({ center }) {
  const [map, setMap] = React.useState(null);
  const api_key = key.apikey;
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: api_key,
  });

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.setZoom(16);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <artcile className="mapContainer">
      <GoogleMap
        mapContainerStyle={containerStyle}
        defualtCenter={defualtCenter}
        center={center}
        zoom={16}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Child components, such as markers, info windows, etc. */}
        {/* <></> */}
      </GoogleMap>
    </artcile>
  ) : (
    <></>
  );
}

export default React.memo(Map);
