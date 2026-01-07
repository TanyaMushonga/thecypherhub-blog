declare interface Article {
  id: string;
  coverImgUrl: string;
  title: string;
  description: string;
  category: string;
  createdAt: string;
  content: string;
  keywords: string[];
  readTime: string;
  slug: string;
  updatedAt: string;
  comments: comments[];
  status: "published" | "unpublished" | "draft" | string;
  publishedAt?: string;
}

declare interface Collection {
  id: string;
  title: string;
  description: string;
  slug: string;
  coverImgUrl: string;
  articles: Article[];
  createdAt: string;
  updatedAt: string;
}

declare interface comments {
  id: string;
  comment: string;
  createdAt: Date;
}

declare interface ArticleStore {
  blog: Article[];
  setBlog: (blog: Article[]) => void;
}
