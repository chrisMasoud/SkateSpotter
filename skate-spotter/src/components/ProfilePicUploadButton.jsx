import React from "react";

export default function ProfilePicUploadButton({ onImageSelect }) {
  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    onImageSelect(file);
  };

  return (
    <div>
      <label htmlFor="profilePic">Upload Profile Image: </label>
      <input
        id="profilePic"
        type="file"
        accept="image/*"
        onChange={handleImageSelect}
      />
    </div>
  );
}
