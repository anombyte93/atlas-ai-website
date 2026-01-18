/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Required for Railway
  experimental: {
    serverActions: {
      allowedOrigins: ['atlas-ai.au', 'localhost:3000'],
    },
  },
}
module.exports = nextConfig
