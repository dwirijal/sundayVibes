import type { NextConfig } from "next";
import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allow any domain for images temporarily (e.g. S3, Cloudflare R2, Payload media)
      },
    ],
  },
};

export default withPayload(nextConfig);
