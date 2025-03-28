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
  keywords: string[];
  updatedAt: string;
  comments: {
    id: string;
    comment: string;
    createdAt: string;
  }[];
}

declare interface ArticleStore {
  blog: Article[];
  setBlog: (blog: Article[]) => void;
}
