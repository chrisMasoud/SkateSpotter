import React from "react";
import SupportButton from "./SupportButton";
import AboutUsButton from "./AboutUsButton";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#f2f2f2",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <AboutUsButton /> {/* Add the AboutUsButton component here */}
        <span style={{ margin: "0 10px" }}></span>
        <SupportButton />
      </div>
    
    </footer>
  );
};

export default Footer;
