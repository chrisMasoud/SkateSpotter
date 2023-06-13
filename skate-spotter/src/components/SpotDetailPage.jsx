import React from "react";
import SpotImage from "./SpotImage";
import SpotInfo from "./SpotInfo";
import ReviewCard from "./ReviewCard";

export default function SpotDetailPage() {
  return (
    <div className="details">
      <SpotImage />
      <SpotInfo />
      <ReviewCard />
      <ReviewCard />
    </div>
  );
}
