import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import axios from "axios";
import DetailHeader from "./DetailHeader";

function Signup() {
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    zip: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstname, lastname, zip, email, password, confirm } = formData;

    if (
      firstname === "" ||
      lastname === "" ||
      zip === "" ||
      email === "" ||
      password === "" ||
      confirm === ""
    ) {
      setError(true);
    } else {
      axios
        .post("/api/signup", formData)
        .then((response) => {
          //alert(response.data.message);
          if (response.data.redirect) nav(response.data.redirect);
        })
        .catch((error) => {
          alert(error.response.data.error);
        });
      setSubmitted(true);
      setError(false);
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
      firstname: gdata.given_name || "",
      lastname: gdata.family_name || "",
      email: gdata.email || "",
    };
    nav("/FinishGoogleSignup", { state: googleData });
  };

  const handleGoogleFailure = (error) => {
    console.log(error);
    // Handle the error as needed
  };

  return (
    <>
      <DetailHeader data="New to SkateSpotter?" />
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
                value={formData.firstname}
                onChange={handleChange}
                type="text"
                className="signup-input"
                placeholder="First Name"
                name="firstname"
              />
              <input
                value={formData.lastname}
                onChange={handleChange}
                type="text"
                className="signup-input"
                placeholder="Last Name"
                name="lastname"
              />
              <input
                value={formData.zip}
                onChange={handleChange}
                type="number"
                className="signup-input"
                placeholder="ZIP"
                name="zip"
              />
              <input
                value={formData.email}
                onChange={handleChange}
                type="email"
                className="signup-input"
                placeholder="Email"
                name="email"
              />
              <input
                value={formData.password}
                onChange={handleChange}
                type="password"
                className="signup-input"
                placeholder="Password"
                name="password"
              />
              <input
                value={formData.confirm}
                onChange={handleChange}
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
                scope="profile email https://www.googleapis.com/auth/user.addresses.read"
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
    </>
  );
}

export default Signup;
