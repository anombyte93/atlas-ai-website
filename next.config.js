/** @type {import('next').NextConfig} */
const nextConfig = {
  // Note: 'standalone' output removed for Vercel deployment
  // Vercel handles Next.js deployment natively without standalone output
  outputFileTracingRoot: '/home/anombyte/Atlas/Atlas_Website', // Explicit: prevent auto-detection issues
  experimental: {
    serverActions: {
      allowedOrigins: ['atlas-ai.au', 'localhost:3000'],
    },
  },
}
module.exports = nextConfig
