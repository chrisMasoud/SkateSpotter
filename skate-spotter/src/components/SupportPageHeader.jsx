import React from "react";
import Logo from "./Logo";
import HomeButton from "./HomeButton";

function SupportPageHeader() {
  return (
    <header className="header">
      <Logo />
      <h1>File a Support Claim</h1>
      <HomeButton />
    </header>
  );
}

export default SupportPageHeader;
