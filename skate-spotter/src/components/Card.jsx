import React, { useState, useEffect } from "react";
import axios from "axios";

function Card({ data, onClick }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${data.Latitude}&lon=${data.Longitude}&appid=f8fd99d1a4e3574e6ea14bec0b990b12`
        );
        setWeather(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, [data]);

  const handleClick = () => {
    onClick(data, weather);
  };

  const capitalizeWords = (str) => {
    return str.replace(/\b\w/g, (match) => match.toUpperCase());
  };

  return (
    <div className="card" onClick={handleClick}>
      <div className="textBox">
        <p className="h1">{data.SpotName}</p>
        <p className="p1">
          Location: {data.Latitude}, {data.Longitude}
        </p>
        <p className="p1">Rating: {data.Rating}/5</p>
        {weather && weather.main && weather.weather ? (
          <>
            <p className="p1">
              Current Conditions:{" "}
              {capitalizeWords(weather.weather[0].description)}
            </p>
          </>
        ) : (
          <p className="p1">Current Conditions: Weather data not available</p>
        )}
      </div>
      <img className="img" src={`/${data.Spotimage}`} />
      <div className="chevron">
        <svg
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>
    </div>
  );
}

export default Card;
