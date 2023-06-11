import React from "react";
import SearchBar from "./SearchBar";
import LoginButton from "./LoginButton";
import Logo from "./Logo";

function Header() {
  return (
    <header className="header">
      <Logo />
      <SearchBar />
      <LoginButton />
    </header>
  );
}

export default Header;
