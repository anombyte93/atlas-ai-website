/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for GitHub Pages + Cloudflare deployment
  output: 'export',
  trailingSlash: false,
  basePath: '',
  images: {
    unoptimized: true,
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['atlas-ai.au', 'localhost:3000'],
    },
  },
}
module.exports = nextConfig
