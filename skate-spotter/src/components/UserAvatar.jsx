import React from "react";

const UserAvatar = ({ imageUrl, size }) => {
  const avatarStyle = {
    width: size,
    height: size,
    borderRadius: "50%",
    overflow: "hidden",
  };

  const imageStyle = {
    width: "150px",
    height: "150px",
    objectFit: "cover",
  };

  return (
    <div style={avatarStyle}>
      <img src={imageUrl} alt="User Avatar" style={imageStyle} />
    </div>
  );
};

export default UserAvatar;
