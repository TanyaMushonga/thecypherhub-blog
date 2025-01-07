import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["my-s3-bucket-for-files.s3.us-east-1.amazonaws.com"],
  },
  experimental: {
  },
};

export default nextConfig;
