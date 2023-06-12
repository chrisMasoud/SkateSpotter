import React from "react";
import UserAvatar from "./UserAvatar";
import CardList from "./CardList";
import ProfilePicUploadButton from "./ProfilePicUploadButton";

export default function UserProfile() {
  const imageUrl = "https://randomuser.me/api/portraits/men/1.jpg";
  const avatarSize = 150;

  return (
    <section className="profile">
      <div className="profileForm">
        <UserAvatar imageUrl={imageUrl} size={avatarSize} />
        <ProfilePicUploadButton />
        <h1 style={{ marginLeft: "190px", marginTop: "10px" }}>User Name</h1>
        <h4 style={{ marginLeft: "220px", marginTop: "-10px" }}>Zip Code</h4>
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
