import NewVerificationForm from "@/components/common/newVerification";
import React from "react";

function page() {
  return (
    <div className="xl:w-3/4 w-full mx-auto p-5 flex items-center justify-center gap-5 pt-20 h-[82vh]">
      <NewVerificationForm />
    </div>
  );
}

export default page;
