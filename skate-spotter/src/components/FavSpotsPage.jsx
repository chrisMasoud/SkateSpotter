import React, { useEffect, useState } from "react";
import FavPageHeader from "./FavPageHeader";
import axios from "axios";
import Card from "./Card";
import { useNavigate } from "react-router-dom";

export default function FavSpotsPage() {
  const [spotData, setSpotData] = useState([]);
  const uid = localStorage.getItem("uid");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/bookmarks/${uid}`)
      .then((response) => {
        setSpotData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching spot data:", error);
      });
  }, []);

  const handleClick = (spotItem, weather) => {
    navigate(`/DetailPage/${spotItem.SpotID}`, {
      state: { data: spotItem, weather },
    });
  };

  return (
    <>
      <FavPageHeader />
      <section className="spotCardSection">
        {spotData.map((spotItem) => (
          <Card key={spotItem.SpotID} data={spotItem} onClick={handleClick} />
        ))}
      </section>
    </>
  );
}
