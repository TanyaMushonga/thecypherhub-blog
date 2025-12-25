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
import { MailMinus, CheckCircle } from "lucide-react";
const unsubscribeSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type UnsubscribeFormValues = z.infer<typeof unsubscribeSchema>;

export default function Unsubscribe() {
  const form = useForm<UnsubscribeFormValues>({
    resolver: zodResolver(unsubscribeSchema),
    defaultValues: {
      email: "",
    },
  });

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(values: UnsubscribeFormValues) {
    try {
      setLoading(true);
      const { email } = values;

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
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-card border border-border/50 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/5 rounded-full blur-3xl -z-10" />

      {!success ? (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2 text-center items-center">
            <div className="p-3 bg-destructive/10 rounded-full w-fit mb-2">
              <MailMinus className="w-8 h-8 text-destructive" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Unsubscribe from Newsletter
            </h1>
            <p className="text-muted-foreground text-center">
              We&apos;re sorry to see you go. Enter your email below to
              unsubscribe from our updates.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground font-medium">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="you@example.com"
                        type="email"
                        {...field}
                        disabled={loading}
                        className="bg-background border-input text-foreground placeholder:text-muted-foreground focus-visible:ring-primary h-11"
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      You will stop receiving all marketing emails from us.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={loading}
                variant="destructive"
                className="w-full h-11 font-semibold text-base"
              >
                {loading ? "Unsubscribing..." : "Unsubscribe"}
              </Button>
            </form>
          </Form>
        </div>
      ) : (
        <div className="flex flex-col gap-8 text-center items-center animate-in fade-in duration-500">
          <div className="p-4 bg-green-500/10 rounded-full">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">
              You have been unsubscribed
            </h2>
            <p className="text-muted-foreground">
              You will no longer receive emails from us. If this was a mistake,
              or if you change your mind, you can always resubscribe below.
            </p>
          </div>

          <div className="w-full pt-6 border-t border-border/50">
            <p className="text-sm font-medium text-primary mb-4 uppercase tracking-wider">
              Want to come back?
            </p>
            <SUbscribe />
          </div>
        </div>
      )}
    </div>
  );
}
