"use client";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

function SUbscribe() {
  const [email, setEmail] = useState<string>("");
  const [errors, setErrors] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrors("");
      if (!email) {
        setErrors("Email is required");
      }
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/subscribers",
        {
          email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        toast(response.data.message);
      }
      setLoading(false);
      setEmail("");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response) {
        setErrors(error.response.data.error);
      } else {
        setErrors("An unexpected error occurred");
      }
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
      <div className="flex w-full max-w-sm items-center space-x-2 mt-4">
        <form className="flex w-full space-x-4" onSubmit={onSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-2 rounded-[6px] bg-black text-white"
            value={email}
            onChange={onChange}
          />
          <button className="p-[3px] relative">
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
