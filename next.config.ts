import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'goormthon-4.goorm.training',
      },
    ],
  },
};

export default nextConfig;
