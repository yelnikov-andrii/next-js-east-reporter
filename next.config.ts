import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  i18n: {
    locales: ['en', 'de', 'uk'],
    defaultLocale: 'uk',
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/vi/**",
      },
      {
        protocol: "https",
        hostname: "eastreporter.com.ua",
      },
    ],
  },
};

export default nextConfig;
