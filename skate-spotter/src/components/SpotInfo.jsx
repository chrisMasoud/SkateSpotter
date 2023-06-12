import React from "react";
import { useLocation } from "react-router-dom";

export default function SpotInfo() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const title = queryParams.get("title");

  return (
    <div>
      <h1>{title}</h1>
      <p>Location: Lat & Long</p>
      <p>Rating: 3/5</p>
      <p>Current Conditions: Sunny</p>
      <p>
        Spot Description: Lorem ipsum dolor sit amet, consectetur adipiscing
        elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
        ut aliquip ex ea commodo consequat.
      </p>
    </div>
  );
}
