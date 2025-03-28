"use server";

import axios from 'axios';

export async function subscribe(email: string) {
  if (!email) {
    throw new Error('Email is required');
  }

  const response = await axios.post(
    process.env.NEXT_PUBLIC_API_URL + '/subscribers',
    { email },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (response.status === 201 || response.status === 200) {
    return response.data.message;
  } else {
    throw new Error(response.data.error || 'An unexpected error occurred');
  }
}