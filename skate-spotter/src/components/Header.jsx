import SearchBar from "./SearchBar";
import LoginButton from "./LoginButton";
import SignupButton from "./SignupButton";
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
