import React from "react";
import Header from "./Header";
import CardList from "./CardList";
import Map from "./Map";
import Navbar from "./Navbar";

export default function HomePage() {
  return (
    <>
      <Header />
      <Navbar />
      <Map />
      <CardList />
    </>
  );
}
