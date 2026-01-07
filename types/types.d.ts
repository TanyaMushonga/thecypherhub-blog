declare interface Article {
  id: string;
  authorId: string;
  coverImgUrl: string;
  title: string;
  description: string;
  category: string | null;
  createdAt: string;
  content: string;
  keywords: string[];
  readTime: string;
  slug: string;
  updatedAt: string;
  status: "published" | "unpublished" | "draft" | string;
  publishedAt: string | null;
  isDeleted: boolean;
  collectionId?: string;
}

declare interface Collection {
  id: string;
  name: string;
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
