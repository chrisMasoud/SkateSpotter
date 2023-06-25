import React, { useEffect, useState } from "react";
import UserProfile from "./UserProfile";
import ProfilePageHeader from "./ProfilePageHeader";
import axios from "axios";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const uid = localStorage.getItem("uid");

  useEffect(() => {
    axios
      .get(`/api/getprofile/${uid}`)
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
      });
  }, []);

  return (
    <>
      <ProfilePageHeader data={userData} />
      <UserProfile data={userData} />
    </>
  );
};

export default ProfilePage;
