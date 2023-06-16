import React from "react";
import LinkCard from "./LinkCard";
import NewsPageHeader from "./NewsPageHeader";
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
      <NewsPageHeader />
      <section className="spotCardSection">
        {newsData.map((newsItem) => (
          <LinkCard key={newsItem.tutorialID} data={newsItem} />
        ))}
      </section>
    </>
  );
}
