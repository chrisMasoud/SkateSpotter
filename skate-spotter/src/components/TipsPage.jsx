import React from "react";
import LinkCard from "./LinkCard";
import TipsPageHeader from "./TipsPageHeader";
import { useEffect, useState } from "react";
import axios from "axios";

export default function TipsPage() {
  const [tipsData, setTipsData] = useState([]);

  useEffect(() => {
    axios
      .get("/api/tips")
      .then((response) => {
        setTipsData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching news data:", error);
      });
  }, []);

  return (
    <>
      <TipsPageHeader />
      <section className="spotCardSection">
        {tipsData.map((tipsItem) => (
          <LinkCard key={tipsItem.tutorialID} data={tipsItem} />
        ))}
      </section>
    </>
  );
}
