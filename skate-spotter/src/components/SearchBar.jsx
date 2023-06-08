import React from "react";

function SearchBar() {
  return (
    <form>
      <input placeholder="Enter Zip Code or Search by Name" type="text" />
      <button>Submit</button>
    </form>
  );
}

export default SearchBar;
