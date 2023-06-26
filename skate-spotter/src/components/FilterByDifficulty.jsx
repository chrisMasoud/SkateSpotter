import React from "react";

export default function FilterByDifficulty({ onFilter }) {
  return (
    <div className="dropdown">
      <label htmlFor="filterbydifficulty" className="dropdownLabel">
        Filter by Difficulty:{" "}
      </label>
      <select
        name="filterbydifficulty"
        id="filterbydifficulty"
        onChange={onFilter}
      >
        <option value="">Select an option</option>
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Expert">Expert</option>
      </select>
    </div>
  );
}
