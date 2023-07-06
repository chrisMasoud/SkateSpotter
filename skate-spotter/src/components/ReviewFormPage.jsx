import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DetailHeader from "./DetailHeader";

export default function ReviewFormPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const { spotId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("rating", rating);
    formData.append("spotId", spotId);

    try {
      await axios.post(
        "https://skate-spotter-backend-server.vercel.app/add-review",
        formData
      );
      console.log("Review added successfully");
      setTitle("");
      setDescription("");
      setRating("");
      alert("Review Added Successfully");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <DetailHeader data="Submit a Review" />
      <div className="forms">
        <div className="signup-box">
          <form className="signup-form" onSubmit={handleSubmit}>
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
      </div>
    </>
  );
}
