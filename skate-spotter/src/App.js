import React from "react";
import Header from "./components/Header";
import SpotCard from "./components/SpotCard";

function App() {
  return (
    <div className="app">
      <Header />
      <SpotCard />
      <SpotCard />
    </div>
  );
}

export default App;
