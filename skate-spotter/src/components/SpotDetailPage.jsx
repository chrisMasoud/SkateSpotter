import React from "react";
import ReviewCard from "./ReviewCard";
import { useLocation } from "react-router-dom";
import AddFavoriteButton from "./AddFavoriteButton";
import ReportButton from "./ReportButton";
import ReviewForm from "./ReviewForm";
import DetailHeader from "./DetailHeader";

export default function SpotDetailPage() {
  const location = useLocation();
  const { data, weather } = location?.state || {};

  return (
    <>
      <DetailHeader />
      <nav style={{ width: "1890px" }}>
        <AddFavoriteButton />
        <ReportButton />
      </nav>
      <div className="details">
        <img
          src={`/uploads/${data.Spotimage}`}
          alt="No Image Found"
          className="spotImage"
        />
        <div>
          <h1>{data.SpotName}</h1>
          <p>
            Location: {data.Latitude}, {data.Longitude}
          </p>
          <p>Rating: {data.Rating}/5</p>
          {weather && weather.main && weather.weather ? (
            <>
              <p className="p1">
                Current Conditions: {weather.weather[0].description}
              </p>
            </>
          ) : (
            <p className="p1">Weather data not available</p>
          )}
          <p>{data.Descriptions}</p>
        </div>
        <ReviewCard />
        <ReviewCard />
        <ReviewForm />
      </div>
    </>
  );
}
