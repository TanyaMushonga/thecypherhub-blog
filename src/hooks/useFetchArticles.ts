import axios from "axios";
import { useEffect, useState, useCallback } from "react";
const articleCache: { [key: string]: Article[] } = {};

export const useFetchArticles = (value: string) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const fetchArticles = useCallback(async () => {
    const cacheKey = `${page}-${pageSize}-${value}`;
    if (articleCache[cacheKey]) {
      setArticles(articleCache[cacheKey]);
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

      const data = response.data.blogs.filter((article: Article) => {
        if (value === "all") {
          return article;
        }
        return article.category === value;
      });
      setTotalCount(response.data.pagination.totalCount);
      setArticles(data);
      articleCache[cacheKey] = data;
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, value]);

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
