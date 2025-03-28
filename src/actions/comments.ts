"use server";

import { revalidatePath } from "next/cache";

import { z } from "zod";
import { commentSchema } from "../../schema/validations";

export const writeComment = async (
  articleId: string,
  values: z.infer<typeof commentSchema>
) => {
  try {
    const validatedValues = commentSchema.safeParse(values);
    if (!validatedValues.success) {
      return { error: "Invalid comment data" };
    }
    const { comment } = validatedValues.data;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ articleId, comment }),
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
