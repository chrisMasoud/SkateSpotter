import React from "react";
import SearchBar from "./components/SearchBar";
import LoginButton from "./components/LoginButton";

function App() {
  return (
    <div>
      <header>
        <SearchBar />
        <LoginButton />
      </header>
    </div>
  );
}

export default App;
