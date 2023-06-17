import SearchBar from "./SearchBar";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import Logo from "./Logo";

function Header({ onZipCodeSearch }) {
  return (
    <header className="header">
      <Logo />
      <SearchBar onZipCodeSearch={onZipCodeSearch} />
      {localStorage.getItem("loggedin") ? <LogoutButton /> : <LoginButton />}
    </header>
  );
}

export default Header;
