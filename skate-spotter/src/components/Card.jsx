import React from "react";

function Card() {
  return (
    <div className="card">
      <div className="textBox">
        <p className="h1">Card Name</p>
        <p className="p">Subline 1</p>
        <p className="p">Subline 2</p>
        <p className="p">Subline 3</p>
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
