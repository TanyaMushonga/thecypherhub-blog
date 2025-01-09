import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Image from "next/image";

function MyProfile() {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <p className="text-white underline cursor-pointer">@TanyaMushonga</p>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex flex-row gap-2">
          <div className="w-10 h-10">
            <Image
              src={"/profile.jpg"}
              width={40}
              height={30}
              alt="my profile"
              className="rounded-full"
              loading="lazy"
            />
          </div>
          <div className="flex flex-col items-start">
            <p className="text-white font-semibold">Tanyaradzwa T Mushonga</p>
            <p className="text-white">I am a passionate software engineer.</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

export default MyProfile;
