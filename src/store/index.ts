import { create } from "zustand";

export const useArticle = create<ArticleStore>((set) => ({
  blog: [
    {
      id: "",
      coverImgUrl: "",
      title: "",
      description: "",
      category: "",
      createdAt: "",
      content: "",
    },
  ],
  setBlog: (blog: Article[]) => set({ blog }),
}));