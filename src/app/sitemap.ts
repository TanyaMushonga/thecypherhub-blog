import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog`);
  const data: Article[] = await response.json();

  const blogEntries: MetadataRoute.Sitemap = data.map(({ id }) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}read/${id}`,
lastModified: new Date().toISOString(),
priority: 0.8,
  }));

  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
      lastModified: new Date().toISOString(),
    },
    ...blogEntries,
  ];
}
