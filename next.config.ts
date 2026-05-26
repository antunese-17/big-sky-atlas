import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  generateBuildId: async () => "bsa-prod",
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.mapbox.com",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
