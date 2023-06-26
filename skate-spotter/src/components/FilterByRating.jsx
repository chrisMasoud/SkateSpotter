import React from "react";

export default function FilterByRating({ onFilter }) {
  return (
    <div className="dropdown">
      <label htmlFor="filterbyrating" className="dropdownLabel">
        Filter by Rating:{" "}
      </label>
      <select name="filterbyrating" id="filterbyrating" onChange={onFilter}>
        <option value="">Select an option</option>
        <option value="rating1">1</option>
        <option value="rating2">2</option>
        <option value="rating3">3</option>
        <option value="rating4">4</option>
        <option value="rating5">5</option>
      </select>
    </div>
  );
}
