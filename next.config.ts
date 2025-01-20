import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "my-s3-bucket-for-file.s3.eu-north-1.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    // Add any experimental features here
  },
};

export default nextConfig;
