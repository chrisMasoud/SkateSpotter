import React, { useState, useEffect } from "react";
import axios from "axios";

function DevCard({ data }) {
  return (
    <div className="devCard">
      <img className="devImg" src={process.env.PUBLIC_URL + data.image} />
      <div className="devTextBox">
        <p className="h1">{data.name}</p>
        <p className="p1">{data.title}</p>
        <p>{data.bio}</p>
      </div>
    </div>
  );
}

export default DevCard;
