import React from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import SUbscribe from "@/components/Subscribe";
import Related from "@/components/related";
import Read from "@/components/read";

function page() {


  return (
    <BackgroundBeamsWithCollision>
      <div className="xl:w-1/2 w-full mx-auto p-5 flex flex-col gap-5 mt-5">
        <Read />
        <Related />
        <SUbscribe />
      </div>
    </BackgroundBeamsWithCollision>
  );
}

export default page;
