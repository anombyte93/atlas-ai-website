/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for GitHub Pages + Cloudflare deployment
  output: 'export',
  trailingSlash: false,
  basePath: '',
  images: {
    unoptimized: true,
  },
  // Fix workspace root detection issue
  outputFileTracingRoot: '/home/anombyte/Atlas/Atlas_Website',
  experimental: {
    serverActions: {
      allowedOrigins: ['atlas-ai.au', 'localhost:3000'],
    },
  },
  // Note: Security headers configured in platform-specific files:
  // - Cloudflare Pages: public/_headers
  // - Vercel: vercel.json
  // - GitHub Pages/Apache: public/.htaccess
}
module.exports = nextConfig
