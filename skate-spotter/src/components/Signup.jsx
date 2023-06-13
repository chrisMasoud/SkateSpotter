import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import SignupGoogle from "./SignupGoogle";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [zip, setZIP] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirmPassword] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      firstName === "" ||
      lastName === "" ||
      zip === "" ||
      email === "" ||
      password === "" ||
      confirm === ""
    ) {
      setError(true);
    } else {
      setSubmitted(true);
      setError(false);
      const url = "http://localhost/skatespotter/signup.php";
      const signupData = new FormData();
      signupData.append("firstname", firstName);
      signupData.append("lastname", lastName);
      signupData.append("zip", zip);
      signupData.append("email", email);
      signupData.append("password", password);
      signupData.append("confirm", confirm);
      axios
        .post(url, signupData)
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

  const g_responseMessage = (response) => {
    console.log(response);
  };

  const g_errorMessage = (error) => {
    console.log(error);
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
          <span className="signup-hdr">Sign up</span>
          <span className="signup-sub">
            Create an account using your email.
          </span>
          <div className="signup-container">
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              className="signup-input"
              placeholder="First Name"
              name="firstname"
            />
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              className="signup-input"
              placeholder="Last Name"
              name="lastname"
            />
            <input
              value={zip}
              onChange={(e) => setZIP(e.target.value)}
              type="number"
              className="signup-input"
              placeholder="ZIP"
              name="zip"
            />
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
            <input
              value={confirm}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              className="signup-input"
              placeholder="Confirm password"
              name="confirm"
            />
          </div>
          <button type="submit" className="signup-button">
            Register
          </button>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <GoogleLogin
              clientId="766515958928-fnqq80r9t4abrues25eht0c8iled30lf.apps.googleusercontent.com"
              onSuccess={handleGoogleSuccess}
              onFailure={handleGoogleFailure}
              cookiePolicy={"single_host_origin"}
            />
          </div>
        </form>
        <div className="signup-sect">
          <p>
            Already have an account? <Link to="/LoginPage">Login here!</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
