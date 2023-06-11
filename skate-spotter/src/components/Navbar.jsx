import React from "react";
import AddSpotButton from "./AddSpotButton";
import FavSpotsButton from "./FavSpotsButton";
import NewsButton from "./NewsButton";
import TipsButton from "./TipsButton";
import ProfileButton from "./ProfileButton";

export default function Navbar() {
  return (
    <nav>
      <AddSpotButton />
      <FavSpotsButton />
      <NewsButton />
      <TipsButton />
      <ProfileButton />
    </nav>
  );
}
