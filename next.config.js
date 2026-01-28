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
  // Security headers for static hosting
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cal.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://images.unsplash.com https://cal.com; font-src 'self' data:; connect-src 'self' https://formspree.io; frame-src https://cal.com;",
          },
        ],
      },
    ];
  },
}
module.exports = nextConfig
