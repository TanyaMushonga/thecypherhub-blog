import { create } from "zustand";

interface Article {
  id: string;
  coverImgUrl: string;
  title: string;
  description: string;
  category: string;
  createdAt: string;
  content: string
}

export const useArticle = create<ArticleStore>((set) => ({
  blog: {
    id: "",
    coverImgUrl: "",
    title: "",
    description: "",
    category: "",
    createdAt: "",
    content: ""
  },
  setBlog: (blog: Article) => set({ blog }),
}));
