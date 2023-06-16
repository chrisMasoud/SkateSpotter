import React from "react";

function Card({ data, onClick }) {
  const handleClick = () => {
    onClick(data);
  };

  return (
    <div className="card" onClick={handleClick}>
      <div className="textBox">
        <p className="h1">{data.SpotName}</p>
        <p className="p1">
          Location: {data.Latitude}, {data.Longitude}
        </p>
        <p className="p1">Rating: {data.Rating}/5</p>
        <p className="p1">Current Conditions: Sunny</p>
      </div>
      <img className="img" src={data.Spotimage} />
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
