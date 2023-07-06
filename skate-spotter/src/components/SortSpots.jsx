import React from "react";

export default function SortSpots({ onSort }) {
  return (
    <div className="dropdown">
      <label htmlFor="sort" className="dropdownLabel">
        Sort by:{" "}
      </label>
      <select name="sort" id="sort" onChange={onSort}>
        <option value="">Select an option</option>
        <option value="name_a">Name (A-Z)</option>
        <option value="name_d">Name (Z-A)</option>
        <option value="rating_a">Rating (Low to High)</option>
        <option value="rating_d">Rating (High to Low)</option>
      </select>
    </div>
  );
}
