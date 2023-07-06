import React from "react";

function AddFavoriteButton({ onClick }) {
  return (
    <button className="navButton" onClick={onClick}>
      <span>Add to Favorites</span>
    </button>
  );
}

export default AddFavoriteButton;
