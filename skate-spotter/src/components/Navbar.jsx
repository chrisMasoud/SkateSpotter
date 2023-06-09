import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AddSpotButton from "./AddSpotButton";
import FavSpotsButton from "./FavSpotsButton";
import NewsButton from "./NewsButton";
import TipsButton from "./TipsButton";
import ProfileButton from "./ProfileButton";

export default function Navbar() {
  return (
    <nav>
      <Link to="/AddSpotPage">
        <AddSpotButton />
      </Link>
      {localStorage.getItem("loggedin") ? (
        <Link to="/FavSpotsPage">
          <FavSpotsButton />
        </Link>
      ) : (
        <Link to="/LoginPage">
          <FavSpotsButton />
        </Link>
      )}
      <Link to="/NewsPage">
        <NewsButton />
      </Link>
      <Link to="/TipsPage">
        <TipsButton />
      </Link>
      {localStorage.getItem("loggedin") ? (
        <Link to="/ProfilePage">
          <ProfileButton />
        </Link>
      ) : (
        <Link to="/LoginPage">
          <ProfileButton />
        </Link>
      )}
    </nav>
  );
}
