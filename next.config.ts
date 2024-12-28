import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: { ignoreBuildErrors: true, },
  images: {
    domains: ['static.wikitide.net', 'steamcdn-a.akamaihd.net', 'nztcdn.com', 'steamcommunity-a.akamaihd.net'], // Thêm domain của bạn vào đây
  },
};

export default nextConfig;
