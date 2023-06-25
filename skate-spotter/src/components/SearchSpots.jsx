import React from "react";
import { useState } from "react";

function SearchSpots({ onSpotSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  function handleSearch() {
    onSpotSearch(searchTerm);
    setSearchTerm("");
  }

  return (
    <div className="searchbar">
    <div className="searchbar-wrapper">
      <div className="searchbar-left">
        <div className="search-icon-wrapper">
          <span className="search-icon searchbar-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
            </svg>
          </span>
        </div>
      </div>

      <div className="searchbar-center">
        <div className="searchbar-input-spacer"></div>

        <input
          type="text"
          className="searchbar-input"
          maxLength="2048"
          name="q"
          autoCapitalize="off"
          autoComplete="off"
          title="Search"
          role="combobox"
          placeholder="Search by keyword"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="searchbar-right">
        <svg
          role="button"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          onClick={handleSearch}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
          ></path>
        </svg>
      </div>
    </div>
  </div>
  );
}

export default SearchSpots;
