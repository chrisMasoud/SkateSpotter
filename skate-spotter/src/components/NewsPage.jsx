import React from "react";
import LinkCard from "./LinkCard";
import DetailHeader from "./DetailHeader";
import { useEffect, useState } from "react";
import axios from "axios";

export default function NewsPage() {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    axios
      .get("/api/news")
      .then((response) => {
        setNewsData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching news data:", error);
      });
  }, []);

  return (
    <>
      <DetailHeader data="Skateboarding News" />
      <section className="spotCardSection">
        {newsData.map((newsItem) => (
          <LinkCard key={newsItem.tutorialID} data={newsItem} />
        ))}
      </section>
    </>
  );
}
