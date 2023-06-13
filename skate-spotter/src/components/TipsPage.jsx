import React from "react";
import LinkCard from "./LinkCard";
import TipsPageHeader from "./TipsPageHeader";

export default function TipsPage() {
  const cardTitle = "Card Name";
  const cardUrl = "https://www.youtube.com/watch?v=4XgjDhSnTtE";

  return (
    <>
      <TipsPageHeader />
      <section className="spotCardSection">
        <LinkCard title={cardTitle} url={cardUrl} />
        <LinkCard title={cardTitle} url={cardUrl} />
        <LinkCard title={cardTitle} url={cardUrl} />
        <LinkCard title={cardTitle} url={cardUrl} />
      </section>
    </>
  );
}
