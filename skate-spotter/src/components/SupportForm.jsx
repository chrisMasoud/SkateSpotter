import React, { useState } from "react";
import axios from "axios";

export default function SupprotForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("description", description);

    try {
      await axios.post("/support", formData);
      console.log("Claim added successfully");
      alert("Your claim has been submitted and we will reach out to you soon.");
      setName("");
      setEmail("");
      setDescription("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="signup-box">
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="signup-container">
          <input
            className="signup-input"
            type="text"
            placeholder="Enter your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="signup-input"
            type="text"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            className="signup-textarea"
            placeholder="Please Describe your Issue"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit" className="signup-button">
          Submit
        </button>
      </form>
    </div>
  );
}
