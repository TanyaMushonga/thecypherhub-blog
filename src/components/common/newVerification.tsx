"use client";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect } from "react";
import { LuLoaderCircle } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import axios from "axios";

function NewVerificationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [error, setError] = React.useState<string | undefined>("");
  const [success, setSuccess] = React.useState<string | undefined>("");

  const onSUbmit = useCallback(async () => {
    if (success || error) return;
    if (!token) {
      setError("Missing token");
      return;
    }
    const response = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + "/email-confirmation",
      { token },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      setSuccess(response.data.message);
    } else {
      setError(response.data.error || "An unexpected error occurred");
    }
  }, [token, success, error]);

  useEffect(() => {
    onSUbmit();
  }, [onSUbmit]);

  return (
    <div className="flex flex-col items-center px-5 md:px-20">
      <div>
        {!success && !error && (
          <div className="flex flex-row gap-5 items-center">
            <LuLoaderCircle className="text-white w-8 h-8 animate-spin" />
            <h1 className="text-white text-lg md:text-xl">
              Confirming your subscription
            </h1>
          </div>
        )}
      </div>
      {success && (
        <div>
          <p className="text-white text-lg md:text-xl">{success}</p>
        </div>
      )}{" "}
      {error && (
        <div>
          <p className="text-red-600 text-lg md:text-xl">{error}</p>
        </div>
      )}
      <Button
        className="w-fit rounded-md mt-2"
        onClick={() => router.push("/")}
      >
        Browse articles
      </Button>
    </div>
  );
}

export default NewVerificationForm;
