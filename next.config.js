/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.nike.com',
        pathname: '/a/images/**',
      },
      {
        protocol: 'https',
        hostname: 'assets.adidas.com',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'www.google.com',
        pathname: '/url/**',
      },
      {
        protocol: 'https',
        hostname: '**.nike.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.adidas.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn*.gstatic.com',
        pathname: '/**',
      }
    ],
  },
};

module.exports = nextConfig; 