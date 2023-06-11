import React from "react";
import { useNavigate } from "react-router-dom";

export default function AddSpotButton() {
  const navigate = useNavigate();

  function handleClick(event) {
    navigate("/AddSpotPage");
  }

  return (
    <button className="navButton">
      <span>Add New Spot</span>
    </button>
  );
}
