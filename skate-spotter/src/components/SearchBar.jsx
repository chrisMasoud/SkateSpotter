import React from "react";

function SearchBar() {
  return (
    <form>
      <input placeholder="Enter Zip Code or Search by Name" type="text" />
      <button>
        <span>Submit</span>
      </button>
    </form>
  );
}

export default SearchBar;
