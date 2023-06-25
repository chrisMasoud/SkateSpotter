import React from "react";

function Logo() {
  return (
    <img
      src={process.env.PUBLIC_URL + "/SkateSpotter-logo.png"}
      alt="SkateSpotter Logo"
      className="logo"
    />
  );
}

export default Logo;
