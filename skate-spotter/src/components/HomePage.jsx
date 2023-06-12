import React from "react";
import Header from "./Header";
import CardList from "./CardList";
import Map from "./Map";
import Navbar from "./Navbar";
import { useState } from "react";
import key from "../key.json";

export default function HomePage() {
  const [mapCenter, setMapCenter] = useState({ lat: 40.7529, lng: -73.4267 });

  const handleZipCodeSearch = (zipCode) => {
    const api_key = key.apikey;
    const geocodingApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=${api_key}`;
    fetch(geocodingApiUrl)
      .then((response) => response.json())
      .then((data) => {
        const { lat, lng } = data.results[0].geometry.location;

        setMapCenter({ lat, lng });
      })
      .catch((error) => {
        console.log("Error occurred while geocoding:", error);
      });
  };

  return (
    <>
      <Header onZipCodeSearch={handleZipCodeSearch} />
      <Navbar />
      <Map center={mapCenter} />
      <CardList />
    </>
  );
}
