declare interface Article {
  id: string;
  coverImgUrl: string;
  title: string;
  description: string;
  category: string;
  createdAt: string;
}

declare interface ArticleStore {
  blog: Article;
  setBlog: (blog: Article) => void;
}
