import React from "react";
import { useState } from "react";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [zip, setZIP] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirmPassword] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
    setSubmitted(false);
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
    setSubmitted(false);
  };

  const handleZIP = (e) => {
    setZIP(e.target.value);
    setSubmitted(false);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    setSubmitted(false);
  };

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
    }
  };
  return (
    <div className="signup-box">
      <form
        className="signup-form"
        method="post"
        encType="multipart/form-data"
        action=""
        onSubmit={handleSubmit}
      >
        <span className="signup-hdr">Sign up</span>
        <span className="signup-sub">Create an account using your email.</span>
        <div className="signup-container">
          <input
            type="text"
            className="signup-input"
            placeholder="First Name"
            onChange={handleFirstName}
          />
          <input
            type="text"
            className="signup-input"
            placeholder="Last Name"
            onChange={handleLastName}
          />
          <input
            type="number"
            className="signup-input"
            placeholder="ZIP"
            onChange={handleZIP}
          />
          <input
            type="email"
            className="signup-input"
            placeholder="Email"
            onChange={handleEmail}
          />
          <input
            type="password"
            className="signup-input"
            placeholder="Password"
            onChange={handlePassword}
          />
          <input
            type="password"
            className="signup-input"
            placeholder="Confirm password"
            onChange={handleConfirmPassword}
          />
        </div>
        <button type="submit" className="signup-button">
          Signup
        </button>
      </form>
      <div className="signup-sect">
        <p>
          Already have an account? Login <a href="">here</a>{" "}
        </p>
      </div>
    </div>
  );
}

export default Signup;
