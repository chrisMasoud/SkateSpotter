import React from "react";
import SearchBar from "./SearchBar";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import LikeButton from "./LikeButton";
import DislikeButton from "./DislikeButton";
import BookmarkButton from "./BookmarkButton";
import Logo from "./Logo";

function Header() {
  return (
    <header>
      <Logo />
      <SearchBar />
      <LoginButton />
      <LogoutButton />
      <LikeButton />
      <DislikeButton />
      <BookmarkButton />
    </header>
  );
}

export default Header;
