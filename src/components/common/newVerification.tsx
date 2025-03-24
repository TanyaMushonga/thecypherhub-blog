"use client";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect } from "react";
import { LuLoaderCircle } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { newVerification } from "@/actions/newVerification";

function NewVerificationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [error, setError] = React.useState<string | undefined>("");
  const [success, setSuccess] = React.useState<string | undefined>("");

  const onSUbmit = useCallback(() => {
    if (success || error) return;
    if (!token) {
      setError("Missing token");
      return;
    }
    newVerification(token)
      .then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      })
      .catch(() => {
        setError("An error occurred");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSUbmit();
  }, [onSUbmit]);

  return (
    <div className="flex flex-col px-5 md:px-20">
      <div className="flex flex-row gap-5 items-center">
        {!success && !error && (
          <LuLoaderCircle className="text-foreground w-10 h-10 animate-spin" />
        )}
        <h1 className="text-foreground text-lg md:text-2xl font-semibold">
          Confirming your registration
        </h1>
      </div>
      {!success && (
        <div>
          <p>{success}</p>
        </div>
      )}{" "}
      {!error && (
        <div>
          <p>{error}</p>
        </div>
      )}
      <Button
        className="w-full rounded-md mt-2"
        onClick={() => router.push("/login")}
      >
        Login
      </Button>
    </div>
  );
}

export default NewVerificationForm;
