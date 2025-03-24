import NewVerificationForm from "@/components/common/newVerification";
import React, { Suspense } from "react";

function page() {
  return (
    <div className="xl:w-3/4 w-full mx-auto p-5 flex items-center justify-center gap-5 pt-20 h-[82vh]">
      <Suspense fallback={<div>Loading...</div>}>
        <NewVerificationForm />
      </Suspense>
    </div>
  );
}

export default page;
