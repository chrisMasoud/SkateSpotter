import React from "react";
import Header from "./components/Header";
import CardList from "./components/CardList";
import Map from "./components/Map";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Header />
      <Navbar />
      <Map />
      <CardList />
    </>
  );
}

export default App;
