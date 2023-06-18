import React, { useState } from "react";
import axios from "axios";

export default function AddSpotForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const formData = new FormData();
  //   formData.append("spotName", spotName);
  //   formData.append("latitude", latitude);
  //   formData.append("longitude", longitude);
  //   formData.append("spotRating", spotRating);
  //   formData.append("spotDescription", spotDescription);
  //   formData.append("spotImage", spotImage);

  //   try {
  //     await axios.post("/add-spot", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  //     console.log("Spot added successfully");
  //     setSpotName("");
  //     setLatitude("");
  //     setLongitude("");
  //     setSpotRating("");
  //     setSpotDescription("");
  //     setSpotImage(null);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div className="signup-box">
      <form className="signup-form">
        <span className="signup-hdr">Submit a Review</span>
        <span className="signup-sub">
          Share your thoughts and a rating on this spot.
        </span>
        <div className="signup-container">
          <input
            className="signup-input"
            type="text"
            placeholder="Review Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="signup-input"
            type="number"
            placeholder="Spot Rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
          <textarea
            className="signup-textarea"
            placeholder="Review Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit" className="signup-button">
          Submit
        </button>
      </form>
    </div>
  );
}
