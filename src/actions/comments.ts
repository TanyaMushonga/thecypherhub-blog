"use server";

import { commentSchema } from "@/components/common/writeComment";
import { revalidatePath } from "next/cache";

import { z } from "zod";

export const getComments = async (articleId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/comments?articleId=${articleId}`
    );
    if (!res.ok) {
      return [];
    }
    const data = await res.json();
    return data.comments;
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
};

export const writeComment = async (
  articleId: string,
  values: z.infer<typeof commentSchema>
) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ articleId, ...values }),
    });
    if (!res.ok) {
      return { error: "Failed to write comment" };
    }
    revalidatePath(`/comments?articleId=${articleId}`);
    return { success: "Comment added successfully" };
  } catch (error) {
    console.error("Error writing comment:", error);
    return { error: "Failed to write comment" };
  }
};
