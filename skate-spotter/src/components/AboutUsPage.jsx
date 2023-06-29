import React, { useEffect, useState } from "react";
import DetailHeader from "./DetailHeader";
import DevCard from "./DevCard";
import axios from "axios";

function AboutUsPage() {
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    axios
      .get("/api/about")
      .then((response) => {
        setCardData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching dev data:", error);
      });
  }, []);

  return (
    <>
      <DetailHeader data="About Us" />
      <div className="aboutPage">
        <h1 className="h1">Our Mission:</h1>
        <p className="mission">
          At SkateSpotter, our mission is to empower skateboarders by providing
          them with resources to enhance their skateboarding experience. We help
          skateboarders discover unique spots, stay updated with skateboarding
          news, and learn new tricks. <br />
          <br />
          Join us in exploring, inspiring, and elevating the skateboarding
          community. Together, let's uncover hidden spots, stay connected with
          the skateboarding world, and continuously evolve our skills on the
          board.
        </p>
        <h1 className="h1">Meet the Developers:</h1>
        <section className="spotCardSection">
          {cardData.map((cardItem) => (
            <DevCard key={cardItem.devID} data={cardItem} />
          ))}
        </section>
      </div>
    </>
  );
}

export default AboutUsPage;
