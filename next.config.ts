/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.sanity.io'], // Added domain for Sanity images
  },
};

module.exports = nextConfig;
