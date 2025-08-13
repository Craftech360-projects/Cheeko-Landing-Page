import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
  // Allow cross-origin requests for development (enables HMR on mobile)
  allowedDevOrigins: ['192.168.1.237', '192.168.0.100'],
  
  // Redirects to handle www/non-www and http/https
  async redirects() {
    return [
      // Redirect www to non-www
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.cheekoai.in',
          },
        ],
        destination: 'https://cheekoai.in/:path*',
        permanent: true,
      },
      // Redirect Shopify-style URLs to home page
      {
        source: '/collections/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/products/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/pages/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/blogs/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/cart/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/cdn',
        destination: '/',
        permanent: true,
      },
    ];
  },
  
  // Headers for better SEO control
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'index, follow',
          },
        ],
      },
      // Prevent indexing of API routes
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
