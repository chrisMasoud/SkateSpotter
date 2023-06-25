import React from "react";
import SupportForm from "./SupportForm";
import SupportPageHeader from "./SupportPageHeader";

export default function SupportPage() {
  return (
    <>
      <SupportPageHeader />
      <div className="forms">
        <SupportForm />
      </div>
    </>
  );
}
