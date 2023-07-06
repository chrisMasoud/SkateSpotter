import React from "react";

function ReportButton({ onClick }) {
  return (
    <button className="navButton" onClick={onClick}>
      <span>Report Spot</span>
    </button>
  );
}

export default ReportButton;
