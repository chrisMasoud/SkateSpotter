import SearchBar from "./SearchBar";
import LoginButton from "./LoginButton";
import Logo from "./Logo";

function Header({ onZipCodeSearch }) {
  return (
    <header className="header">
      <Logo />
      <SearchBar onZipCodeSearch={onZipCodeSearch} />
      <LoginButton />
    </header>
  );
}

export default Header;
