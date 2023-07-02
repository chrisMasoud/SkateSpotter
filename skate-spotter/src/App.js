import React, { useEffect } from "react";
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
import ReviewFormPage from "./components/ReviewFormPage";
import SupportPage from "./components/SupportPage";
import AboutUsPage from "./components/AboutUsPage";
import UpdateSpot from "./components/UpdateSpot";
import Footer from "./components/Footer";

const App = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="root">
      <div className="content">
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
          <Route path="/DetailPage/:spotId" element={<SpotDetailPage />} />
          <Route path="/ReviewFormPage/:spotId" element={<ReviewFormPage />} />
          <Route path="/SupportPage" element={<SupportPage />} />
          <Route path="/AboutUsPage" element={<AboutUsPage />} />
          <Route path="/UpdateSpot" element={<UpdateSpot />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
