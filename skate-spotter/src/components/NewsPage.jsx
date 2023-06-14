import React from "react";
import LinkCard from "./LinkCard";
import NewsPageHeader from "./NewsPageHeader";

export default function NewsPage() {
  const cardTitle = "Card Name";
  const cardUrl = "https://www.thrashermagazine.com/";

  return (
    <>
      <NewsPageHeader />
      <section className="spotCardSection">
        <LinkCard title={cardTitle} url={cardUrl} />
        <LinkCard title={cardTitle} url={cardUrl} />
        <LinkCard title={cardTitle} url={cardUrl} />
        <LinkCard title={cardTitle} url={cardUrl} />
      </section>
    </>
  );
}
