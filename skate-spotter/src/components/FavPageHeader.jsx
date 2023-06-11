import React from "react";
import Logo from "./Logo";
import HomeButton from "./HomeButton";

function FavPageHeader() {
  return (
    <header className="header">
      <Logo />
      <h1>Favorite Spots</h1>
      <HomeButton />
    </header>
  );
}

export default FavPageHeader;
