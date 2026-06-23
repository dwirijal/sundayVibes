import type { NextConfig } from "next";
import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allow any domain for images temporarily (e.g. S3, Cloudflare R2, Payload media)
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
  },
};

export default withPayload(nextConfig);
