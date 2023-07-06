import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import axios from "axios";
import DetailHeader from "./DetailHeader";

function Login() {
  const nav = useNavigate();
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
      const url = "https://skate-spotter-backend-server.vercel.app/api/login";
      const loginData = {
        email: email,
        password: password,
      };
      axios
        .post(url, loginData)
        .then((response) => {
          //alert(response.data.message);
          localStorage.setItem("loggedin", true);
          localStorage.setItem("uid", response.data.user.UserID);
          if (response.data.redirect) nav(response.data.redirect);
        })
        .catch((error) => {
          alert(error.response.data.error);
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

  const handleGoogleSuccess = (res) => {
    const gdata = jwt_decode(res.credential);
    console.log(gdata);
    const googleData = {
      email: gdata.email || "",
    };
    axios
      .post(
        "https://skate-spotter-backend-server.vercel.app/api/google-login",
        googleData
      )
      .then((response) => {
        //alert(response.data.message);
        localStorage.setItem("loggedin", true);
        localStorage.setItem("uid", response.data.user.UserID);
        if (response.data.redirect) nav(response.data.redirect);
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  };

  const handleGoogleFailure = (error) => {
    console.log(error);
  };

  return (
    <>
      <DetailHeader data="Welcome Back!" />
      <div className="forms">
        <div className="signup-box">
          <div className="signup-alert">{errorMessage()}</div>
          <form
            className="signup-form"
            method="post"
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
            <div style={{ display: "flex", justifyContent: "center" }}>
              <GoogleLogin
                clientId="766515958928-fnqq80r9t4abrues25eht0c8iled30lf.apps.googleusercontent.com"
                onSuccess={handleGoogleSuccess}
                onFailure={handleGoogleFailure}
                cookiePolicy={"single_host_origin"}
                scope="profile email https://www.googleapis.com/auth/user.addresses.read"
              />
            </div>
          </form>
          <div className="signup-sect">
            <p>
              Don't have an account?{" "}
              <Link to="/SignupPage">Register here!</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
