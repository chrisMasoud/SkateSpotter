import React from "react";
import Header from "./Header";
import Card from "./Card";
import Map from "./Map";
import Navbar from "./Navbar";
import SearchSpots from "./SearchSpots";
import { useState, useEffect } from "react";
import key from "../key.json";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [mapCenter, setMapCenter] = useState({ lat: 40.72417, lng: -73.55952 });
  const [spotData, setSpotData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/spots")
      .then((response) => {
        setSpotData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching spot data:", error);
      });
  }, []);

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

  const handleSpotSearch = (input) => {
    axios
      .get("/api/searchspots", { params: { keyword: input } })
      .then((response) => {
        setSpotData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching spot data:", error);
      });
  };

  const handleClick = (spotItem, weather) => {
    navigate(`/DetailPage/${spotItem.SpotID}`, {
      state: { data: spotItem, weather },
    });
  };

  return (
    <>
      <Header onZipCodeSearch={handleZipCodeSearch} />
      <Navbar />
      <Map center={mapCenter} spots={spotData} />
      <div>
        <SearchSpots onSpotSearch={handleSpotSearch} />
        <br />
      </div>
      <section className="spotCardSection">
        {spotData.map((spotItem) => (
          <Card key={spotItem.SpotID} data={spotItem} onClick={handleClick} />
        ))}
      </section>
    </>
  );
}
