import React from "react";
import { Link } from "react-router-dom";
import AboutUsButton from "./AboutUsButton";
import SupportButton from "./SupportButton";
import AddSpotFButton from "./AddSpotFButton";
import FavSpotFButton from "./FavSpotFButton";
import NewsFButton from "./NewsFButton";
import TipsFButton from "./TipsFButton";
import ProfileFButton from "./ProfileFButton";
import GitHubButton from "./GitHubButton";

const Footer = () => {
  return (
    <footer>
      <img
        className="footerImg"
        src={process.env.PUBLIC_URL + "/FooterLogo.png"}
        alt="Footer Logo"
      />
      <div className="footerButtons">
        <Link to="/AddSpotPage">
          <AddSpotFButton />
        </Link>
        <Link to="/FavSpotsPage">
          <FavSpotFButton />
        </Link>
        <Link to="/NewsPage">
          <NewsFButton />
        </Link>
        <Link to="/TipsPage">
          <TipsFButton />
        </Link>
        <Link to="/ProfilePage">
          <ProfileFButton />
        </Link>
      </div>
      <div className="footerButtons">
        <Link to="/AboutUsPage">
          <AboutUsButton />
        </Link>
        <Link to="/SupportPage">
          <SupportButton />
        </Link>
        <Link to="https://github.com/chrisMasoud/SkateSpotter">
          <GitHubButton />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
