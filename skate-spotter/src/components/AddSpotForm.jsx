import React from "react";

export default function AddSpotForm() {
  return (
    <div className="signup-box">
      <form className="signup-form">
        <div className="signup-container">
          <input
            className="signup-input"
            type="text"
            placeholder="Enter Spot Name"
          />
          <input
            className="signup-input"
            type="number"
            placeholder="Enter Latitude"
          />
          <input
            className="signup-input"
            type="number"
            placeholder="Enter Longitude"
          />
          <input
            className="signup-input"
            type="number"
            placeholder="Enter Spot Rating"
          />
          <textarea
            className="signup-textarea"
            placeholder="Enter Spot Description"
          />
          <label htmlFor="spotImage">Upload Spot Image: </label>
          <input
            className="signup-input"
            type="file"
            id="spotImage"
            name="spotImage"
            accept="image/*"
          />
        </div>
        <button type="submit" className="signup-button">
          Submit
        </button>
      </form>
    </div>
  );
}
