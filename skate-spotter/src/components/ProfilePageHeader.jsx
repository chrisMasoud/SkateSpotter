import React from "react";
import Logo from "./Logo";
import HomeButton from "./HomeButton";

function ProfilePageHeader({ data }) {
  return (
    <header className="header">
      <Logo />
      <h1>Welcome Back, {data?.FirstName}!</h1>
      <HomeButton />
    </header>
  );
}

export default ProfilePageHeader;
