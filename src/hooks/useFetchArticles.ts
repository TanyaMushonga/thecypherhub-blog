import axios from "axios";
import { useEffect, useState, useCallback } from "react";

const articleCache: { [key: string]: { articles: Article[]; total: number } } =
  {};

export const useFetchArticles = (value: string, p0?: number) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const fetchArticles = useCallback(async () => {
    const cacheKey = `${page}-${pageSize}-${value}`;

    // Check cache first
    if (articleCache[cacheKey]) {
      setArticles(articleCache[cacheKey].articles);
      setTotalCount(articleCache[cacheKey].total);
      return;
    }

    try {
      setLoading(true);

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/blog?page=${page}&page_size=${pageSize}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Filter locally since API might not support category param
      const filteredData = response.data.blogs.filter((article: Article) => {
        if (value === "all") {
          return true;
        }
        // Normalize comparison
        const category = article.category?.toLowerCase() || "";
        const targetValue = value.toLowerCase().replace("_", " "); // matches system_design to system design
        return category.includes(targetValue) || category === targetValue;
      });

      setTotalCount(response.data.pagination.totalCount);
      setArticles(filteredData);

      // Cache results
      articleCache[cacheKey] = {
        articles: filteredData,
        total: response.data.pagination.totalCount,
      };
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, value]);

  // Logical Fix: Reset page to 1 when category changes
  useEffect(() => {
    setPage(1);
  }, [value]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  return {
    articles,
    loading,
    refetch: fetchArticles,
    setArticles,
    setPage,
    setPageSize,
    totalCount,
    page,
  };
};
