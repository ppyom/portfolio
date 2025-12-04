import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-e7837d538f9b4131927013803bc919cb.r2.dev',
      },
    ],
  },
};

export default nextConfig;
