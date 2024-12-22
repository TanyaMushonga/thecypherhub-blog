"use client";
import React, { useState } from "react";

function SUbscribe() {
  const [email, setEmail] = useState<string>("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email);
  };

  return (
    <div className="border-t-2 border-slate-500 py-5">
      <h1 className="text-white font-bold text-xl md:text-2xl">
        Subscribe to our newsletter
      </h1>
      <p className="text-slate-300 text-lg my-1">
        Get the latest posts delivered right to your inbox
      </p>
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
              Subscribe
            </div>
          </button>
        </form>
      </div>
    </div>
  );
}

export default SUbscribe;
