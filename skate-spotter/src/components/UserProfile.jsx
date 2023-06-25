import React from "react";
import UserAvatar from "./UserAvatar";
import Card from "./Card";
import { useState, useEffect } from "react";
import UploadFilePrompt from "./UploadFilePrompt";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserProfile({ data }) {
  const avatarSize = 150;
  const [defaultImageUrl, setDefaultImageUrl] = useState("");
  const [imageUrl, setImageUrl] = useState(defaultImageUrl);
  const [spotData, setSpotData] = useState([]);
  const uid = localStorage.getItem("uid");
  const navigate = useNavigate();

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

  useEffect(() => {
    axios
      .get(`/api/bookmarks/${uid}`)
      .then((response) => {
        setSpotData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching spot data:", error);
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

  const handleClick = (spotItem, weather) => {
    navigate(`/DetailPage/${spotItem.SpotID}`, {
      state: { data: spotItem, weather },
    });
  };

  return (
    <section className="profile">
      <div className="profileForm">
        <UserAvatar imageUrl={imageUrl || defaultImageUrl} size={avatarSize} />
        <h1 style={{ marginTop: "20px" }}>
          {data?.FirstName} {data?.LastName}
        </h1>
        <h4 style={{ marginTop: "-10px" }}>{data?.ZIP}</h4>
        <textarea
          className="profileBio"
          placeholder="Enter your biography..."
          value={data?.biography}
          onChange={(e) => {
            console.log("Bio event clicked");
          }}
        />
        <UploadFilePrompt onImageSelect={handleImageSelect} />
      </div>
      <div className="profileCards">
        <label className="h1" htmlFor="favSpots">
          Favorite Spots:{" "}
        </label>
        <section className="spotCardSection">
          {spotData.map((spotItem) => (
            <Card key={spotItem.SpotID} data={spotItem} onClick={handleClick} />
          ))}
        </section>
      </div>
    </section>
  );
}
