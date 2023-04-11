/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['fuul-assets-production.s3.amazonaws.com'],
  },
}

module.exports = nextConfig
