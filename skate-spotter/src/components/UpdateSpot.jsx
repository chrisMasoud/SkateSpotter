import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import DetailHeader from "./DetailHeader";
import Footer from "./Footer";

export default function UpdateSpot() {
  const location = useLocation();
  const navigate = useNavigate();
  const { data } = location.state;
  const [spotID, setSpotID] = useState(data?.SpotID);
  const [spotName, setSpotName] = useState(data?.SpotName);
  const [latitude, setLatitude] = useState(data?.Latitude);
  const [longitude, setLongitude] = useState(data?.Longitude);
  const [description, setDescription] = useState(data?.Descriptions);
  const uid = localStorage.getItem("uid");

  useEffect(() => {
    if (data) {
      setSpotID(data.SpotID || "");
      setSpotName(data.SpotName || "");
      setLatitude(data.Latitude || "");
      setLongitude(data.Longitude || "");
      setDescription(data.Descriptions || "");
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/update-spot", {
        spotID: spotID,
        spotName: spotName,
        latitude: latitude,
        longitude: longitude,
        description: description,
      })
      .then((response) => {
        console.log("Spot updated successfully");
        alert("Spot updated successfully! Click OK to return home.");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error updating spot:", error);
        alert("Error updating spot:", error);
      });
  };

  return (
    <>
      <DetailHeader data={data.SpotName} />
      <div className="forms">
        <div className="signup-box">
          <form className="signup-form" onSubmit={handleSubmit}>
            <span className="signup-sub">
              Use the form below to update the spot information
            </span>
            <div className="signup-container">
              <input
                className="signup-input"
                type="text"
                placeholder="Enter Spot name"
                value={spotName}
                onChange={(e) => setSpotName(e.target.value)}
              />
              <input
                className="signup-input"
                type="text"
                placeholder="Enter Spot latitude"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
              />
              <input
                className="signup-input"
                type="text"
                placeholder="Enter Spot longitude"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
              />
              <textarea
                className="signup-textarea"
                placeholder="Enter a description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <button type="submit">Update Spot Info</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
