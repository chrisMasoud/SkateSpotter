import React, { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import { useLocation } from "react-router-dom";
import AddFavoriteButton from "./AddFavoriteButton";
import ReportButton from "./ReportButton";
import DetailHeader from "./DetailHeader";
import axios from "axios";
import AddReviewButton from "./AddReviewButton";

export default function SpotDetailPage() {
  const [reviewData, setReviewData] = useState([]);
  const location = useLocation();
  const { data, weather } = location?.state || {};
  const uid = localStorage.getItem("uid");

  useEffect(() => {
    axios
      .get(`/api/reviews/${data.SpotID}`)
      .then((response) => {
        setReviewData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching news data:", error);
      });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFavorite = () => {
    axios
      .post("/api/bookmarks", { SpotID: data.SpotID, UserID: uid })
      .then((response) => {
        console.log("Spot bookmarked successfully!");
        alert("Spot Bookmarked.");
      })
      .catch((error) => {
        console.error("Failed to bookmark spot:", error);
      });
  };

  const handleReportClick = () => {
    axios
      .post("/api/reports", { SpotID: data.SpotID })
      .then((response) => {
        console.log("Report Sumbitted");
        alert("Spot Reported.");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <DetailHeader data={data.SpotName} />
      <nav>
        <AddFavoriteButton onClick={handleFavorite} />
        <ReportButton onClick={handleReportClick} />
      </nav>
      <div className="details">
        <img
          src={`/uploads/${data.Spotimage}`}
          alt="No Image Found"
          className="spotImage"
        />
        <div>
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
        <section className="spotCardSection">
          {reviewData.map((reviewItem) => (
            <ReviewCard key={reviewItem.reviewID} data={reviewItem} />
          ))}
          <AddReviewButton data={data.SpotID} />
        </section>
      </div>
    </>
  );
}
