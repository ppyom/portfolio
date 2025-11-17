import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
        pathname: '/0e7160a2-3f48-4f63-9e3b-9965190cd13b/**',
      },
    ],
  },
};

export default nextConfig;
