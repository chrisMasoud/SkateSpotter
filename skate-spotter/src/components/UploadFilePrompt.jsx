import React from "react";

function UploadFilePrompt({ onImageSelect }) {
  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    onImageSelect(file);
  };

  return (
    <div className="fileprompt-container">
      <label for="file" className="fileprompt-bottom">
        <svg
          fill="#000000"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path d="M15.331 6H8.5v20h15V14.154h-8.169z"></path>
            <path d="M18.153 6h-.009v5.342H23.5v-.002z"></path>
          </g>
        </svg>
        <p>Change Profile Image</p>
      </label>
      <input
        id="file"
        type="file"
        accept="image/*"
        onChange={handleImageSelect}
      />
    </div>
  );
}

export default UploadFilePrompt;
