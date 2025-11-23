import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "backend.egmhoreca",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "backend.egmhoreca",
        pathname: "/media/**",
      },
    ],
    unoptimized: true,
  },
};

const withNextIntl = createNextIntlPlugin("./src/shared/i18n/request.ts");
export default withNextIntl(nextConfig);
