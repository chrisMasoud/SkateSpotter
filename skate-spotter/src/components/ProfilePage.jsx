import React, { useEffect, useState } from "react";
import UserProfile from "./UserProfile";
import DetailHeader from "./DetailHeader";
import axios from "axios";
import Footer from "./Footer";

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
      <DetailHeader data={`Welcome Back, ${userData?.FirstName}!`} />
      <UserProfile data={userData} />
      <Footer />
    </>
  );
};

export default ProfilePage;
