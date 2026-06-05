import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'http', hostname: 'talenthub.local' },
      { protocol: 'https', hostname: 'via.placeholder.com' },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/wp/:path*',
        destination: `${process.env.NEXT_PUBLIC_WP_API_URL}/:path*`,
      },
    ]
  },
}

export default nextConfig
