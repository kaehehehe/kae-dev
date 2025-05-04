import { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["prod-files-secure.s3.us-west-2.amazonaws.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
