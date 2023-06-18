import React from "react";

function AddFavoriteButton() {
  function handleClick(event) {
    console.log("Fav clicked");
  }

  return (
    <button className="navButton" onClick={handleClick}>
      <span>Add to Favorites</span>
    </button>
  );
}

export default AddFavoriteButton;
