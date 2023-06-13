import React from "react";
import UserAvatar from "./UserAvatar";
import CardList from "./CardList";
import ProfilePicUploadButton from "./ProfilePicUploadButton";
import { useState } from "react";

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
        <ProfilePicUploadButton onImageSelect={handleImageSelect} />
        <h1 style={{ marginTop: "20px" }}>User Name</h1>
        <h4 style={{ marginTop: "-10px" }}>Zip Code</h4>
        <textarea
          className="profileBio"
          placeholder="Enter your biography..."
        />
      </div>
      <div className="profileCards">
        <label className="h1" htmlFor="spotsAdded">
          Spots Added:{" "}
        </label>
        <CardList id="spotsAdded" />
        <label className="h1" htmlFor="favSpots">
          Favorite Spots:{" "}
        </label>
        <CardList id="favSpots" />
      </div>
    </section>
  );
}
