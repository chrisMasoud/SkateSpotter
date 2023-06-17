import React from "react";
import UserAvatar from "./UserAvatar";
import Card from "./Card";
import { useState, useEffect } from "react";
import UploadFilePrompt from "./UploadFilePrompt";
import axios from "axios";

export default function UserProfile() {
  const avatarSize = 150;
  const [defaultImageUrl, setDefaultImageUrl] = useState("");
  const [imageUrl, setImageUrl] = useState(defaultImageUrl);
  const uid = localStorage.getItem("uid");

  useEffect(() => {
    axios
      .get(`/api/getprofileimage/${uid}`)
      .then((res) => {
        const { url } = res.data;
        setDefaultImageUrl(url);
      })
      .catch((err) => {
        console.error("Error fetching user avatar:", err);
      });
  }, []);

  const handleImageSelect = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target.result;
      setImageUrl(url);
      const formData = new FormData();
      formData.append("image", file);
      formData.append("uid", uid);
      axios
        .post("/api/upload", formData)
        .then((response) => {
          const { relativepath } = response.data;
          setImageUrl(relativepath);
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    };

    reader.readAsDataURL(file);
  };

  return (
    <section className="profile">
      <div className="profileForm">
        <UserAvatar imageUrl={imageUrl || defaultImageUrl} size={avatarSize} />
        <h1 style={{ marginTop: "20px" }}>User Name</h1>
        <h4 style={{ marginTop: "-10px" }}>Zip Code</h4>
        <textarea
          className="profileBio"
          placeholder="Enter your biography..."
        />
        <UploadFilePrompt onImageSelect={handleImageSelect} />
      </div>
      <div className="profileCards">
        <label className="h1" htmlFor="spotsAdded">
          Spots Added:{" "}
        </label>
        {/* <Card id="spotsAdded" /> */}
        <label className="h1" htmlFor="favSpots">
          Favorite Spots:{" "}
        </label>
        {/* <Card id="favSpots" /> */}
      </div>
    </section>
  );
}
