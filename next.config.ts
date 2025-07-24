import type { NextConfig } from "next";

const nextConfig = {
  // ... any other config you have
  
  typescript: {
    // !! WARNING !!
    // This will allow your project to build even if it has type errors.
    // It's highly recommended to fix the errors instead.
    ignoreBuildErrors: true,
  },
};
export default nextConfig;
