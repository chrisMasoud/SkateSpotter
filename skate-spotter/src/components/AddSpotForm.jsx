import React, { useState } from "react";
import axios from "axios";

export default function AddSpotForm() {
  const [spotName, setSpotName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [spotRating, setSpotRating] = useState("");
  const [spotDescription, setSpotDescription] = useState("");
  const [spotImage, setSpotImage] = useState(null);
  const [difficulty, setDifficulty] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("spotName", spotName);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("spotRating", spotRating);
    formData.append("spotDescription", spotDescription);
    formData.append("spotImage", spotImage);
    formData.append("difficulty", difficulty);

    try {
      await axios.post("/add-spot", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Spot added successfully");
      setSpotName("");
      setLatitude("");
      setLongitude("");
      setSpotRating("");
      setSpotDescription("");
      setSpotImage(null);
      setDifficulty("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="signup-box">
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="signup-container">
          <input
            className="signup-input"
            type="text"
            placeholder="Enter Spot Name"
            value={spotName}
            onChange={(e) => setSpotName(e.target.value)}
            required
          />
          <input
            className="signup-input"
            type="text"
            placeholder="Enter Latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            required
          />
          <input
            className="signup-input"
            type="text"
            placeholder="Enter Longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            required
          />
          <select
            className="signup-input"
            value={spotRating}
            onChange={(e) => setSpotRating(e.target.value)}
            required
          >
            <option value="" disabled>
              Enter Spot Rating
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <select
            className="signup-input"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            required
          >
            <option value="" disabled>
              Enter Spot Difficulty
            </option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Expert">Expert</option>
          </select>
          <textarea
            className="signup-textarea"
            placeholder="Enter Spot Description"
            value={spotDescription}
            onChange={(e) => setSpotDescription(e.target.value)}
            required
          />
          <label htmlFor="spotImage">Upload Spot Image: </label>
          <input
            className="signup-input"
            type="file"
            id="spotImage"
            name="spotImage"
            accept="image/*"
            onChange={(e) => setSpotImage(e.target.files[0])}
            required
          />
        </div>
        <button type="submit" className="signup-button">
          Submit
        </button>
      </form>
    </div>
  );
}
