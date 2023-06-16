import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function LogoutButton() {
  const history = useHistory();
  const handleLogout = () => {
    axios
      .post("/api/logout")
      .then((response) => {
        localStorage.removeItem("loggedin");
        localStorage.removeItem("uid");
        history.push("/LoginPage");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
    }
  return (
    <button onClick={handleLogout}>
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path
            fill="currentColor"
            d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"
          ></path>
        </svg>{" "}
        Logout
      </span>
    </button>
  );
}

export default LogoutButton;
