import React from "react";
import Logo from "./Logo";
import HomeButton from "./HomeButton";

function AddPageHeader() {
  return (
    <header className="header">
      <Logo />
      <h1>Add New Spot</h1>
      <HomeButton />
    </header>
  );
}

export default AddPageHeader;
