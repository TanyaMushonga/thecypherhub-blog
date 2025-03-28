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
  comments: comments[];
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
