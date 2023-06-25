import React from "react";

function ReviewCard({ data }) {
  return (
    <div className="reviewCard">
      <div className="textBox">
        <p className="h1">{data.reviewTitle}</p>
        <p>{data.reviewText}</p>
        <p>Rating: {data.rating}/5</p>
      </div>
    </div>
  );
}

export default ReviewCard;
