import React from "react";
import UserAvatar from "./UserAvatar";

const UserProfile = () => {
  const imageUrl = "https://randomuser.me/api/portraits/men/1.jpg";
  const avatarSize = 150;

  return (
    <div>
      <h1 style={{ marginLeft: "60px" }}>User Profile</h1>
      <div style={{ display: "flex", alignItems: "center" }}>
        <UserAvatar imageUrl={imageUrl} size={avatarSize} />
        <textarea
          placeholder="Enter your biography..."
          style={{ marginLeft: "10px", width: "300px", height: "200px" }}
        />
      </div>
    </div>
  );
};

export default UserProfile;
