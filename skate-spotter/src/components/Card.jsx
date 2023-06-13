import React from "react";
import { useNavigate } from "react-router-dom";

function Card({ title }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/page?title=${encodeURIComponent(title)}`);
  };

  return (
    <div className="card" onClick={handleClick}>
      <div className="textBox">
        <p className="h1">{title}</p>
        <p className="p">Location: Lat & Long</p>
        <p className="p">Rating: 3/5</p>
        <p className="p">Current Conditions: Sunny</p>
      </div>
      <div className="img" />
      <div className="chevron">
        <svg
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>
    </div>
  );
}

export default Card;
