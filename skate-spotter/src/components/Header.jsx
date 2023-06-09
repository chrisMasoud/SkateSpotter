import React from "react";
import SearchBar from "./SearchBar";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import Logo from "./Logo";

function Header() {
  return (
    <header>
      <Logo />
      <SearchBar />
      <LoginButton />
      <LogoutButton />
    </header>
  );
}

export default Header;
