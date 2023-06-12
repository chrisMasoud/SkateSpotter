import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import AddSpotPage from "./components/AddSpotPage";
import FavSpotsPage from "./components/FavSpotsPage";
import NewsPage from "./components/NewsPage";
import TipsPage from "./components/TipsPage";
import ProfilePage from "./components/ProfilePage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/AddSpotPage" element={<AddSpotPage />} />
      <Route path="/FavSpotsPage" element={<FavSpotsPage />} />
      <Route path="/NewsPage" element={<NewsPage />} />
      <Route path="/TipsPage" element={<TipsPage />} />
      <Route path="/ProfilePage" element={<ProfilePage />} />
    </Routes>
  );
};

export default App;
