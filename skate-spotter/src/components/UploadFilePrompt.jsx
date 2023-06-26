import React, { useRef } from "react";

function UploadFilePrompt({ onImageSelect }) {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    onImageSelect(file);
  };

  return (
    <div>
      <label htmlFor="file">
        <button onClick={handleButtonClick}>Change Profile Picture</button>
      </label>
      <input
        ref={fileInputRef}
        id="file"
        type="file"
        accept="image/*"
        onChange={handleImageSelect}
      />
    </div>
  );
}

export default UploadFilePrompt;
