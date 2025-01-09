import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "my-s3-bucket-for-files.s3.us-east-1.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    // Add any experimental features here
  },
};

export default nextConfig;