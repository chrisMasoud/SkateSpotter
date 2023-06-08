import React from "react";
import SearchBar from "./SearchBar";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

function Header() {
  return (
    <header>
      <SearchBar />
      <LoginButton />
      <LogoutButton />
    </header>
  );
}

export default Header;
