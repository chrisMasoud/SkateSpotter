import React from "react";
import { useState } from "react";

function ReviewBox() {
  const [review, setReview] = useState("Leave a review!");
  const handleChange = (event) => {
    setReview(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit}>
      <textarea value={review} onChange={handleChange} />
      <br></br>
      <input type="submit" />
    </form>
  );
}

export default ReviewBox;
