import React from "react";
import SupportForm from "./SupportForm";
import DetailHeader from "./DetailHeader";

export default function SupportPage() {
  return (
    <>
      <DetailHeader data="File a Support Claim" />
      <div className="forms">
        <SupportForm />
      </div>
    </>
  );
}
