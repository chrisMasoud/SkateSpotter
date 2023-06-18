import React from "react";
import Logo from "./Logo";
import HomeButton from "./HomeButton";

function DetailHeader() {
  return (
    <header className="header">
      <Logo />
      <h1>Spot Details</h1>
      <HomeButton />
    </header>
  );
}

export default DetailHeader;
