import React from "react";
import SearchBar from "./components/SearchBar";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";

function App() {
  return (
    <div>
      <header>
        <SearchBar />
        <LoginButton />
        <LogoutButton />
      </header>
    </div>
  );
}

export default App;
