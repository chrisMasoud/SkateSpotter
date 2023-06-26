import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import DetailHeader from "./DetailHeader";

function FinishGoogleSignup() {
  const nav = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    firstname: location?.state?.firstname || "",
    lastname: location?.state?.lastname || "",
    zip: "",
    email: location?.state?.email || "",
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

    if (zip === "" || password === "" || confirm === "") {
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

  return (
    <>
      <DetailHeader data="Finish Signing Up" />
      <div className="forms">
        <div className="signup-box">
          <div className="signup-alert">{errorMessage()}</div>
          <form
            className="signup-form"
            method="post"
            action=""
            onSubmit={(e) => handleSubmit(e)}
          >
            <span className="signup-hdr">Complete your registration</span>
            <span className="signup-sub">
              One last step before we can create your account.
            </span>
            <div className="signup-container">
              <input
                value={formData.zip}
                onChange={handleChange}
                type="number"
                className="signup-input"
                placeholder="ZIP"
                name="zip"
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
              Finish
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default FinishGoogleSignup;
