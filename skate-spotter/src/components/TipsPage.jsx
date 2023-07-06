import React from "react";
import LinkCard from "./LinkCard";
import DetailHeader from "./DetailHeader";
import { useEffect, useState } from "react";
import axios from "axios";

export default function TipsPage() {
  const [tipsData, setTipsData] = useState([]);

  useEffect(() => {
    axios
      .get("https://skate-spotter-backend-server.vercel.app/api/tips")
      .then((response) => {
        setTipsData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching news data:", error);
      });
  }, []);

  return (
    <>
      <DetailHeader data="Tips & Tutorials" />
      <section className="spotCardSection">
        {tipsData.map((tipsItem) => (
          <LinkCard key={tipsItem.tutorialID} data={tipsItem} />
        ))}
      </section>
    </>
  );
}
