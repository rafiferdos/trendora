import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
    // For maximum compatibility (including data URLs and relative URLs)
    domains: ['localhost', '127.0.0.1'],
    // Add this if you want to disable the default image optimization
    unoptimized: true,
  },
};

export default nextConfig