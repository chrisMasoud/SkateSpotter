import React from "react";
import Header from "./components/Header";
import SpotCard from "./components/SpotCard";

function App() {
  return (
    <>
      <Header />
      <main>
        <SpotCard />
        <SpotCard />
      </main>
    </>
  );
}

export default App;
