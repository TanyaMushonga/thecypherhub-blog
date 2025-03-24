"use server";
import axios from "axios";

export async function newVerification(token: string) {
  if (!token) {
    throw new Error("Missing token");
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

  if (response.status === 201) {
    return response.data.message;
  } else {
    throw new Error(response.data.error || "An unexpected error occurred");
  }
}
