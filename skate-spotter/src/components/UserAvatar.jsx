import React from "react";

const UserAvatar = ({ imageUrl, size }) => {
  const avatarStyle = {
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    overflow: "hidden",
    marginLeft: "135px",
    marginTop: "50px",
    border: "2px solid #ef6452",
    marginBottom: "20px",
  };

  const imageStyle = {
    width: "200px",
    height: "200px",
    objectFit: "cover",
  };

  return (
    <div style={avatarStyle}>
      <img src={imageUrl} alt="User Avatar" style={imageStyle} />
    </div>
  );
};

export default UserAvatar;
