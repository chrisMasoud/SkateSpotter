import React from "react";

function UpdateSpotButton({ onClick }) {
  return (
    <button className="navButton" onClick={onClick}>
      <span>Update Spot Info</span>
    </button>
  );
}

export default UpdateSpotButton;
