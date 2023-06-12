import React from "react";
import SpotImage from "./SpotImage";
import SpotInfo from "./SpotInfo";
import ReviewCard from "./ReviewCard";

export default function SpotDetailPage() {
  return (
    <>
      <SpotImage />
      <SpotInfo />
      <ReviewCard />
      <ReviewCard />
    </>
  );
}
