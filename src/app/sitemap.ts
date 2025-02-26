import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pageSize = 10;
  let page = 1;
  let allBlogs: Article[] = [];
  let blogs: Article[] = [];

  do {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/blog?page=${page}&page_size=${pageSize}`
    );
    const data = await response.json();
    blogs = data.blogs;

    if (Array.isArray(blogs) && blogs.length > 0) {
      allBlogs = allBlogs.concat(blogs);
      page++;
    }
  } while (Array.isArray(blogs) && blogs.length === pageSize);

  const blogEntries: MetadataRoute.Sitemap = allBlogs.map(
    ({ slug, updatedAt }) => ({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}blog/${slug}`,
      lastModified: new Date(updatedAt).toISOString(),
      priority: 0.9,
      changeFrequency: "weekly",
    })
  );

  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
      priority: 1,
      changeFrequency: "weekly",
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/all`,
      priority: 1,
      changeFrequency: "weekly",
    },
    ...blogEntries,
  ];
}
