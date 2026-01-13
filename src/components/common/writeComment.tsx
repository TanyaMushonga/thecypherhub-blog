"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Send, User } from "lucide-react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useTransition } from "react";
import { writeComment } from "@/actions/comments";
import toast from "react-hot-toast";
import { commentSchema } from "../../../schema/validations";
import { usePathname } from "next/navigation";

export default function WriteAcomment({
  articleId,
  slug,
}: {
  articleId: string;
  slug: string;
}) {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: "",
    },
  });

  const commentValue = form.watch("comment") || "";

  function onSubmit(values: z.infer<typeof commentSchema>) {
    try {
      startTransition(() => {
        writeComment(articleId, slug, values, pathname).then((res) => {
          if (res?.success) {
            form.reset();
            toast.success(res.success);
          } else {
            toast.error("Failed to submit the form. Please try again.");
          }
        });
      });
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <div className="mt-8 bg-muted/10 backdrop-blur-md p-6 rounded-3xl border border-white/10 shadow-xl overflow-hidden relative group transition-all duration-500 hover:border-white/20">
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-70" />

      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-linear-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white border border-white/10 shadow-inner">
          <User className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-bold text-white tracking-tight">
          Leave a thought
        </h3>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem className="relative">
                <FormControl>
                  <textarea
                    disabled={isPending}
                    placeholder="What's on your mind? Share your insights..."
                    className="w-full min-h-[120px] p-4 text-white bg-slate-900/50 border border-white/5 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all outline-hidden resize-none placeholder:text-slate-500 text-[15px]"
                    {...field}
                  />
                </FormControl>
                <div className="absolute bottom-3 right-4 flex items-center gap-3">
                  <span
                    className={`text-[11px] font-medium transition-colors ${
                      commentValue.length > 450
                        ? "text-orange-400"
                        : "text-slate-500"
                    }`}
                  >
                    {commentValue.length} / 500
                  </span>
                </div>
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button
              disabled={isPending || !commentValue.trim()}
              type="submit"
              className="px-6 h-11 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/20 active:scale-95 transition-all flex items-center gap-2 group border-none"
            >
              <span>{isPending ? "Posting..." : "Post Comment"}</span>
              <Send
                className={`w-4 h-4 transition-transform ${
                  isPending
                    ? ""
                    : "group-hover:translate-x-1 group-hover:-translate-y-1"
                }`}
              />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
