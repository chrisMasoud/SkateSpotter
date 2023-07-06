import React, { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import { useLocation, useNavigate } from "react-router-dom";
import AddFavoriteButton from "./AddFavoriteButton";
import UpdateSpotButton from "./UpdateSpotButton";
import ReportButton from "./ReportButton";
import DetailHeader from "./DetailHeader";
import axios from "axios";
import AddReviewButton from "./AddReviewButton";

export default function SpotDetailPage() {
  const [reviewData, setReviewData] = useState([]);
  const location = useLocation();
  const { data, weather } = location?.state || {};
  const uid = localStorage.getItem("uid");
  const nav = useNavigate();

  useEffect(() => {
    axios
      .get(
        `https://skate-spotter-backend-server.vercel.app/api/reviews/${data.SpotID}`
      )
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
      .post("https://skate-spotter-backend-server.vercel.app/api/bookmarks", {
        SpotID: data.SpotID,
        UserID: uid,
      })
      .then((response) => {
        console.log("Spot bookmarked successfully!");
        alert("Spot Bookmarked.");
      })
      .catch((error) => {
        console.error("Failed to bookmark spot:", error);
      });
  };

  const handleUpdateSpot = () => {
    nav("/UpdateSpot", { state: { data } });
  };

  const handleReportClick = () => {
    axios
      .post("https://skate-spotter-backend-server.vercel.app/api/reports", {
        SpotID: data.SpotID,
      })
      .then((response) => {
        console.log("Report Submitted");
        alert("Spot Reported.");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const capitalizeWords = (str) => {
    return str.replace(/\b\w/g, (match) => match.toUpperCase());
  };

  return (
    <>
      <DetailHeader data={data.SpotName} />
      <nav>
        <AddFavoriteButton onClick={handleFavorite} />
        <UpdateSpotButton onClick={handleUpdateSpot} />
        <ReportButton onClick={handleReportClick} />
      </nav>
      <div className="details">
        <img
          src={`/uploads/${data.Spotimage}`}
          alt="No Image Found"
          className="spotImage"
        />
        <div className="spotDetails">
          <p>
            Location: {data.Latitude}, {data.Longitude}
          </p>
          <p>Rating: {data.Rating}/5</p>
          {weather && weather.main && weather.weather ? (
            <>
              <p>
                Current Conditions:{" "}
                {capitalizeWords(weather.weather[0].description)}
              </p>
            </>
          ) : (
            <p>Weather data not available</p>
          )}
          <p>Difficulty: {data.difficulty}</p>
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
