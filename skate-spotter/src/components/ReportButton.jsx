import React from "react";

function ReportButton() {
  function handleClick(event) {
    console.log("Report clicked");
  }

  return (
    <button className="navButton" onClick={handleClick}>
      <span>Report Spot</span>
    </button>
  );
}

export default ReportButton;
