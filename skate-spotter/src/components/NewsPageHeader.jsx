import React from "react";
import Logo from "./Logo";
import HomeButton from "./HomeButton";

function NewsPageHeader() {
  return (
    <header className="header">
      <Logo />
      <h1>Skateboarding News</h1>
      <HomeButton />
    </header>
  );
}

export default NewsPageHeader;
