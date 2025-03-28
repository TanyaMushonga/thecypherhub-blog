"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { useState } from "react";
import SUbscribe from "./Subscribe";

const unsubscribeSchema = z.object({
  email: z.string(),
});

export default function Unsubscribe() {
  const form = useForm<z.infer<typeof unsubscribeSchema>>({
    resolver: zodResolver(unsubscribeSchema),
    defaultValues: {
      email: "",
    },
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(values: z.infer<typeof unsubscribeSchema>) {
    try {
      setLoading(true);
      const { email } = values;
      if (!email) {
        toast.error("Email is required");
        setLoading(false);
        return;
      }
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/unsubscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      if (res.ok) {
        setSuccess(true);
        setLoading(false);
        form.reset();
        toast.success("Unsubscribed successfully");
      } else {
        const errorData = await res.json();
        const errorMessage = errorData?.message || "An unknown error occurred.";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {!success || error ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-full max-w-md"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">
                    Enter your email to unsubscribe
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="tanya@gmail.com"
                      type="email"
                      {...field}
                      disabled={loading}
                      className="bg-card text-white placeholder:text-slate-400"
                    />
                  </FormControl>
                  <FormDescription> We are sorry to see you go</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading}>
              Unsubscribe
            </Button>
          </form>
        </Form>
      ) : (
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-white">
            You have been unsubscribed
          </h1>
          <p className="text-gray-400">
            We are sorry to see you go. If you change your mind, you can always
            subscribe again.
          </p>
          <SUbscribe />
        </div>
      )}
    </>
  );
}
