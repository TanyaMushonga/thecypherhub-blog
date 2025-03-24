"use client";
import { subscribe } from "@/actions/subscribe";
import React, { useState } from "react";

function SUbscribe() {
  const [email, setEmail] = useState<string>("");
  const [errors, setErrors] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrors("");
      setMessage("");
      if (!email) {
        setErrors("Email is required");
        setLoading(false);
        return;
      }

      const message = await subscribe(email);
      setMessage(message);
      setEmail("");
    } catch {
      setErrors("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-t-2 border-slate-500 py-5">
      <h1 className="text-white font-bold text-xl md:text-2xl">
        Subscribe to our newsletter
      </h1>
      <p className="text-slate-300 text-lg my-1">
        Get the latest posts delivered right to your inbox
      </p>
      {errors && <p className="text-red-600 text-lg mt-2">{errors}</p>}
      {message && (
        <div className="mt-2 w-full bg-card p-2 rounded-md">
          <p className="text-green-600 text-lg">{message}</p>
        </div>
      )}
      <div className="flex w-full max-w-sm items-center space-x-2 mt-4">
        <form
          className="flex md:flex-row flex-col gap-4 w-full"
          onSubmit={onSubmit}
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="rounded-md px-4 py-2 text-white focus:outline-none bg-card"
            value={email}
            onChange={onChange}
            aria-label="Enter your email to subscribe"
          />
          <button className="p-[3px] relative w-fit">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg" />
            <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
              {loading ? "Submiting" : "Subscribe"}
            </div>
          </button>
        </form>
      </div>
    </div>
  );
}

export default SUbscribe;
