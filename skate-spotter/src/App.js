import React from "react";
import Header from "./components/Header";
import SpotCardList from "./components/SpotCardList";
import Map from "./components/Map";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Header />
      <Navbar />
      <Map />
      <SpotCardList />
    </>
  );
}

export default App;
