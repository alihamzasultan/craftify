import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
  images: {
    domains: ['not-lain-background-removal.hf.space',
      'res.cloudinary.com'
    ],
  },
};

export default nextConfig;