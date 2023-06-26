import SearchSpots from "./SearchSpots";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import Logo from "./Logo";

function Header({ onSpotSearch }) {
  return (
    <header className="header">
      <Logo />
      <SearchSpots onSpotSearch={onSpotSearch} />
      {localStorage.getItem("loggedin") ? <LogoutButton /> : <LoginButton />}
    </header>
  );
}

export default Header;
