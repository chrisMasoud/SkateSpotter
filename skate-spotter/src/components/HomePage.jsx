import React from "react";
import Header from "./Header";
import Card from "./Card";
import Map from "./Map";
import Navbar from "./Navbar";
import SearchSpots from "./SearchSpots";
import SortSpots from "./SortSpots";
import FilterByRating from "./FilterByRating";
import { useState, useEffect } from "react";
import key from "../key.json";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

export default function HomePage() {
  const [mapCenter, setMapCenter] = useState({ lat: 40.7529, lng: -73.4267 });
  const [spotData, setSpotData] = useState([]);
  const [spotLib, setSpotLib] = useState([]);
  const [sortType, setSortType] = useState("");
  const [preFilter, setPreFilter] = useState([]);
  const [ratingFilter, setRatingFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/spots")
      .then((res) => {
        setSpotData(res.data);
        setSpotLib(res.data);
        setPreFilter(res.data);
      })
      .catch((err) => {
        console.error("Error fetching spot data:", err);
      });
    if (
      localStorage.getItem("loggedin") !== null &&
      localStorage.getItem("uid") !== null
    ) {
      const uid = localStorage.getItem("uid");
      axios
        .get(`/api/getzip/${uid}`)
        .then((res) => {
          const userzip = res.data.zip;
          const api_key = key.apikey;
          const geocodingApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${userzip}&key=${api_key}`;
          fetch(geocodingApiUrl)
            .then((response) => response.json())
            .then((data) => {
              const { lat, lng } = data.results[0].geometry.location;
              setMapCenter({ lat, lng });
            })
            .catch((error) => {
              console.log("Error occurred while geocoding:", error);
            });
        })
        .catch((err) => {
          console.error("Error getting user ZIP code:", err);
        });
    }
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

  const handleSpotSearch = (keyword) => {
    let results = [];
    if (sortType === null || sortType === "") {
      results = spotLib.filter((spotItem) =>
        spotItem.SpotName.toLowerCase().includes(keyword.toLowerCase())
      );
    } else {
      results = spotData.filter((spotItem) =>
        spotItem.SpotName.toLowerCase().includes(keyword.toLowerCase())
      );
    }
    const lat = parseFloat(results[0].Latitude);
    const lng = parseFloat(results[0].Longitude);
    const ctr = { lat, lng };
    setMapCenter(ctr);
    setSpotData(results);
    setPreFilter(results);
    //console.log(sortType);
    setSortType(""); // for some reason this line doesn't update the sort type, but is necessary in order for sort-search to work ??
    setRatingFilter("");
    //console.log(sortType);
  };

  const handleSort = (e) => {
    const type = e.target.value;
    setSortType(type);
    let sorted = [...spotData];
    switch (type) {
      case "name_a":
        sorted.sort((a, b) =>
          a.SpotName.localeCompare(b.SpotName, undefined, {
            sensitivity: "base",
          })
        );
        break;
      case "name_d":
        sorted.sort((a, b) =>
          b.SpotName.localeCompare(a.SpotName, undefined, {
            sensitivity: "base",
          })
        );
        break;
      case "rating_a":
        sorted.sort((a, b) => a.Rating - b.Rating);
        break;
      case "rating_d":
        sorted.sort((a, b) => b.Rating - a.Rating);
        break;
      default:
        /*
        setSpotData(sorted);
        setPreFilter(sorted);
        setSortType("");
        */
        return;
    }
    setSpotData(sorted);
    setPreFilter(sorted);
  };

  const handleRatingFilter = (e) => {
    const rlevel = e.target.value;
    setRatingFilter(rlevel);
    let filtered = [...preFilter];
    switch (rlevel) {
      case "rating1":
        filtered = filtered.filter((spotItem) => spotItem.Rating === 1);
        break;
      case "rating2":
        filtered = filtered.filter((spotItem) => spotItem.Rating === 2);
        break;
      case "rating3":
        filtered = filtered.filter((spotItem) => spotItem.Rating === 3);
        break;
      case "rating4":
        filtered = filtered.filter((spotItem) => spotItem.Rating === 4);
        break;
      case "rating5":
        filtered = filtered.filter((spotItem) => spotItem.Rating === 5);
        break;
      default:
        setSpotData(filtered);
        setRatingFilter("");
        return;
    }
    setSpotData(filtered);
  };

  /*
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
*/

  const handleClick = (spotItem, weather) => {
    navigate(`/DetailPage/${spotItem.SpotID}`, {
      state: { data: spotItem, weather },
    });
  };

  return (
    <>
      <Header onSpotSearch={handleSpotSearch} />
      <Navbar />
      <Map center={mapCenter} spots={spotData} />
      <div>
        <SortSpots value={sortType} onSort={handleSort} />
        <FilterByRating value={ratingFilter} onFilter={handleRatingFilter} />
        <br />
      </div>
      <section className="spotCardSection">
        {spotData.map((spotItem) => (
          <Card key={spotItem.SpotID} data={spotItem} onClick={handleClick} />
        ))}
      </section>
      <Footer />
    </>
  );
}
