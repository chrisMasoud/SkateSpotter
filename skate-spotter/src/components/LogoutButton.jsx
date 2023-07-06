import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LogoutButton() {
  const nav = useNavigate();
  const handleLogout = () => {
    axios
      .post("/api/logout")
      .then((response) => {
        localStorage.removeItem("loggedin");
        localStorage.removeItem("uid");
        alert(
          "You have been logged out.  Click OK to return to the home page."
        );
        nav("/");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };
  return (
    <button className="buttonLogin" onClick={handleLogout}>
      <span>
        <svg
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          width="24"
          height="24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          ></path>
        </svg>{" "}
        Logout
      </span>
    </button>
  );
}

export default LogoutButton;
