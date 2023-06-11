import React from "react";
import Logo from "./Logo";
import HomeButton from "./HomeButton";

function TipsPageHeader() {
  return (
    <header className="header">
      <Logo />
      <h1>Tips & Tutorials</h1>
      <HomeButton />
    </header>
  );
}

export default TipsPageHeader;
