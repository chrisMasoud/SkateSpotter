import React from "react";

function LinkCard({ data }) {
  const handleClick = () => {
    window.open(data.url, "_blank");
  };

  return (
    <div className="card" onClick={handleClick}>
      <div className="textBox">
        <p className="h1">{data.title}</p>
        <p className="p">{data.creator}</p>
        <p className="p">{data.description}...</p>
      </div>
      <img src={data.thumbnail} className="img" />
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

export default LinkCard;
