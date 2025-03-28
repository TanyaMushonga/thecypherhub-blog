"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { MdSend } from "react-icons/md";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTransition } from "react";
import { writeComment } from "@/actions/comments";
import toast from "react-hot-toast";
import { commentSchema } from "../../../schema/validations";

export default function WriteAcomment({
  articleId,
  slug,
}: {
  articleId: string;
  slug: string;
}) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: "",
    },
  });

  function onSubmit(values: z.infer<typeof commentSchema>) {
    try {
      startTransition(() => {
        writeComment(articleId, slug, values).then((res) => {
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5">
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2 relative">
              <FormControl>
                <Input
                  disabled={isPending}
                  placeholder="Write a note"
                  type="text"
                  {...field}
                  className="text-white bg-muted/30 border-none rounded-xl w-full"
                />
              </FormControl>
              <Button
                disabled={isPending}
                type="submit"
                className="text-foreground hover:bg-transparent hover:text-foreground absolute right-0 -top-2"
                variant={"ghost"}
              >
                <MdSend className="w-8 h-8 text-white" />
              </Button>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
