import React from "react";
import AddPageHeader from "./AddPageHeader";
import AddSpotForm from "./AddSpotForm";

export default function FavSpotsPage() {
  return (
    <>
      <AddPageHeader />
      <div className="forms">
        <AddSpotForm />
      </div>
    </>
  );
}
