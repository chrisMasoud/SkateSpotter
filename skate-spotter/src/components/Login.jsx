import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setError(true);
    } else {
      setSubmitted(true);
      setError(false);
      const url = "http://localhost/skatespotter/login.php";
      const loginData = new FormData();
      loginData.append("email", email);
      loginData.append("password", password);
      axios
        .post(url, loginData)
        .then((response) => {
          alert(response.data);
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  const errorMessage = () => {
    return (
      <div className="signup-error" style={{ display: error ? "" : "none" }}>
        <h1>All fields are required.</h1>
      </div>
    );
  };

  const handleGoogleSuccess = (response) => {
    console.log(response);
    // Perform any additional actions with the response data
  };

  const handleGoogleFailure = (error) => {
    console.log(error);
    // Handle the error as needed
  };

  return (
    <div className="forms">
      <div className="signup-box">
        <div className="signup-alert">{errorMessage()}</div>
        <form
          className="signup-form"
          method="post"
          action=""
          onSubmit={(e) => handleSubmit(e)}
        >
          <span className="signup-hdr">Log in</span>
          <span className="signup-sub">
            Login using your email and password.
          </span>
          <div className="signup-container">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="signup-input"
              placeholder="Email"
              name="email"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="signup-input"
              placeholder="Password"
              name="password"
            />
          </div>
          <button type="submit" className="signup-button">
            Login
          </button>
        </form>
        <div className="signup-sect">
          <p>
            Don't have an account? <Link to="/SignupPage">Register here!</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
