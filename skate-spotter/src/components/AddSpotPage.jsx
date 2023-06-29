import React from "react";
import DetailHeader from "./DetailHeader";
import AddSpotForm from "./AddSpotForm";
import Footer from "./Footer";

export default function AddSpotPage() {
  return (
    <>
      <DetailHeader data="Add New Spot" />
      <div className="forms">
        <AddSpotForm />
      </div>
      <Footer />
    </>
  );
}
