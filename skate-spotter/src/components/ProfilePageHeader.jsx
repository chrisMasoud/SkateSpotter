import React from "react";
import Logo from "./Logo";
import HomeButton from "./HomeButton";

function ProfilePageHeader() {
  return (
    <header className="header">
      <Logo />
      <h1>Welcome Back, User!</h1>
      <HomeButton />
    </header>
  );
}

export default ProfilePageHeader;
