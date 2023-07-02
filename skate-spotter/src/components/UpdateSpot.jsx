import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import DetailHeader from "./DetailHeader";

export default function UpdateSpot() {
  const location = useLocation();
  const navigate = useNavigate();
  const { data } = location.state;
  const [spotID, setSpotID] = useState(data?.SpotID);
  const [spotName, setSpotName] = useState(data?.SpotName);
  const [latitude, setLatitude] = useState(data?.Latitude);
  const [longitude, setLongitude] = useState(data?.Longitude);
  const [description, setDescription] = useState(data?.Descriptions);
  const spotImage = data?.spotImage;
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
        console.error("Error updating spot: ", error);
        alert("Error updating spot: ", error);
      });
  };

  const handleCancel = (e) => {
    navigate(-1);
  };

  const handleDeleteSpot = (e) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this spot? It'll be lost forever..."
    );
    if (confirmed) {
      axios
        .post("/api/delete-spot", {
          spotID: spotID,
        })
        .then((response) => {
          console.log("Spot deleted successfully");
          alert("Spot deleted successfully! Click OK to return home.");
          navigate("/");
        })
        .catch((error) => {
          console.error("Error deleting spot: ", error);
          alert("Error deleting spot: ", error);
        });
    }
  };

  return (
    <>
      <DetailHeader data={data.SpotName} />
      <div className="forms">
        <img
          src={`/uploads/${data.Spotimage}`}
          alt="No Image Found"
          className="uSpotImage"
        />

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
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
            <button type="button" onClick={handleDeleteSpot}>
              Delete Spot
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
