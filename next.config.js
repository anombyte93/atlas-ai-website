/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Required for Railway
  outputFileTracingRoot: '/home/anombyte/Atlas/Atlas_Website', // Explicit: prevent auto-detection issues
  experimental: {
    serverActions: {
      allowedOrigins: ['atlas-ai.au', 'localhost:3000'],
    },
  },
}
module.exports = nextConfig
