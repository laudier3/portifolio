import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.screenshotapi.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
