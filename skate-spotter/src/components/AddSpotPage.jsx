import React from "react";
import DetailHeader from "./DetailHeader";
import AddSpotForm from "./AddSpotForm";

export default function AddSpotPage() {
  return (
    <>
      <DetailHeader data="Add New Spot" />
      <div className="forms">
        <AddSpotForm />
      </div>
    </>
  );
}
