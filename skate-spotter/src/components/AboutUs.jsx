import React from "react";
import DetailHeader from "./DetailHeader";


function AboutUs() {
  return (
    <>
    
    <DetailHeader data="About Us" />
    <div className="mission-container">
      
    

      <h2 className="mission-heading">Our Mission</h2>
      <p className="mission-text">
        At SkateSpotter, our mission is to empower skateboarders by providing them with resources to enhance their skateboarding experience. We help skateboarders discover unique spots, stay updated with skateboarding news, and learn new tricks.
      </p>
      <p className="mission-text">
        Join us in exploring, inspiring, and elevating the skateboarding community. Together, let's uncover hidden spots, stay connected with the skateboarding world, and continuously evolve our skills on the board.
      </p>
      
    </div>
    </>
  );
}

export default AboutUs;