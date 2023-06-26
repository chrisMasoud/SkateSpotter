import React from "react";
import { useNavigate } from "react-router-dom";

function AboutUsButton() {
  const navigate = useNavigate();

  function handleClick(event) {
    navigate("/AboutUs");
  }

  return (
    <button className="buttonAboutUs" onClick={handleClick}>
      <span>About Us</span>
    </button>
  );
}

export default AboutUsButton;
