import React from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import SUbscribe from "@/components/Subscribe";
import Related from "@/components/related";
import Read from "@/components/read";
import { Metadata } from "next";
import axios from "axios";

type Params = Promise<{ id: string[] }>;

export async function generateStaticParams() {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/blog`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const articles: Article[] = response?.data;

  return articles.map(({ id }) => ({ params: { id } }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/blog/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const article = response?.data;

    return {
      title: article?.title,
      description: article?.description,
      openGraph: {
        images: [
          {
            url: article?.coverImgUrl,
            width: 800,
            height: 600,
            alt: article?.title,
          },
        ],
      },
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return {
      title: "Error",
      description: "An error occurred while fetching metadata.",
    };
  }
}
function Page() {
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

export default Page;
