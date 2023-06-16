import React from "react";
import ReviewCard from "./ReviewCard";
import { useLocation } from "react-router-dom";

export default function SpotDetailPage() {
  const { state } = useLocation();
  const data = state?.data || {};

  return (
    <div className="details">
      <img src={data.Spotimage} alt="No Image Found" className="spotImage" />
      <div>
        <h1>{data.SpotName}</h1>
        <p>
          Location: {data.Latitude}, {data.Longitude}
        </p>
        <p>Rating: 3/5</p>
        <p>Current Conditions: Sunny</p>
        <p>{data.Descriptions}</p>
      </div>
      {/* <ReviewCard />
      <ReviewCard /> */}
    </div>
  );
}
