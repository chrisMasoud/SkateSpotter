import React from "react";
import SpotImage from "./SpotImage";
import SpotInfo from "./SpotInfo";
import ReviewCard from "./ReviewCard";
import { useLocation } from "react-router-dom";

export default function SpotDetailPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const title = queryParams.get("title");

  return (
    <div className="details">
      <SpotImage />
      <SpotInfo />
      <ReviewCard />
      <ReviewCard />
    </div>
  );
}
