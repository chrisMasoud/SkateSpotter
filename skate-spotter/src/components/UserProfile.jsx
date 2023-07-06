import React from "react";
import UserAvatar from "./UserAvatar";
import Card from "./Card";
import { useState, useEffect } from "react";
import UploadFilePrompt from "./UploadFilePrompt";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserProfile({ data }) {
  const avatarSize = 150;
  const [firstName, setFirstName] = useState(data?.FirstName);
  const [lastName, setLastName] = useState(data?.LastName || "");
  const [zip, setZip] = useState(data?.ZIP || "");
  const [biography, setBiography] = useState(data?.biography || "");
  const [defaultImageUrl, setDefaultImageUrl] = useState("");
  const [imageUrl, setImageUrl] = useState(defaultImageUrl);
  const [spotData, setSpotData] = useState([]);
  const uid = localStorage.getItem("uid");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `https://skate-spotter-backend-server.vercel.app/api/getprofileimage/${uid}`
      )
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
      .get(
        `https://skate-spotter-backend-server.vercel.app/api/bookmarks/${uid}`
      )
      .then((response) => {
        setSpotData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching spot data:", error);
      });
  }, []);

  useEffect(() => {
    if (data) {
      setFirstName(data.FirstName || "");
      setLastName(data.LastName || "");
      setZip(data.ZIP || "");
      setBiography(data.biography || "");
    }
  }, [data]);

  const handleImageSelect = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target.result;
      setImageUrl(url);
      const formData = new FormData();
      formData.append("image", file);
      formData.append("uid", uid);
      axios
        .post(
          "https://skate-spotter-backend-server.vercel.app/api/upload",
          formData
        )
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

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://skate-spotter-backend-server.vercel.app/api/update-profile",
        {
          uid: uid,
          firstName: firstName,
          lastName: lastName,
          zip: zip,
          biography: biography,
        }
      )
      .then((response) => {
        console.log("Profile updated successfully");
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  return (
    <section className="profile">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="signup-box">
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="signup-container">
              <UserAvatar
                imageUrl={imageUrl || defaultImageUrl}
                size={avatarSize}
              />
              <input
                className="profileInput"
                type="text"
                placeholder="Enter First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                className="profileInput"
                type="text"
                placeholder="Enter Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <input
                className="profileInput"
                type="text"
                placeholder="Enter ZIP"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
              />
              <textarea
                className="profileBio"
                placeholder="Enter your biography..."
                value={biography}
                onChange={(e) => setBiography(e.target.value)}
              />
              <div className="profileFormButtons">
                <UploadFilePrompt onImageSelect={handleImageSelect} />
                <button type="submit">Save Changes</button>
              </div>
            </div>
          </form>
        </div>
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
