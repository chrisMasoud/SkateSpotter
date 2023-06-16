import React from "react";
import UserAvatar from "./UserAvatar";
import Card from "./Card";
import { useState } from "react";
import UploadFilePrompt from "./UploadFilePrompt";

export default function UserProfile() {
  const defaultImageUrl = "https://randomuser.me/api/portraits/men/1.jpg";
  const avatarSize = 150;
  const [imageUrl, setImageUrl] = useState(defaultImageUrl);

  const handleImageSelect = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      setImageUrl(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <section className="profile">
      <div className="profileForm">
        <UserAvatar imageUrl={imageUrl} size={avatarSize} />

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
        <Card id="spotsAdded" />
        <label className="h1" htmlFor="favSpots">
          Favorite Spots:{" "}
        </label>
        <Card id="favSpots" />
      </div>
    </section>
  );
}
