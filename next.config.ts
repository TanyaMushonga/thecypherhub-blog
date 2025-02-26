import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    // Add any experimental features here
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vhwltxiaz42mcyxk.public.blob.vercel-storage.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
