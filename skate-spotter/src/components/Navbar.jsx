import React from "react";
import AddSpotButton from "./AddSpotButton";

export default function Navbar() {
  return (
    <nav>
      <div>
        <AddSpotButton />
        <AddSpotButton />
        <AddSpotButton />
        <AddSpotButton />
        <AddSpotButton />
      </div>
    </nav>
  );
}
