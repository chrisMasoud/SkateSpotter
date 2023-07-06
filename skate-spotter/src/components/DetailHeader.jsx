import React from "react";
import Logo from "./Logo";
import HomeButton from "./HomeButton";

function DetailHeader({ data }) {
  return (
    <header className="header">
      <Logo />
      <h1>{data}</h1>
      <HomeButton />
    </header>
  );
}

export default DetailHeader;
