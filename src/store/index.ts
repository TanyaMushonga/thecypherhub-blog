import { create } from "zustand";

interface Article {
  id: string;
  coverImgUrl: string;
  title: string;
  description: string;
  category: string;
  createdAt: string;
}

export const useArticle = create<ArticleStore>((set) => ({
  blog: {
    id: "",
    coverImgUrl: "",
    title: "",
    description: "",
    category: "",
    createdAt: "",
  },
  setBlog: (blog: Article) => set({ blog }),
}));
