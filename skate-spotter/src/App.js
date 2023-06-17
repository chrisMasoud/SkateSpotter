import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import AddSpotPage from "./components/AddSpotPage";
import FavSpotsPage from "./components/FavSpotsPage";
import NewsPage from "./components/NewsPage";
import TipsPage from "./components/TipsPage";
import ProfilePage from "./components/ProfilePage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import FinishGoogleSignup from "./components/FinishGoogleSignup";
import SpotDetailPage from "./components/SpotDetailPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/AddSpotPage" element={<AddSpotPage />} />
      <Route path="/FavSpotsPage" element={<FavSpotsPage />} />
      <Route path="/NewsPage" element={<NewsPage />} />
      <Route path="/TipsPage" element={<TipsPage />} />
      <Route path="/ProfilePage" element={<ProfilePage />} />
      <Route path="/LoginPage" element={<Login />} />
      <Route path="/SignupPage" element={<Signup />} />
      <Route path="/FinishGoogleSignup" element={<FinishGoogleSignup />} />
      <Route path="/page" element={<SpotDetailPage />} />
    </Routes>
  );
};

export default App;
