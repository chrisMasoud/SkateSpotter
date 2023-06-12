import React from "react";

function ReviewCard() {
  return (
    <div className="card">
      <div className="textBox">
        <p className="h1">Review Title</p>
        <p>Review Text...</p>
        <p>Rating: </p>
        <p>- UserName</p>
      </div>
    </div>
  );
}

export default ReviewCard;
