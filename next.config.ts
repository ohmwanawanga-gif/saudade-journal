import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { remotePatterns: [{ protocol: "https", hostname: "**.substack.com" }] }
};

export default nextConfig;
