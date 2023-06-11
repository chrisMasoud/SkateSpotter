import React from "react";

function TrackButton() {
  return (
    <button className="trackbutton">
      <div className="svg-wrapper-1">
        <div class="svg-wrapper">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
          </svg>
        </div>
      </div>
      <span>Track</span>
    </button>
  );
}

export default TrackButton;
