import React from "react";
import ConnectButton from "./ConnectButton";
import { Link } from "react-router-dom";

function DevCard({ data }) {
  return (
    <div className="devCard">
      <img className="devImg" src={process.env.PUBLIC_URL + data.image} />
      <div className="devTextBox">
        <p className="h1">{data.name}</p>
        <p className="p1">{data.title}</p>
        <p>{data.bio}</p>
        <Link to={data.link}>
          <ConnectButton />
        </Link>
      </div>
    </div>
  );
}

export default DevCard;
